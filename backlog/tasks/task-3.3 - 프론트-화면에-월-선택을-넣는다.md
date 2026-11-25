---
id: TASK-3.3
title: '[프론트] 화면에 월 선택을 넣는다'
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
updated_date: '2026-11-25 12:01'
labels:
  - 프론트
dependencies:
  - TASK-3.1
  - TASK-3.2
parent_task_id: TASK-3
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/wireframes/month.md의 배치대로 stack/web/src/App.jsx에 월 선택(input type=month)을 넣고, 고른 달을 ?month=로 붙여 목록을 다시 부른다. 3.2가 끝난 뒤에 한다. month로 거르는 API(3.2)에 붙여 화면에서 직접 확인한다.

하지 말 것: API(stack/api) 수정, 화면에서 날짜로 직접 거르기
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 달을 바꾸면 /api/receipts?month=YYYY-MM을 부른다
- [ ] #2 '전체 보기'로 month 없이 다시 부를 수 있다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
