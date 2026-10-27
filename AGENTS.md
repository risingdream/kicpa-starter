# agent 작업 규칙

이 저장소의 사용자는 개발 경험이 없는 회계사다. 아래 규칙을 지킨다.

## 말하기

- 한국어로 답한다. 처음 나오는 개발 용어는 괄호 안에 한 줄로 풀어 준다.
- 결론을 먼저 말하고, 그다음 무엇을 바꿨는지와 어떻게 확인했는지를 말한다.
- 모르는 것은 모른다고 말한다. 확인하지 않은 것을 됐다고 하지 않는다.

## 일하는 단위

할 일은 저장소 안 `backlog/`에 마크다운 파일로 있다. 도구는 Backlog.md이고 명령은 `npx backlog …`로 실행한다(이 저장소에 버전을 고정해 설치했다. 아래 Backlog.md 블록의 `backlog` 명령도 앞에 `npx`를 붙인다).

- 한 번에 작업 하나만 한다. 사용자가 작업 번호(예: `TASK-1.1`)를 주지 않으면 먼저 묻는다.
- 작업은 `npx backlog task view <번호> --plain`으로 읽고, 인수 조건(Acceptance Criteria)과 설명의 "하지 말 것"을 지킨다.
- **계획을 먼저 쓰고 승인을 기다린다.** 상태를 `진행 중`으로 바꾸고 `--plan`으로 구현 계획을 적은 뒤, 계획을 사용자에게 보여 주고 "진행해"를 들을 때까지 코드를 고치지 않는다. 이 저장소는 모든 작업에 계획 검토가 필요하다.
- 작업을 새로 만들거나 나눌 때는 `npx backlog task create`로 만든다. 스토리는 제목 앞에 `[스토리]`, 라벨 `스토리`, 설명에 "나는 ___로서 ___를 원한다. 끝나면 ___로 확인한다."와 "하지 말 것"을 쓴다. 작업은 `-p <스토리 번호>`로 스토리 아래에 두고, 제목은 동사로 끝나는 한 줄, 인수 조건은 `--ac`로 1~3개 쓴다. 만들기 전에 제목과 인수 조건을 사용자에게 보여 주고 확인을 받는다.
- 끝나면 확인한 인수 조건만 `--check-ac`로 체크하고, `--final-summary`에 변경한 파일, 실행한 테스트와 결과, 남은 위험을 적는다. 완료 기준(Definition of Done)의 "사람이 검토했다"는 체크하지 않는다. 상태를 `완료`로 옮기는 일은 사용자가 확인한 뒤에만 한다.
- `backlog/` 안의 파일을 직접 고치지 않는다. 항상 `npx backlog` 명령으로 고친다.

## 워크트리(worktree)에서 일할 때

Orca 같은 도구로 이슈마다 워크트리(worktree, 같은 프로젝트를 따로 펼친 사본)를 열어 여러 agent가 동시에 일할 수 있다.

- 내 워크트리 밖의 파일은 읽기만 하고 고치지 않는다.
- 이슈에 적힌 약속 문서(`docs/wireframes/*.md`의 API·CSV 약속)는 동시에 일하는 다른 이슈도 따른다. 약속을 바꿔야 하면 코드를 고치기 전에 사용자에게 묻는다.
- 의존 이슈(`dependencies`)가 아직 `완료`가 아니면 시작하지 말고 사용자에게 알린다.
- 이슈를 시작하기 전에 `git log HEAD..main --oneline`으로 이 워크트리가 main보다 뒤처졌는지 본다. 뒤처졌으면 계획을 쓰기 전에 사용자에게 main을 먼저 합칠지 묻는다. 다른 스토리가 같은 파일을 고쳤을 수 있다.
- `stack/`을 띄울 때는 워크트리마다 이름과 포트를 따로 준다: `WEB_PORT=5174 docker compose -p <워크트리 이름> up -d --build`. 끝나면 `docker compose -p <워크트리 이름> down -v`로 내린다.

## QA 이슈

라벨이 `QA`인 이슈는 기능을 만들지 않고 확인만 한다. 인수 조건 한 줄이 QA 표의 한 줄이다.

