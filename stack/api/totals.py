"""금액 업무 규칙. DB·웹 서버 없이 도는 함수만 둔다(test_totals.py가 입력을 직접 넣어 확인한다)."""

from datetime import date


def vat(supply: int) -> int:
    """부가세는 공급가액의 10%, 원 미만은 0 쪽으로 버린다(-38,005원 → -3,800원)."""
    return supply // 10 if supply >= 0 else -(-supply // 10)


def vendor_totals(rows) -> dict:
    """(거래처, 공급가액) 목록을 거래처마다 묶어 건수·공급가액 합계·부가세 합계를 낸다.

    부가세 합계는 건별 부가세(원 미만 버림)를 더한 값이라 장부 목록과 맞는다. 공급가액 합계에 10%를 다시 곱하지 않는다.
    거래처는 이름 가나다순이고, total은 모든 거래처를 더한 전체 합계 행이다.
    """
    by_vendor: dict[str, dict] = {}
    total = {"count": 0, "supply": 0, "vat": 0}
    for vendor, supply in rows:
        t = by_vendor.setdefault(vendor, {"vendor": vendor, "count": 0, "supply": 0, "vat": 0})
        for acc in (t, total):
            acc["count"] += 1
            acc["supply"] += supply
            acc["vat"] += vat(supply)
    return {"items": [by_vendor[v] for v in sorted(by_vendor)], "total": total}


def month_range(month: str) -> tuple[date, date]:
    """'YYYY-MM'을 그 달 1일과 다음 달 1일로 바꾼다. 증빙은 시작일 이상 ~ 끝일 미만이다(12월이면 다음 해 1월 1일 미만)."""
    year, mon = int(month[:4]), int(month[5:7])
    start = date(year, mon, 1)
    end = date(year + 1, 1, 1) if mon == 12 else date(year, mon + 1, 1)
    return start, end
