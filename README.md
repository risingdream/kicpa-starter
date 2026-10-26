# 한공회 과정 실습용 기본 저장소

한국공인회계사회 3일 과정에서 쓰는 **실습 출발점**입니다. 개발 경험이 없어도 이 안내대로 따라 하면 됩니다.

들어 있는 것은 세 가지뿐입니다.

- **화면 한 장** — 공급가액을 넣으면 부가세와 합계를 보여 주는 예시 화면(`public/index.html`)
- **작은 API 하나** — 화면이 계산을 맡기는 주소 `/api/vat`(`src/`). API는 화면이 서버에 일을 시키는 창구입니다
- **Cloudflare 배포 설정** — 이 저장소를 인터넷 주소로 여는 설정(`wrangler.toml`). 배포는 내 컴퓨터에서 만든 것을 다른 사람도 열 수 있는 곳에 올리는 일입니다

2일차와 3일차 실습 E에서 쓰는 **Docker 스택**(매입 증빙 장부)은 `stack/`에 따로 있습니다. Python API·React 화면·PostgreSQL DB를 내 노트북에 띄우고, 2일차에는 거래처별 합계(`TASK-5`)를 더해 보고 3일차에는 Cloudflare 터널로 엽니다. 2일차에 막히면 바꿔 탈 완성본·QA 연습용 브랜치는 [`docs/day2-checkpoints.md`](docs/day2-checkpoints.md)에 있습니다. 설명은 [`stack/README.md`](stack/README.md)를 봅니다.

실습에서는 이 예시를 내 업무 도구로 바꿔 갑니다. 코드는 agent(Claude Code·Codex·OpenCode)가 쓰고, 나는 무엇을 만들지 정하고 결과를 확인합니다.

## 0. 미리 있어야 하는 것

