---
id: TASK-5.1
title: 거래처별 합계 화면의 와이어프레임을 그린다
status: 완료
assignee: []
created_date: '2026-10-26 14:09'
updated_date: '2026-11-25 10:16'
labels:
  - 와이어프레임
dependencies: []
parent_task_id: TASK-5
ordinal: 21000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
1일차 3강. 무엇을 보여 줄지 사람이 먼저 정한다. 코드는 아직 고치지 않는다.

docs/wireframe.md 서식을 거래처별 합계 화면으로 고쳐 쓴다. 장부 목록 아래에 거래처 / 건수 / 공급가액 합계 / 부가세 합계 네 칸짜리 표를 두고, 맨 아래에 전체 합계 행을 둔다. 정상과 빈 상태 둘을 텍스트 기호로 그린다(로딩·오류는 숙제). 사람이 와이어프레임을 확인하면 5.2로 넘어간다.

강의 시간 안에 끝나지 않으면 완성본 브랜치 v2/d1-design-done으로 바꾼다(docs/checkpoints.md).

하지 말 것: 코드 수정(stack/, src/, public/), 다른 화면 기획
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 docs/wireframe.md에 장부 목록 아래 거래처별 합계 표(거래처·건수·공급가액 합계·부가세 합계)와 맨 아래 전체 합계 행이 텍스트 기호로 그려져 있다
- [x] #2 정상 상태(가상 증빙 3건: 가상 문구점 2건·158,000원·15,800원, 가상 인쇄소 1건·450,000원·45,000원, 전체 3건·608,000원·60,800원)와 빈 상태('표시할 거래가 없습니다')가 함께 그려져 있다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 개인정보·비밀값이 없다
- [ ] #2 사람이 검토했다
<!-- DOD:END -->
