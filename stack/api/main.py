"""매입 증빙 API. 화면(web)이 /api/... 주소로 부르면 DB(db)에서 읽고 쓴다."""

import os
from datetime import date

import psycopg
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

from totals import month_range, vat, vendor_totals

DATABASE_URL = os.environ["DATABASE_URL"]
app = FastAPI(title="매입 증빙 API")

# 월 조건(docs/wireframes/month.md). 형식이 틀리면(예: 2026-13) FastAPI가 422를 돌려준다.
MONTH = Query(None, pattern=r"^\d{4}-(0[1-9]|1[0-2])$", description="YYYY-MM. 없으면 전체")


def month_where(month: str | None) -> tuple[str, tuple]:
    """month가 있으면 그 달 1일 이상 ~ 다음 달 1일 미만으로 거르는 SQL 조건을 만든다."""
    if not month:
        return "", ()
    return " WHERE issued_on >= %s AND issued_on < %s", month_range(month)


class NewReceipt(BaseModel):
    issued_on: date
    vendor: str = Field(min_length=1, max_length=50)
    # 반품·에누리(수정세금계산서)는 공급가액이 마이너스다. 0원은 의미 없는 증빙이라 아래에서 막는다.
    supply: int = Field(ge=-10_000_000_000, le=10_000_000_000)


def row(r) -> dict:
    return {"id": r[0], "issued_on": r[1].isoformat(), "vendor": r[2], "supply": r[3], "vat": vat(r[3])}


@app.get("/api/health")
def health():
    with psycopg.connect(DATABASE_URL) as conn:
        conn.execute("SELECT 1")
    return {"ok": True}


@app.get("/api/receipts")
def list_receipts(month: str | None = MONTH):
    where, params = month_where(month)
    with psycopg.connect(DATABASE_URL) as conn:
        rows = conn.execute("SELECT id, issued_on, vendor, supply FROM receipts" + where + " ORDER BY issued_on, id", params).fetchall()
    items = [row(r) for r in rows]
    return {"items": items, "total_supply": sum(i["supply"] for i in items), "total_vat": sum(i["vat"] for i in items)}


@app.get("/api/receipts/by-vendor")
def receipts_by_vendor(month: str | None = MONTH):
    """거래처마다 건수·공급가액 합계·부가세 합계와 전체 합계. month를 주면 그 달 증빙만 더한다. 계산 규칙은 totals.py에 있다."""
    where, params = month_where(month)
    with psycopg.connect(DATABASE_URL) as conn:
        rows = conn.execute("SELECT vendor, supply FROM receipts" + where, params).fetchall()
    return vendor_totals(rows)


@app.post("/api/receipts", status_code=201)
def add_receipt(body: NewReceipt):
    vendor = body.vendor.strip()
    if not vendor:
        raise HTTPException(422, "거래처를 적으세요")
    if body.supply == 0:
        raise HTTPException(422, "공급가액이 0원인 증빙은 넣지 않습니다")
    with psycopg.connect(DATABASE_URL) as conn:
        r = conn.execute(
            "INSERT INTO receipts (issued_on, vendor, supply) VALUES (%s, %s, %s) RETURNING id, issued_on, vendor, supply",
            (body.issued_on, vendor, body.supply),
        ).fetchone()
    return row(r)


@app.delete("/api/receipts/{receipt_id}", status_code=204)
def delete_receipt(receipt_id: int):
    """테스트가 넣은 가상 증빙을 끝나고 지울 때 쓴다. 화면에는 지우기 단추가 없다."""
    with psycopg.connect(DATABASE_URL) as conn:
        if conn.execute("DELETE FROM receipts WHERE id = %s", (receipt_id,)).rowcount == 0:
            raise HTTPException(404, "그런 증빙이 없습니다")
