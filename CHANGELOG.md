2026-07-12

index.html (민원 접수 페이지)
화면 표기 전면 한글화 (RECEIPT/ANALYSIS 등 → 접수/분석·배정/접수·대행/압박·공론화/해결)
압박 단계 전달 주기 명시: 접수 후 7일(법정기한) → 1차 지자체장 감사요청 → 5영업일 → 2차 의원실 연계 → 5영업일 → 3차 언론 제보
지역 입력 필드 추가: 시/도 + 시군구/동 (필수), "지역무관" 선택지 포함
기관 접수 여부 질문 문구 명확화("취재시작이 아닌 관공서 접수 여부") + 담당부서·접수일자 입력란 추가
내 민원 조회 방식 변경: 접수번호 → 연락처+4자리 비밀번호, 조회 시 해당 연락처의 전체 접수 건을 리스트로 표시(카테고리·AI 요약 포함)
Supabase 연동을 supabase-js 라이브러리 → 순수 fetch 방식으로 전환 (RLS 오류 해결)
제보 접수를 submit_report DB 함수 호출 방식으로 변경 (제보자+민원 정보 원자적 처리)
공익신고 관련 콘텐츠 전체 삭제


admin.html (관리자 페이지)
Supabase Auth 이메일 로그인 적용, 변수명 충돌 버그 수정
공개 폼과 세션 완전 격리 (관리자 로그인 상태가 민원인 요청에 영향 없도록)
민원 상세보기 추가: 사연 원본, AI 정리본, 카테고리, 지역, 기관 접수 상세정보
경과일 표시 및 7일 초과 SUBMISSION 건 자동 강조
파트너 배정 기능 (승인된 파트너를 사건에 배정)
파트너 활동 탭 (배정/승인/상태변경 전체 로그)
파트너 승인 탭에 배정 건수 및 배정 사건 목록 표시
정산 관리 탭: 사건별 결제금액/파트너지급액 입력, 플랫폼 수익 자동계산
동일 연락처 중복 접수 자동 감지 및 뱃지 표시
조회 비밀번호 확인/재설정 기능


partners.html (파트너 등록 페이지)
파트너 유형(행정사/기자) 선택 시 전문분야 선택 필드 추가(행정사만 노출)
배정 확인 페이지(partner-portal.html) 링크 추가


partner-portal.html (신규)
로그인 없이 연락처만으로 본인에게 배정된 사건을 확인할 수 있는 최소 페이지


privacy.html / terms.html (신규)
개인정보처리방침, 이용약관 페이지 신설 (실제 수집 항목 기준으로 작성)
사업자 정보는 준비 후 별도 반영 예정


데이터베이스 (Supabase)
reports: category, region_sido, region_detail, region_na, civil_receipt_date, gov_department, lookup_pin 컬럼 추가
partners: expertise_area 컬럼 추가
settlements, activity_log 테이블 신설
submit_report, lookup_report, get_partner_assignments RPC 함수 추가/수정
RLS 정책 전체 재정비 (anon insert / authenticated select·update)
Gemini API 연동 Edge Function(analyze-report) 배포, reports insert 시 자동 카테고리 분류·요약 생성