1. 확인할 기능이 모두 main에 합쳐졌는지 보고, 깨끗한 스택을 띄운다(`down -v` 뒤 `up -d --build`).
2. 인수 조건을 위에서부터 하나씩 화면에서 직접 해 본다. 통과한 줄만 `--check-ac`로 체크한다.
3. 실패한 줄마다 `[버그]` 이슈를 만든다: `npx backlog task create "[버그] …" -p <스토리 번호> -l 버그 --ac "<실패한 인수 조건 그대로>"`. 설명에 재현 순서, 기대한 결과, 실제 결과를 적는다. QA 중에 코드를 직접 고치지 않는다.
4. 사용자가 `[버그]` 이슈를 따로 맡겨 고친 뒤 main에 합치면, QA 이슈의 체크를 모두 풀고 1번부터 다시 돈다.
5. 모든 줄이 통과하면 최종 요약에 몇 번째 반복에서 통과했는지와 만든 `[버그]` 이슈 번호를 적는다. 세 번 돌아도 통과하지 않으면 멈추고 사용자에게 알린다.

## 바꾸는 방법

- 작게 바꾸고 바로 확인한다. 바꾼 뒤에는 `npm test`를 돌리고 결과를 그대로 보고한다.
- 테스트가 실패하면 테스트나 기대값을 고쳐서 통과시키지 않는다. 기대값이 틀렸다고 보이면 사용자에게 먼저 묻는다.
- 새 기능에는 정상·경계·예외 사례 테스트를 함께 만든다. 테스트는 `test/`에 두고 Node 내장 `node:test`를 쓴다.
- 띄워 둔 스택(`stack/`)에 요청을 보내는 테스트는 다른 테스트 파일과 동시에 돌고, 같은 DB에서 여러 번 돈다. 그래서 예시 자료 개수, 전체 합계, 요청 전후의 개수 차이처럼 다른 테스트나 지난 실행이 바꿀 수 있는 값을 기대하지 않는다.
- 스택 테스트는 다른 테스트가 쓰지 않는 달(예: 2027-03)을 쓰고, 넣는 가상 증빙의 거래처 이름에 실행마다 달라지는 표시를 붙인다(예: `가상 공구상 ${Date.now()}`). 확인은 방금 넣은 그 줄로만 한다.
- 스택 테스트가 넣은 증빙은 테스트가 끝날 때 `DELETE /api/receipts/{id}`로 지운다(`after()`). 남기면 사용자가 보는 장부 화면에 테스트 줄이 섞인다.
- 스택 테스트를 고쳤으면 깨끗한 스택에서 한 번, 같은 스택에서 한 번 더 `npm test`를 돌려 둘 다 통과하는지 본다.
- 작업 범위 밖의 파일은 고치지 않는다. 필요해 보이면 제안만 한다.
- 새 패키지 설치는 사용자에게 먼저 묻는다. 지금 의존성은 `wrangler`(배포)와 `backlog.md`(작업 관리) 둘이다. `stack/`은 따로 `stack/api/requirements.txt`와 `stack/web/package.json`에 고정돼 있다. `stack/web`에는 Tailwind CSS·shadcn/ui가 설정돼 있다(아래 '화면 디자인').

## 화면 디자인

- `stack/web`의 새 화면은 `src/components/ui`의 shadcn/ui 부품과 Tailwind 테마 색(`src/style.css`의 `--color-*`)만 쓴다. 색 값을 직접 적거나 같은 역할의 부품을 새로 만들지 않는다.
- 필요한 부품이 없으면 `stack/web`에서 `npx shadcn@4.22.1 add <부품 이름>`으로 가져온다. 가져온 부품은 `cn`을 `@/lib/utils`에서 불러와야 한다(npm의 `cn` 패키지를 깔지 않는다).
- 금액 칸은 오른쪽 정렬(`text-right tabular-nums`), 자료가 없으면 "표시할 거래가 없습니다"를 보인다.

## 자료와 비밀값

- 실제 고객 자료를 쓰지 않는다. 테스트와 예시는 "A 법인", "가상 거래처" 같은 가상 자료로 만든다.
- 토큰·비밀번호·API 키를 파일, 커밋, 화면 출력에 남기지 않는다. 필요하면 `.dev.vars`(로컬)에 넣으라고 안내만 하고, 값을 대화에 붙여 넣게 하지 않는다.
- `.env`, `.dev.vars`는 커밋하지 않는다.

## commit과 배포

