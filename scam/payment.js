/* ── 결제 흐름 (포트원 V1 테스트 연동) ──
   단일 상품(1회성 리포트), 결제 수단에 따라 가격이 다릅니다.
   지금은 포트원 콘솔의 "테스트" 채널(KG이니시스 INIpayTest)에 연결된 상태입니다.
   실제 사업자등록 후에는 콘솔에서 "실연동"으로 전환하면 되고, 이 코드는 그대로 둬도 됩니다.
*/
// 결제 수단별 가격: 카드는 PG 수수료가 있어 상대적으로 높게, 계좌이체는 낮게
const PRICE_BY_METHOD = { card: 1900, transfer: 1800 };
// 포트원 pay_method 값 매핑 (무통장입금(vbank)은 웹훅 없이는 확정이 안 되므로 제외)
const PAY_METHOD_CODE = { card: 'card', transfer: 'trans' };

let selectedPayMethod = 'card';

// 포트원 콘솔의 "고객사 식별코드"
IMP.init('imp32873203');

function openPayModal(){
  document.getElementById('pay-modal-plan').textContent = '프리미엄 리포트';
  document.getElementById('pay-amount-card').textContent = PRICE_BY_METHOD.card.toLocaleString() + '원';
  document.getElementById('pay-amount-transfer').textContent = PRICE_BY_METHOD.transfer.toLocaleString() + '원';
  selectPayMethod('card');
  const modal = document.getElementById('pay-modal');
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function selectPayMethod(m){
  selectedPayMethod = m;
  document.getElementById('pay-card').classList.toggle('selected', m==='card');
  document.getElementById('pay-transfer').classList.toggle('selected', m==='transfer');
}

function closePayModal(){
  const modal = document.getElementById('pay-modal');
  modal.classList.add('hidden');
  modal.style.display = 'none';
}

function confirmPayment(){
  const amount = PRICE_BY_METHOD[selectedPayMethod];
  IMP.request_pay({
    pg: 'html5_inicis',       // 콘솔에서 등록한 PG Provider와 동일하게 유지
    pay_method: PAY_METHOD_CODE[selectedPayMethod],
    merchant_uid: 'ongi_' + new Date().getTime(), // 결제 건마다 고유해야 함
    name: '온기 프리미엄 리포트',
    amount: amount,
    // buyer_email, buyer_name 등은 선택 항목이라 지금은 생략
  }, function(rsp){
    if(rsp.success){
      closePayModal();
      unlockPremium();
    } else {
      alert('결제가 취소되었거나 실패했어요: ' + rsp.error_msg);
    }
  });
}

function unlockPremium(){
  document.getElementById('upsell-section').classList.add('hidden');
  document.getElementById('premium-section').classList.remove('hidden');
  animatePatternBars(); // quiz.js
  renderMsgTemplate();  // report.js — 단일 상품에 항상 포함
}
