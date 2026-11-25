// 매입 증빙 화면의 거래처별 합계 계산(stack/web/src/vendorTotals.js). 서버 없이 돈다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { vendorTotals } from "../stack/web/src/vendorTotals.js";

const r = (vendor, supply, vat) => ({ issued_on: "2026-10-01", vendor, supply, vat });

test("정상: 처음 DB의 가상 증빙 3건을 거래처별로 세고 더해 가나다순으로 놓고, 전체 합계를 낸다", () => {
  const items = [r("가상 문구점", 120000, 12000), r("가상 인쇄소", 450000, 45000), r("가상 문구점", 38000, 3800)];
  assert.deepEqual(vendorTotals(items), {
    items: [
      { vendor: "가상 문구점", count: 2, supply: 158000, vat: 15800 },
      { vendor: "가상 인쇄소", count: 1, supply: 450000, vat: 45000 },
    ],
    total: { count: 3, supply: 608000, vat: 60800 },
  });
});

test("정상: 가상 문구점 10,000원을 더하면 3건·168,000원·16,800원, 전체 4건·618,000원·61,800원", () => {
  const items = [r("가상 문구점", 120000, 12000), r("가상 인쇄소", 450000, 45000), r("가상 문구점", 38000, 3800), r("가상 문구점", 10000, 1000)];
  const got = vendorTotals(items);
  assert.deepEqual(got.items[0], { vendor: "가상 문구점", count: 3, supply: 168000, vat: 16800 });
  assert.deepEqual(got.total, { count: 4, supply: 618000, vat: 61800 });
});

test("정상: 부가세는 증빙마다 버린 값을 더한다(1,005원 2건 → 200원, 201원 아님)", () => {
  const items = [r("가상 공구상", 1005, 100), r("가상 공구상", 1005, 100)];
  assert.deepEqual(vendorTotals(items).items, [{ vendor: "가상 공구상", count: 2, supply: 2010, vat: 200 }]);
});

test("경계: 증빙이 없으면 빈 목록과 0인 전체 합계", () => {
  assert.deepEqual(vendorTotals([]), { items: [], total: { count: 0, supply: 0, vat: 0 } });
});

test("경계: 같은 거래처의 매입과 반품이 상쇄되면 2건·0원 줄로 남는다", () => {
  const items = [r("가상 문구점", 38000, 3800), r("가상 문구점", -38000, -3800)];
  assert.deepEqual(vendorTotals(items).items, [{ vendor: "가상 문구점", count: 2, supply: 0, vat: 0 }]);
});

test("예외: 반품이 더 크면 합계가 마이너스다", () => {
  const items = [r("가상 반품처", 10000, 1000), r("가상 반품처", -38005, -3800)];
  assert.deepEqual(vendorTotals(items).items, [{ vendor: "가상 반품처", count: 2, supply: -28005, vat: -2800 }]);
});

test("예외: 띄어쓰기가 다른 거래처 이름은 다른 줄이다", () => {
  const items = [r("가상 문구점", 1000, 100), r("가상문구점", 2000, 200)];
  assert.equal(vendorTotals(items).items.length, 2);
});
