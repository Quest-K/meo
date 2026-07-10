// ===== Supabase 클라이언트 공유 초기화 =====
// publishable(anon) key만 사용 — 브라우저에 노출되어도 안전한 키입니다.
// service_role 키는 절대 프론트엔드 코드에 넣지 마세요.

const SUPABASE_URL = "https://kpooxiwiqkcizhtdleor.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwb294aXdpcWtjaXpodGRsZW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MjA2MTEsImV4cCI6MjA5OTE5NjYxMX0.4aBRHVw2OK9mfX78zbfSyxqKRcYnvejCGH22MyrVTA8";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});
