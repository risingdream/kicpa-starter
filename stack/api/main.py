"""매입 증빙 API. 화면(web)이 /api/... 주소로 부르면 DB(db)에서 읽고 쓴다."""

import os
from datetime import date

import psycopg
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

DATABASE_URL = os.environ["DATABASE_URL"]
app = FastAPI(title="매입 증빙 API")


class NewReceipt(BaseModel):
    issued_on: date
    vendor: str = Field(min_length=1, max_length=50)
    # 반품·에누리(수정세금계산서)는 공급가액이 마이너스다. 0원은 의미 없는 증빙이라 아래에서 막는다.
    supply: int = Field(ge=-10_000_000_000, le=10_000_000_000)


def vat(supply: int) -> int:
    """부가세는 공급가액의 10%, 원 미만은 0 쪽으로 버린다(-38,005원 → -3,800원)."""
    return supply // 10 if supply >= 0 else -(-supply // 10)


def row(r) -> dict:
    return {"id": r[0], "issued_on": r[1].isoformat(), "vendor": r[2], "supply": r[3], "vat": vat(r[3])}


@app.get("/api/health")
def health():
    with psycopg.connect(DATABASE_URL) as conn:
        conn.execute("SELECT 1")
    return {"ok": True}


@app.get("/api/receipts")
def list_receipts():
    with psycopg.connect(DATABASE_URL) as conn:
        rows = conn.execute("SELECT id, issued_on, vendor, supply FROM receipts ORDER BY issued_on, id").fetchall()
    items = [row(r) for r in rows]
    return {"items": items, "total_supply": sum(i["supply"] for i in items), "total_vat": sum(i["vat"] for i in items)}


@app.get("/api/receipts/by-vendor")
def receipts_by_vendor():
    """거래처마다 공급가액 합계와 부가세 합계. 부가세 합계는 건별 부가세(원 미만 버림)를 더한 값이라 장부 목록과 맞는다."""
    with psycopg.connect(DATABASE_URL) as conn:
        rows = conn.execute("SELECT vendor, supply FROM receipts").fetchall()
    totals: dict[str, dict] = {}
    for vendor, supply in rows:
        t = totals.setdefault(vendor, {"vendor": vendor, "supply": 0, "vat": 0})
        t["supply"] += supply
        t["vat"] += vat(supply)
    return {"items": [totals[v] for v in sorted(totals)]}


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
