import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateVat } from "../src/vat.js";

test("정상: 공급가액 100,000원이면 부가세 10,000원, 합계 110,000원", () => {
  assert.deepEqual(calculateVat("100000"), { ok: true, supply: 100000, vat: 10000, total: 110000 });
});

test("정상: 쉼표가 있어도 계산한다", () => {
  assert.deepEqual(calculateVat("1,234,567"), { ok: true, supply: 1234567, vat: 123456, total: 1358023 });
});

test("경계: 0원이면 부가세 0원", () => {
  assert.deepEqual(calculateVat("0"), { ok: true, supply: 0, vat: 0, total: 0 });
});

test("경계: 1원 미만은 버린다 (9원 → 부가세 0원)", () => {
  assert.deepEqual(calculateVat("9"), { ok: true, supply: 9, vat: 0, total: 9 });
});

test("예외: 빈 값, 음수, 소수, 글자는 오류", () => {
  for (const input of ["", undefined, "-100", "100.5", "십만원"]) {
    assert.equal(calculateVat(input).ok, false, `입력: ${input}`);
  }
});

test("예외: 1천억 원보다 크면 오류", () => {
  assert.equal(calculateVat("100000000001").ok, false);
});
