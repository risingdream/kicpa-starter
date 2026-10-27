import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const won = (n) => n.toLocaleString("ko-KR") + "원";
const today = () => new Date().toISOString().slice(0, 10);
const EMPTY = "표시할 거래가 없습니다";
const num = "text-right tabular-nums";

function Section({ title, children }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-base font-semibold">{title}</h2>
      <div className="rounded-md border bg-white">{children}</div>
    </section>
  );
}

const Empty = () => <p className="px-3 py-6 text-center text-sm text-muted-foreground">{EMPTY}</p>;

export default function App() {
  const [data, setData] = useState(null);
  const [vendors, setVendors] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ issued_on: today(), vendor: "", supply: "" });

  const load = async () => {
    try {
      const res = await fetch("/api/receipts");
      if (!res.ok) throw new Error(`서버 응답 ${res.status}`);
      setData(await res.json());
      setError("");
    } catch (e) {
      setError("목록을 가져오지 못했습니다: " + e.message);
    }
  };
  const loadVendors = async () => {
    try {
      const res = await fetch("/api/receipts/by-vendor");
      if (!res.ok) throw new Error(`서버 응답 ${res.status}`);
      setVendors((await res.json()).items);
    } catch (e) {
      setError("거래처별 합계를 가져오지 못했습니다: " + e.message);
    }
  };
  useEffect(() => { load(); loadVendors(); }, []);

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

      {error && <p className="error">{error}</p>}
      {!data && !error && <p className="text-sm text-muted-foreground">불러오는 중입니다…</p>}
      {data && (
        <>
          <Section title="증빙 목록">
            {data.items.length === 0 ? <Empty /> : (
              <Table>
                <TableHeader><TableRow><TableHead>날짜</TableHead><TableHead>거래처</TableHead><TableHead className={num}>공급가액</TableHead><TableHead className={num}>부가세</TableHead></TableRow></TableHeader>
                <TableBody>
                  {data.items.map((r) => (
                    <TableRow key={r.id}><TableCell>{r.issued_on}</TableCell><TableCell>{r.vendor}</TableCell><TableCell className={num}>{won(r.supply)}</TableCell><TableCell className={num}>{won(r.vat)}</TableCell></TableRow>
                  ))}
                </TableBody>
                <TableFooter><TableRow><TableCell colSpan={2}>합계</TableCell><TableCell className={num}>{won(data.total_supply)}</TableCell><TableCell className={num}>{won(data.total_vat)}</TableCell></TableRow></TableFooter>
              </Table>
            )}
          </Section>

          <Section title="거래처별 합계">
            {!vendors ? null : vendors.length === 0 ? <Empty /> : (
              <Table>
                <TableHeader><TableRow><TableHead>거래처</TableHead><TableHead className={num}>공급가액 합계</TableHead><TableHead className={num}>부가세 합계</TableHead></TableRow></TableHeader>
                <TableBody>
                  {vendors.map((t) => (
                    <TableRow key={t.vendor}><TableCell>{t.vendor}</TableCell><TableCell className={num}>{won(t.supply)}</TableCell><TableCell className={num}>{won(t.vat)}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Section>
        </>
      )}
    </main>
  );
}
