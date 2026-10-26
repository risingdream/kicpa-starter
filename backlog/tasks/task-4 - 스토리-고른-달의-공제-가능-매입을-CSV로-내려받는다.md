---
id: TASK-4
title: '[스토리] 고른 달의 공제 가능 매입을 CSV로 내려받는다'
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 스토리
dependencies: []
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
나는 회계사로서 마감한 달의 공제 가능 매입만 CSV(엑셀에서 열리는 표 파일)로 받아 장부와 맞춰 보고 싶다. 끝나면 2026-10을 고르고 내려받은 파일을 엑셀에서 열어 공제 증빙만 들어 있는지로 확인한다.

진행 방식: 상호 의존형. 스토리 2(공제 여부)와 스토리 3(월 선택)이 모두 main에 합쳐져야 만들 수 있다. 백엔드와 프론트는 CSV 열 약속을 정한 뒤 동시에 만든다.

하지 말 것: 엑셀(xlsx) 파일, 여러 달 한꺼번에 내려받기
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 2026-10을 고르고 내려받으면 그 달 공제 증빙만 담긴 CSV가 엑셀에서 한글이 깨지지 않고 열린다
<!-- AC:END -->
