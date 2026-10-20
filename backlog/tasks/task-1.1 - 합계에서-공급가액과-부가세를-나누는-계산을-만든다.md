---
id: TASK-1.1
title: 합계에서 공급가액과 부가세를 나누는 계산을 만든다
status: 할 일
assignee: []
created_date: '2026-10-20 04:32'
labels: []
dependencies: []
parent_task_id: TASK-1
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
src/vat.js에 합계를 받아 공급가액과 부가세로 나누는 계산을 추가한다. 1원 단위 끝수 처리 방식은 계획 단계에서 사람에게 묻는다.

하지 말 것: 화면(public/)은 고치지 않는다
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 합계 110,000원이면 공급가액 100,000원, 부가세 10,000원이다
- [ ] #2 정상·경계(0원)·예외(음수, 숫자가 아님) 테스트가 있고 npm test가 통과한다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
