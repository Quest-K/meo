// ===== Supabase 클라이언트 공유 초기화 =====
// publishable(anon) key만 사용 — 브라우저에 노출되어도 안전한 키입니다.
// service_role 키는 절대 프론트엔드 코드에 넣지 마세요.

const SUPABASE_URL = "https://kpooxiwiqkcizhtdleor.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NOHbGEe8ydTi2seNRLWlvQ_XVmDhaFP";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
