// ===== 관리자 페이지 전용 Supabase 클라이언트 =====
// admin.html에서만 사용 — 로그인 세션을 유지해야 하므로
// 공개 폼용 supabase-client.js와 분리했습니다.

const SUPABASE_URL = "https://kpooxiwiqkcizhtdleor.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwb294aXdpcWtjaXpodGRsZW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MjA2MTEsImV4cCI6MjA5OTE5NjYxMX0.4aBRHVw2OK9mfX78zbfSyxqKRcYnvejCGH22MyrVTA8";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
