// 띄워 둔 stack/에 요청을 보내는 테스트. 스택이 꺼져 있으면 건너뛴다.
// 다른 테스트와 동시에 같은 DB에서 돌므로, 전용 달(2027-04)과 실행마다 다른 거래처 이름을 쓰고 방금 넣은 줄로만 확인한다.
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.STACK_URL ?? "http://localhost:5173";
const up = await fetch(`${BASE}/api/health`).then((r) => r.ok, () => false);
const skip = up ? false : `스택이 꺼져 있다(${BASE})`;

const addApril = async (vendor) => {
  const res = await fetch(`${BASE}/api/receipts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ issued_on: "2027-04-03", vendor, supply: 1000 }),
  });
  assert.equal(res.status, 201);
};
const list = (query = "") => fetch(`${BASE}/api/receipts${query}`).then((r) => r.json());

test("정상: month=2027-04면 그 달 증빙만 돌려주고 합계도 그 달 것만 더한다", { skip }, async () => {
  const vendor = `가상 공구상 ${Date.now()}`;
  await addApril(vendor);
  const data = await list("?month=2027-04");
  assert.ok(data.items.some((r) => r.vendor === vendor));
  assert.ok(data.items.every((r) => r.issued_on.startsWith("2027-04")));
  assert.equal(data.total_supply, data.items.reduce((s, r) => s + r.supply, 0));
});

test("경계: month가 없으면 전체를 돌려준다", { skip }, async () => {
  const vendor = `가상 철물점 ${Date.now()}`;
  await addApril(vendor);
  assert.ok((await list()).items.some((r) => r.vendor === vendor));
});

test("예외: 2026-13, 202610처럼 형식이 틀리면 422", { skip }, async () => {
  for (const month of ["2026-13", "202610"]) {
    const res = await fetch(`${BASE}/api/receipts?month=${month}`);
    assert.equal(res.status, 422, month);
  }
});
