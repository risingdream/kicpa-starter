---
id: TASK-2.3
title: API가 불공제 여부를 주고받고 공제 가능 부가세 합계를 돌려준다
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 백엔드
dependencies:
  - TASK-2.2
parent_task_id: TASK-2
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
stack/api/main.py에서 증빙을 추가할 때 deductible을 받고, 목록 응답의 각 증빙에 deductible을, 전체에 deductible_vat(공제 가능 부가세 합계)를 더한다. 증빙의 공제 여부를 바꾸는 PATCH /api/receipts/{id}를 만든다.

하지 말 것: 화면(stack/web) 수정, 기존 응답 필드 이름 변경
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 GET /api/receipts 응답에 deductible과 deductible_vat가 있다
- [ ] #2 PATCH로 불공제로 바꾸면 deductible_vat가 그 증빙의 부가세만큼 줄어든다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
