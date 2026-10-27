---
id: TASK-5.1
title: 거래처별 합계 표를 와이어프레임부터 화면까지 만든다
status: 완료
assignee: []
created_date: '2026-10-26 14:09'
updated_date: '2026-10-26 23:57'
labels:
  - 와이어프레임
  - 프론트
dependencies: []
parent_task_id: TASK-5
ordinal: 21000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
2일차 B1. 무엇을 보여 줄지 사람이 먼저 정하고, 그대로 화면을 만든다.

1. 와이어프레임: docs/wireframe.md 서식을 거래처별 합계 화면으로 고쳐 쓴다. 장부 목록 아래에 거래처·공급가액 합계·부가세 합계 세 칸짜리 표를 두고, 정상과 빈 상태 둘을 그린다(로딩·오류는 숙제).
2. 화면: 사람이 와이어프레임을 확인하면 stack/web에 디자인시스템(Tailwind CSS와 shadcn/ui)을 깔고, 와이어프레임대로 표를 붙인다. 합계는 지금 있는 증빙 목록 API(GET /api/receipts)로 화면에서 더한다. 다 깔면 AGENTS.md에 새 화면은 그 부품과 색만 쓴다는 규칙을 적는다.
3. 확인: 브라우저로 화면을 열어 표와 빈 상태가 와이어프레임대로인지 본다.

Tailwind CSS·shadcn/ui가 쓰는 패키지는 stack/web/package.json에 미리 넣어 두었다(설정과 부품은 아직 없다). 1:15까지 끝나지 않으면 B1 완성본 브랜치 day2-b1-done으로 바꾼다(docs/day2-checkpoints.md).

하지 말 것: 서버(stack/api)·DB(stack/db) 수정, 다른 화면 기획
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/wireframe.md에 장부 목록 아래 거래처별 합계 표(거래처·공급가액 합계·부가세 합계)와 정상·빈 상태가 텍스트 기호로 그려져 있다
- [ ] #2 화면의 거래처별 합계 표가 가상 증빙 3건에서 가상 문구점 158,000원/15,800원, 가상 인쇄소 450,000원/45,000원이고, 증빙이 없으면 '표시할 거래가 없습니다'가 보인다
- [ ] #3 표가 shadcn/ui 표 부품과 Tailwind 테마 색으로 그려지고, AGENTS.md에 새 화면은 그 부품과 색만 쓴다는 규칙이 있다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
