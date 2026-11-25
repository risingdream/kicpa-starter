---
id: TASK-3.2
title: '[백엔드] API가 month로 증빙과 거래처별 합계를 거른다'
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
updated_date: '2026-11-25 10:31'
labels:
  - 백엔드
dependencies:
  - TASK-3.1
parent_task_id: TASK-3
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/wireframes/month.md의 API 약속대로 stack/api에서 GET /api/receipts와 GET /api/receipts/by-vendor에 month를 더한다. 달의 범위(그 달 1일 이상~다음 달 1일 미만, 12월이면 다음 해 1월 1일 미만)는 DB 없이 도는 함수로 두고 unittest로 확인한다. 화면 이슈와 동시에 진행하므로 약속을 바꿔야 하면 코드를 고치기 전에 사용자에게 묻는다.

하지 말 것: 화면(stack/web) 수정, 약속에 없는 응답 필드 추가, DB 표 구조 수정
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 month=2026-10이면 두 주소 모두 10월 증빙 3건(608,000원/60,800원)만 담는다
- [ ] #2 month가 없으면 전체 4건, 2026-12면 빈 목록과 0원, 2026-13처럼 틀리면 422를 돌려준다
- [ ] #3 달 범위 테스트(12월 → 다음 해 1월 포함)가 통과한다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
