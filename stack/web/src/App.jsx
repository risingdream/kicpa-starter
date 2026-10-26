import { useEffect, useState } from "react";

const won = (n) => n.toLocaleString("ko-KR") + "원";
const today = () => new Date().toISOString().slice(0, 10);

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ issued_on: today(), vendor: "", supply: "" });
  const [month, setMonth] = useState("");

  const load = async () => {
    try {
      const res = await fetch(month ? `/api/receipts?month=${month}` : "/api/receipts");
      if (!res.ok) throw new Error(`서버 응답 ${res.status}`);
      setData(await res.json());
      setError("");
    } catch (e) {
      setError("목록을 가져오지 못했습니다: " + e.message);
    }
  };
  useEffect(() => { load(); }, [month]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/receipts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, supply: Number(form.supply) }),
    });
    if (!res.ok) return setError("저장하지 못했습니다. 날짜·거래처·공급가액을 확인하세요.");
    setForm({ ...form, vendor: "", supply: "" });
    load();
  };

  return (
    <main>
      <h1>매입 증빙</h1>
      <p className="note">교육용 가상 자료입니다. 실제 거래처를 넣지 마세요.</p>

      <form onSubmit={submit}>
        <label>날짜<input type="date" required value={form.issued_on} onChange={(e) => setForm({ ...form, issued_on: e.target.value })} /></label>
        <label>거래처<input required maxLength={50} placeholder="가상 거래처" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} /></label>
        <label>공급가액<input type="number" required step="1" value={form.supply} onChange={(e) => setForm({ ...form, supply: e.target.value })} /></label>
        <button type="submit">추가</button>
      </form>

      <div className="month">
        <label>월<input type="month" value={month} onChange={(e) => setMonth(e.target.value)} /></label>
        <button type="button" onClick={() => setMonth("")}>전체 보기</button>
      </div>

      {error && <p className="error">{error}</p>}
      {data && data.items.length === 0 && month && <p className="note">이 달 증빙이 없습니다</p>}
      {data && (data.items.length > 0 || !month) && (
        <table>
          <thead><tr><th>날짜</th><th>거래처</th><th>공급가액</th><th>부가세</th></tr></thead>
          <tbody>
            {data.items.map((r) => (
              <tr key={r.id}><td>{r.issued_on}</td><td>{r.vendor}</td><td>{won(r.supply)}</td><td>{won(r.vat)}</td></tr>
            ))}
          </tbody>
          <tfoot><tr><th colSpan="2">합계</th><th>{won(data.total_supply)}</th><th>{won(data.total_vat)}</th></tr></tfoot>
        </table>
      )}
    </main>
  );
}
