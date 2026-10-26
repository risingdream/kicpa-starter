---
id: TASK-4.3
title: '[프론트] 화면에 CSV 내려받기 단추를 넣는다'
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 프론트
dependencies:
  - TASK-4.1
  - TASK-2.4
  - TASK-3.3
parent_task_id: TASK-4
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/wireframes/csv.md의 위치에 'CSV 내려받기' 단추를 넣는다. 고른 달이 있을 때만 누를 수 있고, /api/receipts.csv?month=를 연다. 백엔드 이슈와 동시에 진행한다.

하지 말 것: API(stack/api) 수정, 화면에서 CSV를 직접 만들기
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 달을 고르지 않으면 단추가 꺼져 있다
- [ ] #2 달을 고르고 누르면 receipts-YYYY-MM.csv를 내려받는다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
