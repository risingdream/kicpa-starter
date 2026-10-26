---
id: TASK-2.2
title: DB의 증빙 표에 불공제 여부 칸을 추가한다
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 백엔드
dependencies:
  - TASK-2.1
parent_task_id: TASK-2
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
stack/db/init.sql의 receipts 표에 deductible(공제 여부, 기본값 참) 칸을 추가한다. 이미 만든 DB에 적용할 ALTER TABLE 한 줄도 stack/db/README 또는 이슈 메모에 남긴다.

하지 말 것: API·화면 수정, 기존 예시 자료 삭제
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 새로 만든 DB의 receipts 표에 deductible 칸이 있고 기존 예시 3건은 공제(참)다
- [ ] #2 이미 있는 DB에 적용하는 ALTER TABLE 명령이 적혀 있다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
