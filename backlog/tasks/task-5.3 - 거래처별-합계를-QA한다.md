---
id: TASK-5.3
title: 거래처별 합계를 QA한다
status: 할 일
assignee: []
created_date: '2026-10-26 14:09'
labels:
  - QA
dependencies:
  - TASK-5.2
parent_task_id: TASK-5
ordinal: 23000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
2일차 B3. 5.2 결과(또는 버그를 심은 연습용 브랜치 day2-qa-bug)를 AGENTS.md의 'QA 이슈' 절차대로 확인한다. 깨끗한 스택(증빙 3건)에서 시작하고, 인수 조건 한 줄이 QA 표 한 줄이다. 2번(빈 상태)을 본 뒤 3번 전에 자료를 증빙 3건으로 되돌린다(docs/day2-checkpoints.md).

실패한 줄은 [버그] 이슈에 재현 순서·기대값·실제값을 적는다. 고치기를 요청하고 실패한 줄 하나를 다시 확인한다. 고치지 못해도 기록이 남았으면 이 이슈의 실습은 통과다.

하지 말 것: QA 중에 코드를 직접 고치기, 실패한 줄을 새로고침으로 넘기기
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 정상: 증빙 3건에서 가상 문구점 158,000원/15,800원, 가상 인쇄소 450,000원/45,000원이 보인다
- [ ] #2 빈 상태: 증빙이 없으면 '표시할 거래가 없습니다'가 보인다
- [ ] #3 추가 후 반영: 가상 문구점 10,000원을 추가하면 새로고침하지 않아도 가상 문구점이 168,000원/16,800원으로 바뀐다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
