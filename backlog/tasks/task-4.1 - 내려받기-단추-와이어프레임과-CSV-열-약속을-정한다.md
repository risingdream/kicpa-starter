---
id: TASK-4.1
title: 내려받기 단추 와이어프레임과 CSV 열 약속을 정한다
status: 할 일
assignee: []
created_date: '2026-10-26 10:51'
labels:
  - 와이어프레임
dependencies:
  - TASK-2.3
  - TASK-3.1
parent_task_id: TASK-4
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
docs/wireframes/csv.md에 내려받기 단추 위치를 그리고, CSV 약속을 적는다: GET /api/receipts.csv?month=YYYY-MM, 열 순서 날짜·거래처·공급가액·부가세, 공제 증빙만, 엑셀용 UTF-8 BOM, 파일 이름 receipts-YYYY-MM.csv.

공제 여부는 스토리 2의 API(2.3), month는 스토리 3의 약속(3.1)을 그대로 쓴다.

하지 말 것: 코드(stack/) 수정
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/wireframes/csv.md에 단추 위치와 CSV 약속(주소·열·인코딩·파일 이름)이 있다
- [ ] #2 사용자가 약속을 확인했다
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 화면에서 직접 확인했다
- [ ] #2 개인정보·비밀값이 없다
- [ ] #3 사람이 검토했다
<!-- DOD:END -->
