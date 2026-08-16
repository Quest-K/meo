/* ── 결제 후 프리미엄 리포트 렌더링 & 공유 기능 ── */

function renderMsgTemplate(){
  const weakLabel = window._weakestKey ? PATTERN_META[window._weakestKey].label : '의심스러운 연락';
  const tpl = `엄마, 아빠 — 요즘 ${weakLabel} 방식의 사기가 정말 많대요.

낯선 문자 속 링크는 누르지 마시고, 전화로 급하게 돈이나 개인정보를 요구하면 일단 끊고 저한테 바로 전화해주세요!

저도 방금 '온기' 테스트 해봤는데, 부모님도 한번 해보시면 좋을 것 같아요 :)`;
  document.getElementById('msg-template').textContent = tpl;
}

function copyTemplate(){
  const text = document.getElementById('msg-template').textContent;
  navigator.clipboard.writeText(text).then(()=>{
    alert('메시지가 복사되었어요. 카카오톡이나 문자에 붙여넣어 보내보세요.');
  }).catch(()=>{
    alert('복사에 실패했어요. 메시지를 직접 선택해 복사해주세요.');
  });
}

/* ── 공유 기능 (카카오톡·텔레그램 제거, 이미지·PDF 저장만 유지) ── */
function buildShareCard(){
  document.getElementById('sc-percent').textContent = resultPercent + '%';
  document.getElementById('sc-grade').textContent = resultGrade + ' 등급';
  const weakLabel = window._weakestKey ? PATTERN_META[window._weakestKey].label : null;
  document.getElementById('sc-copy').textContent = weakLabel
    ? `가장 취약한 패턴: ${weakLabel}`
    : '나의 피싱 생존율을 확인해보세요';
}

function downloadImage(){
  buildShareCard();
  const el = document.getElementById('share-card-capture');
  el.style.position = 'fixed'; el.style.top = '0'; el.style.left = '0'; el.style.zIndex = '-1'; el.style.opacity = '0';
  html2canvas(el, { scale: 2 }).then(canvas => {
    el.style.top = '-9999px'; el.style.left = '-9999px'; el.style.opacity = '1';
    const link = document.createElement('a');
    link.download = 'ongi-result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

function downloadPdf(){
  buildShareCard();
  const el = document.getElementById('share-card-capture');
  el.style.position = 'fixed'; el.style.top = '0'; el.style.left = '0'; el.style.zIndex = '-1'; el.style.opacity = '0';
  html2canvas(el, { scale: 2 }).then(canvas => {
    el.style.top = '-9999px'; el.style.left = '-9999px'; el.style.opacity = '1';
    const { jsPDF } = window.jspdf;
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'px', format: [canvas.width/2, canvas.height/2] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width/2, canvas.height/2);
    pdf.save('ongi-result.pdf');
  });
}
