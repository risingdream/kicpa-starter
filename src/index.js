// 화면 파일(public/)에 없는 주소만 여기로 온다.
import { calculateVat } from "./vat.js";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/vat") {
      const result = calculateVat(url.searchParams.get("supply"));
      return Response.json(result, { status: result.ok ? 200 : 400 });
    }

    return Response.json({ ok: false, error: "없는 주소입니다." }, { status: 404 });
  },
};
