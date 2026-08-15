/* ── 결제 흐름 (현재 시뮬레이션 상태) ──
   다음 단계(포트원 연동)에서는 이 파일 안의 confirmPayment()만 수정하면 됩니다.
   가격 문구(1,900원/3,900원 → 1,800원 단일)도 이 파일 + index.html의 price-row만 바꾸면 됩니다.
*/
let selectedPlan = 'basic'; // 'basic' | 'plus'
let selectedPayMethod = 'card';

function selectPlan(plan){
  selectedPlan = plan;
  document.getElementById('price-basic').classList.toggle('selected', plan==='basic');
  document.getElementById('price-plus').classList.toggle('selected', plan==='plus');
}
selectPlan('basic');

function openPayModal(){
  const krw = selectedPlan === 'basic' ? '1,900원' : '3,900원';
  const usdt = selectedPlan === 'basic' ? '1.9 USDT' : '3.9 USDT';
  document.getElementById('pay-modal-plan').textContent =
    (selectedPlan === 'basic' ? '프리미엄' : '프리미엄 플러스') + ' 리포트';
  document.getElementById('pay-amount-krw').textContent = krw;
  document.getElementById('pay-amount-usdt').textContent = usdt;
  selectPayMethod('card');
  const modal = document.getElementById('pay-modal');
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}
function closePayModal(){
  const modal = document.getElementById('pay-modal');
  modal.classList.add('hidden');
  modal.style.display = 'none';
}
function selectPayMethod(m){
  selectedPayMethod = m;
  document.getElementById('pay-card').classList.toggle('selected', m==='card');
  document.getElementById('pay-usdt').classList.toggle('selected', m==='usdt');
}

function confirmPayment(){
  // ⚙️ 실제 연동 지점 (포트원/아임포트로 교체 예정):
  // - card: IMP.request_pay({...}) 호출 → 결제 성공 콜백에서 아래 unlockPremium() 호출
  // - usdt: 별도 암호화폐 게이트웨이(CoinGate/NOWPayments 등) 주문 생성 → 입금 컨펌 webhook 수신 후 unlockPremium() 호출
  closePayModal();
  unlockPremium();
}

function unlockPremium(){
  document.getElementById('upsell-section').classList.add('hidden');
  document.getElementById('premium-section').classList.remove('hidden');
  document.getElementById('plus-only-section').classList.toggle('hidden', selectedPlan !== 'plus');
  animatePatternBars(); // quiz.js
  if(selectedPlan === 'plus'){
    renderMsgTemplate(); // report.js
  }
}
