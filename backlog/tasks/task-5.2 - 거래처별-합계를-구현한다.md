---
id: TASK-5.2
title: 거래처별 합계를 구현한다
status: 할 일
assignee: []
created_date: '2026-10-26 14:09'
updated_date: '2026-10-26 14:09'
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
2일차 B2. 5.1 와이어프레임대로 stack/의 API와 화면을 함께 고친다. API는 GET /api/receipts/by-vendor(거래처마다 공급가액 합계와 부가세 합계)로 하고, 화면은 장부 목록 아래에 표를 붙인다. 증빙이 하나도 없으면 표 대신 '표시할 거래가 없습니다'를 보인다.

계획 검토 때 사람이 정할 것: 거래처의 부가세 합계를 공급가액 합계의 10%로 낼지, 건별 부가세를 더해 낼지. 장부 목록의 부가세 칸은 증빙 한 건마다 원 미만을 버린 값이다.

2:00까지 끝나지 않으면 완성본 브랜치 day2-done으로 바꾼다(docs/day2-checkpoints.md).

하지 말 것: DB 표 구조(stack/db/init.sql) 수정, 기존 GET /api/receipts 응답 변경, 거래처 편집·삭제 기능
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 가상 증빙 3건에서 표가 가상 문구점 158,000원/15,800원, 가상 인쇄소 450,000원/45,000원으로 손계산과 같다
- [ ] #2 증빙이 없으면 '표시할 거래가 없습니다'가 보인다
- [ ] #3 계획 검토 때 정한 부가세 합계 기준을 테스트가 확인하고, npm test가 통과한다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
