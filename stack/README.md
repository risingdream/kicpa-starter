# Docker 실습 스택 (2일차 TASK-5, 3일차 실습 E)

Python API, React 화면, PostgreSQL DB를 내 노트북에 **한꺼번에** 띄우는 실습용 예시입니다. 2일차에는 띄워서 agent에게 기능 하나(거래처별 합계, `TASK-5`)를 맡겨 세 층을 함께 고쳐 보고, 3일차 실습 E에서는 Cloudflare 터널로 인터넷 주소를 붙여 휴대폰에서 엽니다. 예시 업무는 매입 증빙 목록(날짜·거래처·공급가액 → 부가세 10%)입니다. 반품·에누리(수정세금계산서)처럼 공급가액이 마이너스인 증빙도 넣을 수 있고(0원은 넣지 않음), 부가세는 원 미만을 0 쪽으로 버립니다(-38,005원 → -3,800원). 모두 가상 자료입니다.

저장소 바깥쪽(`public/`, `src/`)의 부가세 계산기와는 별개입니다. 그쪽은 Cloudflare Workers로 배포하고(실습 D), 이쪽은 내 노트북에서 띄워 고쳐 보고(2일차) 터널로 엽니다(실습 E). 2일차 완성본·QA 연습용 브랜치와 자료를 증빙 3건으로 되돌리는 법은 [`../docs/day2-checkpoints.md`](../docs/day2-checkpoints.md)에 있습니다.

## 세 컨테이너

| 이름 | 하는 일 | 코드 | 바깥에서 열 수 있나 |
|---|---|---|---|
| `web` | React 화면. `/api/...` 요청은 `api`로 넘긴다 | `web/src/` | 예. <http://localhost:5173> |
| `api` | Python(FastAPI) 서버. DB를 읽고 쓴다 | `api/main.py` | 아니오. `web`을 거쳐서만 |
| `db` | PostgreSQL DB. 처음 만들 때 `db/init.sql`을 실행한다 | `db/init.sql` | 아니오 |
| `tunnel` | Cloudflare Quick Tunnel. `web`에 임시 인터넷 주소를 붙인다 | (설정만) | `--profile tunnel`을 줄 때만 뜬다 |

컨테이너는 프로그램을 실행 환경째 담은 상자이고, 이미지는 그 상자의 원본입니다. 세 컨테이너를 한 번에 띄우는 설정이 `compose.yaml`입니다.

## 명령

모두 `stack/`에서 칩니다. 먼저 Docker Desktop을 켜 둡니다.

| 할 일 | 명령 |
|---|---|
| 띄우기(처음엔 몇 분 걸린다) | `docker compose up -d --build` |
| 상태 보기 | `docker compose ps` |
| 화면 열기 | 브라우저에서 <http://localhost:5173> |
| 로그 보기 | `docker compose logs -f api` (멈출 때 `Ctrl + C`) |
| 인터넷에 열기 | `docker compose --profile tunnel up -d tunnel` |
| 인터넷 주소 찾기 | `docker compose logs tunnel` 에서 `https://….trycloudflare.com` |
| 인터넷에서 닫기 | `docker compose stop tunnel` |
| 모두 끄기(자료는 남는다) | `docker compose --profile tunnel down` |
| 자료까지 지우고 처음부터 | `docker compose --profile tunnel down -v` |

- 코드를 고치면 `web`과 `api`는 저장만 해도 바로 다시 읽습니다. `compose.yaml`, `Dockerfile`, `requirements.txt`, `package.json`을 고쳤을 때만 `docker compose up -d --build`를 다시 칩니다.
- `db/init.sql`은 **DB를 처음 만들 때 한 번만** 실행됩니다. 표 구조를 바꾸려면 `down -v`로 자료를 지우고 다시 띄우거나, 이미 있는 DB에 바꾸는 명령(`ALTER TABLE`)을 따로 실행해야 합니다.

## 주의

- 터널 주소는 **인터넷의 누구나** 열 수 있고, 연 사람은 증빙을 추가할 수도 있습니다. 가상 자료만 넣고, 다 봤으면 바로 닫습니다.
- 터널은 내 노트북과 Docker가 켜져 있는 동안만 열립니다. 노트북을 덮으면 주소도 죽습니다. 주소는 띄울 때마다 바뀝니다. 오래 열어 둘 서비스에는 쓰지 않습니다.
- `compose.yaml`의 DB 비밀번호는 로컬 연습용 값입니다. DB는 노트북 바깥에 열지 않으므로 다른 기기에서 쓸 수 없습니다. 실제 서비스의 비밀번호는 파일에 적지 않습니다.
- 이미지 버전(`python:3.12-slim`, `node:22-slim`, `postgres:17-alpine`, `cloudflare/cloudflared`)은 사전 과제에서 미리 받은 것과 같습니다. 바꾸면 강의장에서 다시 내려받아야 합니다.
