---
id: TASK-5.1
title: 거래처별 합계 화면의 와이어프레임을 그린다
status: 할 일
assignee: []
created_date: '2026-10-26 14:09'
labels:
  - 와이어프레임
dependencies: []
parent_task_id: TASK-5
ordinal: 21000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
2일차 B1. 구현 전에 화면에 무엇을 보여 줄지 사람이 정한다. docs/wireframe.md 서식을 거래처별 합계 화면으로 고쳐 쓴다: 지금 장부(stack/web) 목록 아래에 거래처·공급가액 합계·부가세 합계 세 칸짜리 표를 두고, 위 목록과 아래 합계가 어떻게 맞는지 적는다. 상태는 정상과 빈 상태 둘만 그린다(로딩·오류는 숙제).

하지 말 것: 코드(stack/) 수정, 다른 화면 기획, 색·글꼴 지정
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/wireframe.md에 장부 목록 아래 거래처별 합계 표(거래처·공급가액 합계·부가세 합계)가 텍스트 기호로 그려져 있다
- [ ] #2 정상 상태(가상 문구점 158,000원/15,800원, 가상 인쇄소 450,000원/45,000원)와 빈 상태('표시할 거래가 없습니다')가 적혀 있다
- [ ] #3 옆 사람 또는 강사가 와이어프레임을 확인했다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