- commit은 사용자가 `git diff`를 확인한 뒤에 한다. 사용자가 시키기 전에는 commit하지 않는다.
- 배포(`npm run deploy`)는 사용자가 `docs/qa-deploy-checklist.md`를 채우고 승인한 뒤에만 한다.
- Cloudflare 로그인(`npx wrangler login`)과 권한 승인은 사용자가 직접 한다.
- 개인정보를 받는 기능이 생기면 배포를 멈추고 사용자에게 알린다. 이 저장소의 배포 방법(Cloudflare)은 개인정보가 없는 도구용이다.

## 명령

| 할 일 | 명령 |
|---|---|
| 처음 준비 | `npm install` |
| 테스트 | `npm test` |
| 내 노트북에서 화면 띄우기 | `npm run dev` → <http://localhost:8787> |
| 작업 보드(웹) 띄우기 | `npm run board` → <http://localhost:6420> |
| 작업 목록 보기 | `npx backlog task list --plain` |
| 배포 (승인 뒤) | `npm run deploy` |
| Docker 스택 띄우기 (2일차·실습 E) | `stack/`에서 `docker compose up -d --build` → <http://localhost:5173> |
| 장부를 내 휴대폰에서 열기 | `docs/day2-checkpoints.md` 3절 "휴대폰에서 열기"(Tailscale serve) |

## 구조

- `public/` — 화면 파일. 그대로 보여 준다.
- `src/index.js` — `public/`에 없는 주소(`/api/...`)를 받는다.
- `src/vat.js` — 계산 예시. 계산은 화면이 아니라 `src/`에 두고 테스트한다.
- `docs/` — 첫 개발 한 장, 와이어프레임, QA·배포 점검표 서식. 2일차 체크포인트 브랜치(`day2-b1-done`, `day2-done`, `day2-qa-bug`)와 자료 되돌리는 법은 `docs/day2-checkpoints.md`. 사용자가 "완성본으로 바꿔 타 줘", "증빙 3건으로 되돌려 줘"처럼 업무 말로 시키면 그 문서의 '에이전트가 따를 절차'대로 한다.
- `backlog/` — 이슈(스토리·작업)와 설정(`config.yml`). Backlog.md가 관리한다.
- `stack/` — 2일차 거래처별 합계(`TASK-5`)와 3일차 실습 E의 Docker 스택(매입 증빙 장부). Python API(`api/`), React 화면(`web/`), PostgreSQL(`db/`)을 `compose.yaml` 하나로 띄운다. 설명은 `stack/README.md`. 이미지 버전은 바꾸지 않는다. DB 구조를 바꾸면 이미 있는 DB에는 `init.sql`이 다시 돌지 않는다는 점을 사용자에게 알린다. 터널(`--profile tunnel`)은 사용자가 시킬 때만 띄운다. 화면은 `127.0.0.1`에만 열려 있다. 사용자가 "휴대폰에서 열어 줘"처럼 시키면 `docs/day2-checkpoints.md` 3절 "휴대폰에서 열기"의 Tailscale serve 절차대로 한다. 포트를 모든 네트워크에 열거나 `tailscale funnel`을 쓰지 않는다.

<!-- BACKLOG.MD GUIDELINES START -->
<!-- backlog.md-instructions-version: 1.54.0 -->
<CRITICAL_INSTRUCTION>

## Backlog.md Workflow

This project uses Backlog.md for task and project management.

**At the beginning of each conversation in this project, run `backlog instructions overview` before answering or taking action. Re-read it only if you have not read it yet in the current conversation.**

Use the overview to decide whether to search, read, create, or update Backlog tasks.

Before task lifecycle actions, read the matching detailed guide:
- `backlog instructions task-creation` before creating or splitting tasks
- `backlog instructions task-execution` before planning, changing status or assignee, adding a plan or implementation notes, or implementing task work
- `backlog instructions task-finalization` before checking acceptance criteria, writing final summaries, or moving tasks to terminal statuses

Use `backlog <command> --help` before running unfamiliar commands. Help shows options, fields, and examples.

Do not edit Backlog task, draft, document, decision, or milestone markdown files directly. Use the `backlog` CLI so metadata, relationships, and history stay consistent.

</CRITICAL_INSTRUCTION>
<!-- BACKLOG.MD GUIDELINES END -->
