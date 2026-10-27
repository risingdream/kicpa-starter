---
id: TASK-5.2
title: 거래처별 합계 계산을 서버로 옮긴다
status: 완료
assignee: []
created_date: '2026-10-26 14:09'
updated_date: '2026-10-26 23:57'
labels:
  - 백엔드
  - 프론트
dependencies:
  - TASK-5.1
parent_task_id: TASK-5
ordinal: 22000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
2일차 B2. B1에서는 화면이 증빙 목록을 받아 거래처별 합계를 직접 더했다. 이 계산을 서버가 맡게 옮긴다. 금액 규칙은 서버 한곳에서 지켜야 화면이 여럿이 되어도 숫자가 같다. API는 GET /api/receipts/by-vendor(거래처마다 공급가액 합계와 부가세 합계)로 하고, 화면 표는 이 주소가 준 값을 그대로 보인다. 증빙이 하나도 없으면 표 대신 '표시할 거래가 없습니다'를 보인다.

계획 검토 때 사람이 정할 것: 화면이 지금 거래처의 부가세 합계를 어느 기준으로 더하는지 보고, 서버로 옮길 때 어느 기준으로 할지 정한다(공급가액 합계의 10%인가, 건별 부가세의 합인가). 장부 목록의 부가세 칸은 증빙 한 건마다 원 미만을 버린 값이다.

2:00까지 끝나지 않으면 B2 완성본 브랜치 day2-done으로 바꾼다(docs/day2-checkpoints.md).

하지 말 것: DB 표 구조(stack/db/init.sql) 수정, 기존 GET /api/receipts 응답 변경, B1에서 만든 표 모양 바꾸기, 거래처 편집·삭제 기능
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 화면 표가 GET /api/receipts/by-vendor 값을 보이고, 가상 증빙 3건에서 가상 문구점 158,000원/15,800원, 가상 인쇄소 450,000원/45,000원이다
- [ ] #2 증빙이 없으면 '표시할 거래가 없습니다'가 보인다
- [ ] #3 계획 검토 때 정한 부가세 합계 기준을 테스트가 확인하고, npm test가 통과한다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
