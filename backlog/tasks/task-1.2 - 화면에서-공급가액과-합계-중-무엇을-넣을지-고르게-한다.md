---
id: TASK-1.2
title: 화면에서 공급가액과 합계 중 무엇을 넣을지 고르게 한다
status: 할 일
assignee: []
created_date: '2026-10-20 04:32'
labels: []
dependencies:
  - TASK-1.1
parent_task_id: TASK-1
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
계산 화면에 '공급가액으로 계산 / 합계로 계산' 선택을 추가하고, 합계를 고르면 앞 작업의 계산을 쓴다.

하지 말 것: 계산 방식(src/vat.js)은 고치지 않는다
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 '합계로 계산'을 고르고 110,000을 넣으면 공급가액 100,000원, 부가세 10,000원이 보인다
- [ ] #2 '공급가액으로 계산'은 지금처럼 동작한다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
