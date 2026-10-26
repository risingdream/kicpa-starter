// 띄워 둔 stack/에 요청을 보내는 테스트. 스택이 꺼져 있으면 건너뛴다.
// 다른 테스트와 동시에 같은 DB에서 돌므로, 전용 달(2027-05)과 실행마다 다른 거래처 이름을 쓰고 방금 넣은 줄로만 확인한다.
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.STACK_URL ?? "http://localhost:5173";
const up = await fetch(`${BASE}/api/health`).then((r) => r.ok, () => false);
const skip = up ? false : `스택이 꺼져 있다(${BASE})`;

const post = (vendor, supply) =>
  fetch(`${BASE}/api/receipts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ issued_on: "2027-05-04", vendor, supply }),
  });

test("정상: 반품처럼 공급가액이 마이너스여도 넣고, 부가세는 0 쪽으로 버린다 (-38,005원 → -3,800원)", { skip }, async () => {
  const vendor = `가상 반품처 ${Date.now()}`;
  const res = await post(vendor, -38005);
  assert.equal(res.status, 201);
  assert.deepEqual((({ supply, vat }) => ({ supply, vat }))(await res.json()), { supply: -38005, vat: -3800 });
  const list = await fetch(`${BASE}/api/receipts`).then((r) => r.json());
  assert.equal(list.items.find((r) => r.vendor === vendor).vat, -3800);
});

test("경계: -9원이면 부가세 0원, -10,000,000,000원까지 넣는다", { skip }, async () => {
  const vendor = `가상 에누리처 ${Date.now()}`;
  const small = await post(vendor, -9);
  assert.equal(small.status, 201);
  assert.equal((await small.json()).vat, 0);
  const big = await post(vendor, -10_000_000_000);
  assert.equal(big.status, 201);
  assert.equal((await big.json()).vat, -1_000_000_000);
});

test("예외: 0원, -10,000,000,001원, 빈칸 거래처는 422", { skip }, async () => {
  const vendor = `가상 잘못된 입력 ${Date.now()}`;
  assert.equal((await post(vendor, 0)).status, 422, "0원");
  assert.equal((await post(vendor, -10_000_000_001)).status, 422, "하한 밖");
  assert.equal((await post("   ", -1000)).status, 422, "빈칸 거래처");
});
