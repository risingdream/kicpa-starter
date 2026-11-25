"""거래처별 합계 업무 규칙 테스트(totals.py). DB 없이 돈다.

실행: stack/에서 docker compose exec api python -m unittest -v
"""

import unittest
from datetime import date

from totals import month_range, vat, vendor_totals

FIRST_3 = [("가상 문구점", 120000), ("가상 인쇄소", 450000), ("가상 문구점", 38000)]


class VendorTotalsTest(unittest.TestCase):
    def test_first_three_receipts(self):
        """정상: 처음 DB의 가상 증빙 3건"""
        self.assertEqual(
            vendor_totals(FIRST_3),
            {
                "items": [
                    {"vendor": "가상 문구점", "count": 2, "supply": 158000, "vat": 15800},
                    {"vendor": "가상 인쇄소", "count": 1, "supply": 450000, "vat": 45000},
                ],
                "total": {"count": 3, "supply": 608000, "vat": 60800},
            },
        )

    def test_add_one_more(self):
        """정상: 가상 문구점 10,000원을 더하면 3건·168,000원·16,800원, 전체 4건·618,000원·61,800원"""
        got = vendor_totals(FIRST_3 + [("가상 문구점", 10000)])
        self.assertEqual(got["items"][0], {"vendor": "가상 문구점", "count": 3, "supply": 168000, "vat": 16800})
        self.assertEqual(got["total"], {"count": 4, "supply": 618000, "vat": 61800})

    def test_vat_is_sum_of_each_receipt(self):
        """경계: 1,005원 증빙 2건의 부가세 합계는 건별 100+100=200원(합계 2,010원의 10%인 201원이 아니다)"""
        got = vendor_totals([("가상 공구상", 1005), ("가상 공구상", 1005)])
        self.assertEqual(got["items"], [{"vendor": "가상 공구상", "count": 2, "supply": 2010, "vat": 200}])
        self.assertEqual(got["total"]["vat"], 200)

    def test_empty(self):
        """경계: 증빙이 없으면 빈 목록과 0인 전체 합계"""
        self.assertEqual(vendor_totals([]), {"items": [], "total": {"count": 0, "supply": 0, "vat": 0}})

    def test_negative_return(self):
        """예외: 반품(음수) 증빙도 건수에 세고 더한다. -38,005원의 부가세는 -3,800원(0 쪽으로 버림)"""
        self.assertEqual(vat(-38005), -3800)
        got = vendor_totals([("가상 반품처", 120000), ("가상 반품처", -38005)])
        self.assertEqual(got["items"], [{"vendor": "가상 반품처", "count": 2, "supply": 81995, "vat": 8200}])

    def test_vendor_names_compared_as_written(self):
        """예외: 띄어쓰기가 다른 거래처 이름은 다른 줄이다"""
        self.assertEqual(len(vendor_totals([("가상 문구점", 1000), ("가상문구점", 2000)])["items"]), 2)


class MonthRangeTest(unittest.TestCase):
    def test_october(self):
        """정상: 2026-10은 10월 1일 이상 11월 1일 미만"""
        self.assertEqual(month_range("2026-10"), (date(2026, 10, 1), date(2026, 11, 1)))

    def test_december_rolls_over_to_next_year(self):
        """경계: 2026-12는 2027-01-01 미만까지"""
        self.assertEqual(month_range("2026-12"), (date(2026, 12, 1), date(2027, 1, 1)))

    def test_last_day_is_inside_first_day_of_next_month_is_not(self):
        """경계: 10월 31일은 10월에 들고, 11월 1일은 들지 않는다"""
        start, end = month_range("2026-10")
        self.assertTrue(start <= date(2026, 10, 31) < end)
        self.assertFalse(start <= date(2026, 11, 1) < end)


if __name__ == "__main__":
    unittest.main()
