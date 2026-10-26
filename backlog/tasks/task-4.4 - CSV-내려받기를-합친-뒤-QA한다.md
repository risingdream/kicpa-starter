---
id: TASK-4.4
title: CSV 내려받기를 합친 뒤 QA한다
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - QA
dependencies:
  - TASK-4.2
  - TASK-4.3
  - TASK-2.5
  - TASK-3.4
parent_task_id: TASK-4
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
백엔드(4.2)와 프론트(4.3)를 main에 합친 뒤, AGENTS.md의 'QA 이슈' 절차대로 실행한다. 스토리 2·3의 QA도 다시 한 번 돌려 이번 변경이 앞 기능을 망가뜨리지 않았는지 본다(회귀 QA).

하지 말 것: QA 중에 코드를 직접 고치기
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 정상: 2026-10, 가상 인쇄소를 불공제로 둔 상태에서 내려받으면 2건만 담긴다
- [ ] #2 엑셀에서 열어 한글 거래처 이름이 깨지지 않는다
- [ ] #3 회귀: 스토리 2·3의 QA 인수 조건이 모두 그대로 통과한다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
