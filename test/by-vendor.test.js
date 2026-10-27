// 띄워 둔 stack/에 요청을 보내는 테스트. 스택이 꺼져 있으면 건너뛴다.
// 다른 테스트와 동시에 같은 DB에서 돌므로, 전용 달(2027-03)과 실행마다 다른 거래처 이름을 쓰고 방금 넣은 거래처 줄만 확인한다.
// 넣은 증빙은 끝나면 지운다. 남겨 두면 수강생 화면의 거래처별 합계에 테스트 줄이 섞인다.
import { after, test } from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.STACK_URL ?? "http://localhost:5173";
const up = await fetch(`${BASE}/api/health`).then((r) => r.ok, () => false);
const skip = up ? false : `스택이 꺼져 있다(${BASE})`;

const created = [];
const add = async (vendor, supply) => {
  const res = await fetch(`${BASE}/api/receipts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ issued_on: "2027-03-02", vendor, supply }),
  });
  assert.equal(res.status, 201);
  created.push((await res.json()).id);
};
after(() => Promise.all(created.map((id) => fetch(`${BASE}/api/receipts/${id}`, { method: "DELETE" }))));

const vendorRow = async (vendor) => {
  const res = await fetch(`${BASE}/api/receipts/by-vendor`);
  assert.equal(res.status, 200);
  return (await res.json()).items.find((v) => v.vendor === vendor);
};

test("정상: 같은 거래처 증빙 두 건의 공급가액과 부가세를 더한다", { skip }, async () => {
  const vendor = `가상 공구상 ${Date.now()}`;
  await add(vendor, 120000);
  await add(vendor, 38000);
  assert.deepEqual(await vendorRow(vendor), { vendor, supply: 158000, vat: 15800 });
});

test("경계: 부가세 합계는 건별 부가세(원 미만 버림)의 합이다 (15원+15원 → 2원, 3원 아님)", { skip }, async () => {
  const vendor = `가상 철물점 ${Date.now()}`;
  await add(vendor, 15);
  await add(vendor, 15);
  assert.deepEqual(await vendorRow(vendor), { vendor, supply: 30, vat: 2 });
});

test("경계: 반품(마이너스) 증빙도 더한다 (120,000원 + -38,005원 → 81,995원, 부가세 12,000원 + -3,800원 = 8,200원)", { skip }, async () => {
  const vendor = `가상 반품처 ${Date.now()}`;
  await add(vendor, 120000);
  await add(vendor, -38005);
  assert.deepEqual(await vendorRow(vendor), { vendor, supply: 81995, vat: 8200 });
});

test("예외: 증빙이 없는 거래처는 합계에 나오지 않는다", { skip }, async () => {
  assert.equal(await vendorRow(`가상 없는 거래처 ${Date.now()}`), undefined);
});
