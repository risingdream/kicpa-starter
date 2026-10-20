// 공급가액으로 부가가치세와 합계를 계산한다.
// 실습용 예시다. 세율 10%, 1원 미만은 버린다.
export const VAT_RATE = 0.1;
export const MAX_SUPPLY = 100_000_000_000; // 1천억 원. 그보다 크면 입력 실수로 본다

export function calculateVat(input) {
  const text = String(input ?? "").replaceAll(",", "").trim();
  if (text === "") {
    return { ok: false, error: "공급가액을 입력해 주세요." };
  }
  if (!/^\d+$/.test(text)) {
    return { ok: false, error: "공급가액은 0 이상의 정수(원)로 입력해 주세요." };
  }
  const supply = Number(text);
  if (supply > MAX_SUPPLY) {
    return { ok: false, error: "공급가액이 너무 큽니다. 1천억 원 이하로 입력해 주세요." };
  }
  const vat = Math.floor(supply * VAT_RATE);
  return { ok: true, supply, vat, total: supply + vat };
}
