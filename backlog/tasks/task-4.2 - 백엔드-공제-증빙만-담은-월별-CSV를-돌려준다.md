---
id: TASK-4.2
title: '[백엔드] 공제 증빙만 담은 월별 CSV를 돌려준다'
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 백엔드
dependencies:
  - TASK-4.1
  - TASK-3.2
parent_task_id: TASK-4
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/wireframes/csv.md의 약속대로 stack/api/main.py에 GET /api/receipts.csv를 만든다. 스토리 2의 deductible과 스토리 3의 month 거르기를 다시 쓰고 새로 만들지 않는다.

하지 말 것: 화면(stack/web) 수정, 기존 /api/receipts 응답 변경
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 month=2026-10이면 그 달 공제 증빙만 약속한 열 순서로 담긴다
- [ ] #2 엑셀에서 한글이 깨지지 않는다(UTF-8 BOM)
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
