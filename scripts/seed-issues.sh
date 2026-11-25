#!/usr/bin/env bash
# docs/issues/*.md를 이 저장소의 GitHub 이슈로 차례로 올린다(강사가 자기 시연 저장소에서 한 번 실행).
# 각 파일의 첫 줄("# 제목")이 이슈 제목, 나머지가 본문이다.
# 이슈·PR이 하나도 없는 저장소 기준으로 이슈 1(설계)·2(UI)·3(서버)·4(QA)가 #1~#4, 스토리가 #5가 되도록
# 1 → 2 → 3 → 4 → 0 순서로 올린다. 이미 이슈가 있으면 번호가 밀리니 올린 뒤 본문의 "이슈 N"과 맞는지 본다.
# 쓰는 법: 저장소 맨 위에서 `gh auth login`을 마친 뒤 `bash scripts/seed-issues.sh`
set -euo pipefail

cd "$(dirname "$0")/.."

gh label create "스토리" --color 5319e7 --description "사용자 이야기 하나" --force
gh label create "QA" --color 0e8a16 --description "기능을 만들지 않고 확인만 하는 이슈" --force
gh label create "버그" --color d73a4a --description "QA에서 실패한 인수 조건" --force

create() {
  local file="$1" label="${2:-}"
  local title body
  title="$(head -n 1 "$file" | sed 's/^# *//')"
  body="$(mktemp)"
  tail -n +2 "$file" | sed '1{/^$/d;}' > "$body"
  if [ -n "$label" ]; then
    gh issue create --title "$title" --body-file "$body" --label "$label"
  else
    gh issue create --title "$title" --body-file "$body"
  fi
  rm -f "$body"
}

create docs/issues/1-wireframe.md
create docs/issues/2-ui.md
create docs/issues/3-server.md
create docs/issues/4-qa.md QA
create docs/issues/0-story-vendor-totals.md 스토리
