/* ── 결제 흐름 (포트원 V1 테스트 연동) ──
   단일 상품(1회성 1,800원) 구조.
   지금은 포트원 콘솔의 "테스트" 채널(KG이니시스 INIpayTest)에 연결된 상태입니다.
   실제 사업자등록 후에는 콘솔에서 "실연동"으로 전환하면 되고, 이 코드는 그대로 둬도 됩니다.
*/
const REPORT_PRICE_KRW = 1800;

// 포트원 콘솔의 "고객사 식별코드"
IMP.init('imp32873203');

function openPayModal(){
  document.getElementById('pay-modal-plan').textContent = '프리미엄 리포트';
  document.getElementById('pay-amount-krw').textContent = REPORT_PRICE_KRW.toLocaleString() + '원';
  const modal = document.getElementById('pay-modal');
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

function closePayModal(){
  const modal = document.getElementById('pay-modal');
  modal.classList.add('hidden');
  modal.style.display = 'none';
}

function confirmPayment(){
  IMP.request_pay({
    pg: 'html5_inicis',       // 콘솔에서 등록한 PG Provider와 동일하게 유지
    pay_method: 'card',
    merchant_uid: 'ongi_' + new Date().getTime(), // 결제 건마다 고유해야 함
    name: '온기 프리미엄 리포트',
    amount: REPORT_PRICE_KRW,
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
