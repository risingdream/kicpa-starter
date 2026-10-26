---
id: TASK-2.4
title: 화면에 공제 여부 체크와 공제 가능 부가세 합계를 보인다
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 프론트
dependencies:
  - TASK-2.3
parent_task_id: TASK-2
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
stack/web/src/App.jsx의 목록 표에 '공제' 체크 칸을 넣고, 체크를 바꾸면 PATCH를 부른다. 합계 줄 아래에 '공제 가능 부가세'를 보인다. 와이어프레임(docs/wireframes/deductible.md) 배치를 따른다.

하지 말 것: API(stack/api) 수정
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 체크를 끄면 새로 고치지 않아도 공제 가능 부가세가 바로 줄어든다
- [ ] #2 와이어프레임과 배치가 같다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
