---
id: TASK-2.5
title: 불공제 표시를 QA한다
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - QA
dependencies:
  - TASK-2.4
parent_task_id: TASK-2
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
AGENTS.md의 'QA 카드' 절차대로 아래 인수 조건을 표처럼 하나씩 실행한다. 실패한 줄마다 [버그] 카드를 만들고, 고친 뒤 처음부터 다시 돈다.

하지 말 것: QA 중에 코드를 직접 고치기(고치는 일은 [버그] 카드로)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 정상: 예시 3건이 모두 공제로 보이고 공제 가능 부가세가 전체 부가세와 같다
- [ ] #2 정상: 가상 인쇄소(450,000원)를 불공제로 바꾸면 공제 가능 부가세가 45,000원 줄어든다
- [ ] #3 경계: 모든 증빙을 불공제로 바꾸면 공제 가능 부가세가 0원이다
- [ ] #4 새로 고쳐도(F5) 공제 여부가 그대로 남아 있다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
