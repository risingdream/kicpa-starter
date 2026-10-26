// 증빙 목록을 거래처 이름으로 묶어 공급가액·부가세를 더한다. 화면은 이 결과를 그대로 그린다.
// 부가세는 증빙마다 계산된 값을 더한다(합계에 10%를 다시 곱하지 않는다). 그래야 증빙 목록과 맞는다.
// 거래처 이름은 글자 그대로 비교하고, 결과는 이름 가나다순이다.
export function vendorTotals(items) {
  const byVendor = new Map();
  for (const { vendor, supply, vat } of items) {
    const t = byVendor.get(vendor) ?? { vendor, supply: 0, vat: 0 };
    t.supply += supply;
    t.vat += vat;
    byVendor.set(vendor, t);
  }
  return [...byVendor.values()].sort((a, b) => a.vendor.localeCompare(b.vendor, "ko"));
}