| 무엇 | 확인 방법 | 없으면 |
|---|---|---|
| GitHub 계정 | github.com에 로그인된다 | github.com에서 가입(무료) |
| Git | 터미널에서 `git --version` | [git-scm.com](https://git-scm.com)에서 설치 |
| Node.js (LTS 버전) | 터미널에서 `node -v` → `v20` 이상 | [nodejs.org](https://nodejs.org)에서 LTS 설치 |
| GitHub CLI(`gh`) | 터미널에서 `gh --version` | [cli.github.com](https://cli.github.com)에서 설치 |
| coding agent 1개 (Claude Code·Codex·OpenCode) | 터미널에서 `claude`·`codex`·`opencode` | 과정 사전 과제 안내를 따른다 |
| Docker Desktop | 터미널에서 `docker compose version` | [docker.com](https://www.docker.com/products/docker-desktop/)에서 설치. 2일차와 3일차 실습 E에서 쓴다 |

터미널은 명령을 글자로 치는 창입니다. macOS는 "터미널", 윈도는 "PowerShell"을 엽니다. 설치한 뒤에는 터미널을 새로 열어야 명령이 잡힙니다.

## 1. 내 저장소로 만들기

이 저장소는 **템플릿**입니다. 템플릿은 복사해서 내 것으로 쓰라고 만든 원본입니다. 원본을 직접 고치지 않고, 복사본을 내 계정에 만듭니다.

**웹 화면으로 하는 방법**

1. 이 저장소 페이지 오른쪽 위의 **Use this template → Create a new repository**를 누릅니다.
2. Owner는 내 계정, 이름은 내 도구 이름(예: `vat-check`)으로 정합니다. 영문 소문자와 `-`만 씁니다.
3. 공개 범위는 **Private**을 고릅니다.
4. **Create repository**를 누릅니다.

그다음 내 노트북으로 가져옵니다(이 일을 clone이라고 합니다).

```bash
gh auth login                      # 처음 한 번. 안내대로 브라우저에서 로그인
gh repo clone <내 계정>/<내 저장소 이름>
cd <내 저장소 이름>
```

**명령 한 줄로 하는 방법** (`gh` 로그인 뒤)

```bash
gh repo create <내 저장소 이름> --template risingdream/kicpa-starter --private --clone
cd <내 저장소 이름>
```

## 2. agent 실행하기

프로젝트 **안에서** agent를 실행합니다. 다른 위치에서 실행하면 agent가 엉뚱한 파일을 봅니다.

```bash
claude
# 또는
codex
```

첫 요청:

> 이 저장소의 README.md와 AGENTS.md를 먼저 읽고, 무엇을 하는 저장소인지와 실행 명령을 요약해 줘. 아직 파일을 수정하지 마.

`AGENTS.md`는 agent에게 주는 작업 규칙입니다(Claude Code는 `CLAUDE.md`를 거쳐 같은 파일을 읽습니다). 한국어로 답하기, 작게 바꾸고 확인하기, 비밀값을 올리지 않기 같은 약속이 들어 있습니다.

## 3. 내 노트북에서 열어 보기

agent에게 시켜도 되고 직접 쳐도 됩니다.

```bash
npm install     # 처음 한 번. 필요한 도구를 내려받는다
npm test        # 테스트(계산이 맞는지 자동으로 확인)를 돌린다
npm run dev     # 내 노트북에서 화면을 띄운다
```

`npm run dev`를 실행한 뒤 브라우저에서 <http://localhost:8787>을 엽니다. `localhost`는 "내 노트북"이라는 뜻의 주소라 나만 볼 수 있습니다. 공급가액에 `100000`을 넣고 [계산하기]를 눌러 부가세 `10,000원`, 합계 `110,000원`이 나오면 성공입니다. 멈출 때는 터미널에서 `Ctrl + C`를 누릅니다.

## 4. 이슈 하나씩 일하기

할 일은 **이슈**에 한 건씩 적습니다. 이슈는 "무엇을 하고, 끝나면 어떻게 확인하는지"를 적은 메모입니다. 이 저장소는 [Backlog.md](https://github.com/MrLesk/Backlog.md)라는 도구로 이슈를 `backlog/tasks/` 안 파일로 관리합니다. 계정이나 서버가 따로 없고, 바뀐 기록이 Git에 그대로 남습니다.

`npm install`을 했다면 이미 설치돼 있습니다. 명령은 앞에 `npx`를 붙여 `npx backlog …`로 씁니다.

```bash
npx backlog task list --plain   # 작업 목록을 터미널에 보여 준다
npm run board                   # 작업 보드를 브라우저로 연다 (멈출 때 Ctrl + C)
```

작업 보드는 `할 일 / 진행 중 / 완료` 세 칸으로 된 화면(<http://localhost:6420>)입니다. 메뉴는 영어지만 이슈와 칸 이름은 한국어입니다. 예시로 스토리 다섯이 들어 있습니다. `TASK-1`(부가세 계산기)은 이슈가 어떻게 생겼는지 보는 용도이고, `TASK-5`(매입 증빙 장부의 거래처별 합계)는 2일차 하루 실습입니다(와이어프레임 → 구현 → QA). `TASK-2`~`TASK-4`(공제 표시·월 선택·CSV 내려받기)는 여러 agent를 나란히 돌리는 강사 시연과 과정 뒤 과제용입니다. 시연 순서는 [`docs/orca-demo.md`](docs/orca-demo.md)에 있습니다.

이슈에는 두 가지 확인 목록이 붙습니다.

- **인수 조건(Acceptance Criteria)** — 이 작업이 끝났다고 판단하는 기준. 작업마다 다르게 씁니다.
- **완료 기준(Definition of Done)** — 모든 작업에 공통으로 붙는 목록: 화면에서 직접 확인했다 / 개인정보·비밀값이 없다 / 사람이 검토했다.

**agent에게 작업 나누기 시키기**

> 이 스토리를 작업 3~5개로 나눠 줘. 스토리는 `[스토리]` 이슈로, 작업은 그 아래에 인수 조건과 함께 `npx backlog task create`로 만들어. 만들기 전에 제목과 인수 조건을 먼저 보여 주고 내 확인을 받아.

**작업 하나 맡기기** — 작업 번호 하나만 말합니다. agent는 구현 계획을 먼저 이슈에 적고 기다립니다. 계획을 읽고 괜찮으면 "진행해"라고 답합니다.

> TASK-1.1만 진행해 줘. 먼저 구현 계획을 이슈에 적고 나한테 보여 줘. 끝나면 변경한 파일, 실행한 테스트와 결과, 남은 위험을 이슈의 최종 요약에 남겨 줘. commit은 내가 확인한 뒤에 해.

사람이 확인하는 자리는 세 번입니다. ① 이슈의 내용과 인수 조건 ② agent가 적은 구현 계획 ③ 바뀐 코드와 화면. 결과를 확인한 뒤 이슈를 `완료` 칸으로 옮깁니다(보드에서 끌어 놓거나 agent에게 시킵니다).

## 5. 실제 주소로 배포하기

배포 전에 반드시 사람이 확인합니다. 점검 항목은 [`docs/qa-deploy-checklist.md`](docs/qa-deploy-checklist.md)에 있습니다. 개인정보를 받는 도구는 이 방법으로 배포하지 않습니다.

```bash
npx wrangler login   # 처음 한 번. 브라우저에서 Cloudflare 로그인과 권한 승인을 내가 직접 한다
npm run deploy       # Cloudflare에 올린다
```

끝나면 `https://<도구 이름>.<내 계정 이름>.workers.dev` 꼴의 주소가 나옵니다. 휴대폰으로 열어 3단계와 같은 결과가 나오는지 확인합니다. 주소 앞부분은 `wrangler.toml`의 `name`이고, 내 도구 이름으로 바꿔도 됩니다.

## 파일 지도

| 파일 | 하는 일 |
|---|---|
| `public/index.html` | 화면 한 장 |
| `src/index.js` | 주소를 받아 알맞은 계산으로 넘긴다 |
| `src/vat.js` | 부가세 계산 (예시) |
| `test/vat.test.js` | 계산 테스트: 정상·경계·예외 사례 |
| `wrangler.toml` | Cloudflare 배포 설정 |
| `AGENTS.md`, `CLAUDE.md` | agent 작업 규칙 |
| `docs/first-dev-one-pager.md` | 첫 개발 한 장 서식 |
| `docs/wireframe.md` | 화면 기획(아스키 와이어프레임) 서식 |
| `docs/qa-deploy-checklist.md` | QA·배포 점검표 |
| `docs/day2-checkpoints.md` | 2일차 거래처별 합계의 브랜치(`day2-done`·`day2-qa-bug`) 가져오기·바꾸기, 자료 되돌리기 |
| `docs/orca-demo.md` | Orca로 이슈 여러 개를 나란히 돌리는 강사 시연과 과정 뒤 과제 순서(선행·병렬·상호 의존 스토리, QA 반복) |
| `backlog/` | 이슈(`tasks/`)와 작업 도구 설정(`config.yml`) |

## 지킬 것

- 실제 고객명, 사업자번호, 주민등록번호, 계좌는 넣지 않습니다. 가상 자료만 씁니다.
- 토큰과 비밀번호는 `.env` 또는 `.dev.vars` 파일에만 둡니다. 이 두 파일은 저장소에 올라가지 않게 막아 두었습니다.
- agent의 "다 됐습니다"를 그대로 믿지 않습니다. 테스트 결과와 바뀐 내용(`git diff`)을 직접 봅니다.
