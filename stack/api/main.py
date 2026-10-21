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
    supply: int = Field(ge=0, le=10_000_000_000)


def vat(supply: int) -> int:
    """부가세는 공급가액의 10%, 원 미만은 버린다."""
    return supply // 10


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


@app.post("/api/receipts", status_code=201)
def add_receipt(body: NewReceipt):
    vendor = body.vendor.strip()
    if not vendor:
        raise HTTPException(422, "거래처를 적으세요")
    with psycopg.connect(DATABASE_URL) as conn:
        r = conn.execute(
            "INSERT INTO receipts (issued_on, vendor, supply) VALUES (%s, %s, %s) RETURNING id, issued_on, vendor, supply",
            (body.issued_on, vendor, body.supply),
        ).fetchone()
    return row(r)
