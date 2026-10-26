---
id: TASK-5
title: '[스토리] 거래처별 합계를 본다'
status: 할 일
assignee: []
created_date: '2026-10-26 14:09'
labels:
  - 스토리
dependencies: []
ordinal: 20000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
나는 회계사로서 매입 증빙 장부에서 거래처마다 공급가액과 부가세를 얼마나 썼는지 한눈에 보고 싶다. 끝나면 가상 증빙 3건(가상 문구점 120,000원·38,000원, 가상 인쇄소 450,000원)으로 장부 아래 표가 손계산(가상 문구점 158,000원/15,800원, 가상 인쇄소 450,000원/45,000원)과 같은지로 확인한다.

2일차 하루 예제다. 5.1 화면 기획(B1) → 5.2 구현(B2) → 5.3 QA(B3) 순서로 한 장부를 이어서 고친다. B4에서는 5.3의 확인 절차를 스킬로 남긴다. 완성본과 버그 심은 버전은 브랜치 day2-done, day2-qa-bug에 있다(docs/day2-checkpoints.md).

하지 말 것: 기간·월별 합계, 거래처 편집·삭제, 그래프, 증빙 3건 밖의 실제 자료
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 장부 목록 아래 거래처별 합계 표가 손계산과 같다
<!-- AC:END -->
