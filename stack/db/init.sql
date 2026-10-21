-- DB를 처음 만들 때 한 번만 실행된다. 이미 만든 DB에는 다시 실행되지 않는다.
-- 모두 교육용 가상 자료다.
CREATE TABLE receipts (
  id          SERIAL PRIMARY KEY,
  issued_on   DATE        NOT NULL,
  vendor      TEXT        NOT NULL,
  supply      BIGINT      NOT NULL CHECK (supply >= 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO receipts (issued_on, vendor, supply) VALUES
  ('2026-10-01', '가상 문구점', 120000),
  ('2026-10-07', '가상 인쇄소', 450000),
  ('2026-10-15', '가상 문구점', 38000);
