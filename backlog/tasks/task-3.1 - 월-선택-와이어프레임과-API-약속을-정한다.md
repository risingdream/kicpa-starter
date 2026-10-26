---
id: TASK-3.1
title: 월 선택 와이어프레임과 API 약속을 정한다
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 와이어프레임
dependencies: []
parent_task_id: TASK-3
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/wireframes/month.md에 월 선택 위치와 네 상태를 그린다. 같은 파일에 API 약속을 적는다: GET /api/receipts?month=YYYY-MM, 응답 모양은 지금과 같고 그 달 증빙과 그 달 합계만 담는다. month가 없으면 전체, 형식이 틀리면 422.

이 카드가 백엔드(3.2)와 프론트(3.3)가 함께 따르는 약속이다. 합친 뒤에는 둘 다 이 약속을 바꾸지 않는다.

하지 말 것: 코드(stack/) 수정
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/wireframes/month.md에 화면 배치·네 상태·API 약속(요청·응답·오류)이 있다
- [ ] #2 사용자가 약속을 확인했다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
