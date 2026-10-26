---
id: TASK-2
title: '[스토리] 공제받지 못할 매입을 따로 표시한다'
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 스토리
dependencies: []
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
나는 회계사로서 매입 증빙마다 매입세액 공제를 받을 수 있는지 표시하고, 공제 가능한 부가세 합계를 따로 보고 싶다. 끝나면 증빙 하나를 불공제로 표시했을 때 공제 가능 부가세 합계에서 그 금액이 빠지는지로 확인한다.

진행 방식: 선행형. DB → API → 화면 순서로 한 층씩 쌓는다. 앞 카드가 끝나야 다음 카드를 시작한다.

하지 말 것: 불공제 사유를 법령별로 나누기, 신고서 작성, 실제 고객 자료 사용
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 증빙 하나를 불공제로 바꾸면 공제 가능 부가세 합계가 그 증빙의 부가세만큼 줄어든다
<!-- AC:END -->
