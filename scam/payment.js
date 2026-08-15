/* ── 결제 흐름 (현재 시뮬레이션 상태) ──
   다음 단계(포트원 연동)에서는 이 파일 안의 confirmPayment()만 수정하면 됩니다.
   단일 상품(1,800원)으로 통합되어 플랜 선택 로직은 삭제되었습니다.
*/
 
function openPayModal(){
  document.getElementById('pay-modal-plan').textContent = '프리미엄 리포트';
  document.getElementById('pay-amount-krw').textContent = '1,800원';
 
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
  // ⚙️ 실제 연동 지점 (포트원으로 교체 예정):
  // PortOne.requestPayment({
  //   storeId: "YOUR_STORE_ID",
  //   channelKey: "YOUR_CHANNEL_KEY",
  //   paymentId: `payment-${crypto.randomUUID()}`,
  //   orderName: "온기 프리미엄 리포트",
  //   totalAmount: 1800,
  //   currency: "CURRENCY_KRW",
  //   payMethod: "CARD",
  // }).then(res => {
  //   if (res.code !== undefined) { alert(`결제 실패: ${res.message}`); return; }
  //   closePayModal();
  //   unlockPremium();
  // });
  closePayModal();
  unlockPremium();
}
 
function unlockPremium(){
  document.getElementById('upsell-section').classList.add('hidden');
  document.getElementById('premium-section').classList.remove('hidden');
  // plus-only-section은 이제 항상 노출되므로 별도 토글 없음
  animatePatternBars(); // quiz.js
  renderMsgTemplate();  // report.js — 단일 상품에 항상 포함
}
 
