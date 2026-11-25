---
id: TASK-3.1
title: 월 선택 와이어프레임과 API 약속을 정한다
status: 완료
assignee: []
created_date: '2026-10-26 10:51'
updated_date: '2026-11-25 10:32'
labels:
  - 와이어프레임
dependencies: []
parent_task_id: TASK-3
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/wireframes/month.md에 월 선택 위치와 상태를 그리고, 같은 파일에 API 약속을 적는다.

- 화면: 장부 위에 월 선택(input type=month)과 '전체 보기'. 처음 열면 '전체'다. 고른 달이 바뀌면 증빙 목록과 거래처별 합계가 함께 그 달 것으로 바뀐다. 그 달 증빙이 없으면 '이 달 증빙이 없습니다'.
- API: GET /api/receipts?month=YYYY-MM와 GET /api/receipts/by-vendor?month=YYYY-MM. month가 없으면 전체, 있으면 그 달 1일 이상~다음 달 1일 미만. 형식이 틀리면(예: 2026-13) 422. 응답 모양은 month가 없을 때와 같다.

이 이슈가 서버(3.2)와 화면(3.3)이 함께 따르는 약속이다. 두 워커가 동시에 일하므로 약속을 바꿔야 하면 코드를 고치기 전에 사용자에게 묻는다.

하지 말 것: 코드(stack/) 수정
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/wireframes/month.md에 화면 배치·상태(정상·빈 달·전체)·API 약속(두 주소의 요청·응답·오류)이 있다
- [ ] #2 사용자가 약속을 확인했다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
