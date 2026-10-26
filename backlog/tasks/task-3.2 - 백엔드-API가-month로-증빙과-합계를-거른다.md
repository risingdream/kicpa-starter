---
id: TASK-3.2
title: '[백엔드] API가 month로 증빙과 합계를 거른다'
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 백엔드
dependencies:
  - TASK-3.1
parent_task_id: TASK-3
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/wireframes/month.md의 API 약속대로 stack/api/main.py의 GET /api/receipts에 month를 더한다. 프론트 이슈와 동시에 진행하므로 약속을 바꿔야 하면 코드를 고치기 전에 사용자에게 묻는다.

하지 말 것: 화면(stack/web) 수정, 약속에 없는 응답 필드 추가
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 month=2026-10이면 10월 증빙과 그 달 합계만 돌려준다
- [ ] #2 month가 없으면 지금처럼 전체, 2026-13처럼 틀리면 422를 돌려준다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
