---
id: TASK-3.4
title: 월 선택을 합친 뒤 QA한다
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - QA
dependencies:
  - TASK-3.2
  - TASK-3.3
parent_task_id: TASK-3
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
백엔드(3.2)와 프론트(3.3)를 main에 합친 뒤, AGENTS.md의 'QA 이슈' 절차대로 아래 인수 조건을 하나씩 실행한다. 실패한 줄마다 [버그] 이슈를 만들고, 고친 뒤 처음부터 다시 돈다.

하지 말 것: QA 중에 코드를 직접 고치기
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 정상: 2026-10을 고르면 3건, 공급가액 합계 608,000원이 보인다
- [ ] #2 빈 상태: 증빙이 없는 달을 고르면 '이 달 증빙이 없습니다'가 보인다
- [ ] #3 전체 보기를 누르면 모든 증빙이 다시 보인다
- [ ] #4 그 달에 증빙을 추가하면 목록과 합계에 바로 반영된다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
