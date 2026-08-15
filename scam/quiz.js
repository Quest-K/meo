/* ───────────────────────────────
   문항 데이터 (15문항)
   pattern: 'link' 링크클릭형 | 'info' 개인정보요구형 | 'money' 금전송금형 | 'call' 통화유도형 | 'pressure' 압박감정형
   options[].score: 1(안전) ~ 0(위험)
─────────────────────────────── */
const QUESTIONS = [
  {
    tag: 'Q1. 공공기관 사칭', pattern:'link',
    title: '이런 문자가 온다면<br>어떻게 하시겠습니까?',
    type: 'sms', sender: '[국민안심보험]',
    body: '일반 검진 대상자 통보서 발송 완료. 미수령 확인 및 상세 내용 조회는 아래 주소에서 확인해 주세요.',
    link: 'gukmin-health.co.kr.info-detail.net/g/3820',
    options: [
      { text: '문자를 무시하고 기관 공식 대표번호로 직접 전화해 확인한다.', score: 1,
        feedback: '문자 속 링크·번호 대신 공식 대표번호로 직접 확인하는 것이 가장 안전한 방법이에요.' },
      { text: '"내가 검진 대상자였나?" 하고 링크를 눌러본다.', score: 0,
        feedback: '공식 도메인이 아닌 변형 주소(...co.kr.info-detail.net)는 가장 흔한 위장 패턴이에요.' },
      { text: '의심스럽지만 일단 캡처해두고 가족에게 물어본다.', score: 0.6,
        feedback: '클릭하지 않은 점은 좋아요. 다만 확인은 공식 채널을 통해 하는 습관을 들여보세요.' },
    ]
  },
  {
    tag: 'Q2. 택배 배송 사칭', pattern:'link',
    title: '배송 조회를 위해<br>이 링크를 누르시겠습니까?',
    type: 'sms', sender: '[늘빠른택배]',
    body: '고객님 주소 오류로 배송이 보류되었습니다. 24시간 내 미수정시 반송 처리됩니다.',
    link: 'nulbbareun-delivery.cn/track?id=29381',
    options: [
      { text: '주소 오류라니 급한 마음에 바로 링크를 눌러 수정한다.', score: 0,
        feedback: '".cn" 등 낯선 국가 도메인과 "24시간 내" 같은 압박 문구는 전형적인 스미싱 신호예요.' },
      { text: '택배사에 전화해보는데, 문자에 적힌 번호로 건다.', score: 0.3,
        feedback: '확인 시도는 좋지만, 문자에 적힌 번호 자체가 가짜일 수 있어요. 검색을 통해 공식 번호를 찾아야 해요.' },
      { text: '주문한 적 없는 택배면 무시하고, 실제 주문 내역을 앱에서 직접 확인한다.', score: 1,
        feedback: '문자 속 링크 대신 본인이 직접 설치한 앱·사이트에서 확인하는 습관이 중요해요.' },
    ]
  },
  {
    tag: 'Q3. 금융기관 보이스피싱', pattern:'call',
    title: '이런 전화를 받는다면<br>어떻게 대응하시겠습니까?',
    type: 'call', callerLabel: '발신: 010-2xxx-9981 (저장되지 않은 번호)',
    callBody: '"안심카드 보안팀입니다. 고객님 명의로 해외에서 350만원 결제가 시도되어 차단했습니다. 본인 확인을 위해 카드 뒷면 번호와 비밀번호 앞 2자리를 말씀해주세요."',
    options: [
      { text: '일단 끊고, 카드 뒷면에 적힌 고객센터 번호로 직접 전화한다.', score: 1,
        feedback: '전화를 끊고 공식 번호로 재발신하는 것이 보이스피싱을 막는 핵심 행동이에요.' },
      { text: '해외 결제라니 놀라서 빠르게 정보를 알려준다.', score: 0,
        feedback: '어떤 금융기관도 전화로 카드 번호 전체나 비밀번호를 묻지 않아요. 이는 100% 보이스피싱 패턴이에요.' },
      { text: '의심되어 "그럼 어디 소속이냐"고 캐묻다가 정보 일부를 흘린다.', score: 0.2,
        feedback: '의심한 것은 좋지만, 대화를 이어갈수록 설계된 각본에 끌려갈 위험이 커져요. 바로 끊는 것이 정답이에요.' },
    ]
  },
  {
    tag: 'Q4. 지인 사칭(메신저)', pattern:'money',
    title: '딸이 보낸 듯한 메시지,<br>바로 도와주시겠습니까?',
    type: 'sms', sender: '카카오톡 · 딸 (프로필 사진 동일)',
    body: '엄마 나 폰 액정 깨져서 수리맡기고 친구폰으로 보내는거야ㅠ 급한데 80만원만 이 계좌로 보내줄 수 있어? 나중에 갚을게',
    link: null,
    options: [
      { text: '딸이 급하다니 일단 계좌로 돈을 보낸다.', score: 0,
        feedback: '프로필 사진까지 도용하는 메신저 피싱이 늘고 있어요. "급하다"는 압박이 있을수록 더 의심해야 해요.' },
      { text: '"무슨 일 있었어?" 같은 질문을 채팅으로 몇 개 던져보고 판단한다.', score: 0.4,
        feedback: '대화만으로는 진위를 알기 어려워요. 가족만 아는 질문보다 직접 통화 확인이 훨씬 안전해요.' },
      { text: '메시지로 답하지 않고, 평소 알던 딸의 전화번호로 직접 전화를 건다.', score: 1,
        feedback: '같은 메신저 안에서 확인하지 않고 다른 채널(전화)로 본인 확인을 하는 것이 핵심이에요.' },
    ]
  },
  {
    tag: 'Q5. 가짜 앱 설치 유도', pattern:'link',
    title: '안내된 앱을 설치해서<br>본인 인증을 진행하시겠습니까?',
    type: 'sms', sender: '[정부민원24]',
    body: '미환급금 1건이 조회되었습니다. 본인 인증 후 환급 신청을 위해 전용 앱 설치가 필요합니다.',
    link: 'gov24-refund-app.net/install.apk',
    options: [
      { text: '앱은 설치하지만 의심스러운 권한 요청이 뜨면 그때 취소한다.', score: 0.3,
        feedback: '설치 단계에서 이미 악성 코드가 실행될 수 있어요. 설치 전에 출처를 의심하는 것이 먼저예요.' },
      { text: '의심스러워서 설치하지 않고, 실제 정부 공식 사이트에서 환급금을 직접 조회한다.', score: 1,
        feedback: '환급금 조회는 공식 앱스토어의 정식 앱이나 공식 홈페이지에서만 진행하는 것이 안전해요.' },
      { text: '환급금을 받기 위해 안내된 앱(.apk)을 설치하고 인증을 진행한다.', score: 0,
        feedback: '공식 앱스토어가 아닌 출처에서 .apk 파일을 직접 설치하도록 유도하는 것은 악성 앱 설치 시도의 전형적인 방식이에요.' },
    ]
  },
  {
    tag: 'Q6. 환급금 사칭', pattern:'link',
    title: '환급금 조회를 위해<br>어떻게 하시겠습니까?',
    type: 'sms', sender: '[국세청 안심환급센터]',
    body: '2025년 종합소득세 과오납분 47,800원이 확인되었습니다. 환급 신청은 본인인증 후 진행해주세요.',
    link: 'tax-refund24.kr-gov.net/check',
    options: [
      { text: '문자 링크는 누르지 않고, 홈택스 앱이나 공식 홈페이지에서 직접 환급금을 조회한다.', score: 1,
        feedback: '환급금 여부는 항상 공식 앱·사이트에서 직접 로그인해 확인하는 것이 안전해요.' },
      { text: '소액이지만 받으면 좋으니 링크를 눌러 본인인증을 진행한다.', score: 0,
        feedback: '국세청은 보통 홈택스 앱이나 우편으로 안내하며, 문자 링크로 본인인증을 요구하지 않아요.' },
      { text: '금액이 작아서 그냥 무시하고 넘어간다.', score: 0.7,
        feedback: '클릭하지 않은 것은 좋지만, 의심되면 진짜 환급금이 있는지 공식 채널에서 확인해보는 것도 도움이 돼요.' },
    ]
  },
  {
    tag: 'Q7. 자녀 사칭(사고)', pattern:'pressure',
    title: '아들이라는 사람의 다급한 전화,<br>어떻게 하시겠습니까?',
    type: 'call', callerLabel: '발신: 알 수 없음 (해외 번호 표시)',
    callBody: '"엄마 나야... 사고가 나서 지금 합의금이 급하게 필요해. 자세히 설명할 시간 없어, 일단 이 계좌로 200만원만 먼저 보내줘. 빨리..."',
    options: [
      { text: '아들 목소리 같아서 놀란 마음에 바로 계좌로 송금한다.', score: 0,
        feedback: 'AI 음성합성으로 목소리를 흉내내는 보이스피싱도 늘고 있어요. "시간이 없다"는 말일수록 더 의심해야 해요.' },
      { text: '일단 통화를 이어가며 사고 경위를 캐묻는다.', score: 0.3,
        feedback: '대화를 길게 끌수록 짜여진 각본에 휘말리기 쉬워요. 끊고 직접 전화하는 것이 가장 안전해요.' },
      { text: '전화를 끊고 아들의 평소 번호로 직접 전화해 확인한다.', score: 1,
        feedback: '같은 통화에서 확인하지 말고, 반드시 끊은 뒤 알고 있던 번호로 재발신해 확인하는 것이 핵심이에요.' },
    ]
  },
  {
    tag: 'Q8. 검찰·경찰 사칭', pattern:'call',
    title: '계좌가 동결된다는 전화,<br>어떻게 대응하시겠습니까?',
    type: 'call', callerLabel: '발신: 02-xxx-xxxx (서울지방검찰청 표시)',
    callBody: '"OOO님 명의 계좌가 범죄에 연루되어 곧 동결됩니다. 자산 보호를 위해 안전계좌로 이전이 필요하니, 가까운 은행에서 안내하는 대로 이체해주세요."',
    options: [
      { text: '전화를 끊고, 검찰청 대표번호(국번없이 1301)나 가족에게 먼저 확인한다.', score: 1,
        feedback: '공포감을 주는 전화일수록 끊고 공식 대표번호로 직접 확인하는 것이 가장 안전해요.' },
      { text: '계좌가 동결된다니 무서워서 안내하는 대로 이체를 진행한다.', score: 0,
        feedback: '검찰·경찰은 절대 전화로 "안전계좌 이전"을 요구하지 않아요. 이런 안내 자체가 100% 보이스피싱이에요.' },
      { text: '일단 은행에 가서 직원에게 사정을 설명하고 이체 여부를 물어본다.', score: 0.8,
        feedback: '은행 창구로 가는 것은 좋은 행동이에요. 다만 가는 길에라도 검찰청 진위를 먼저 확인하면 더 안전해요.' },
    ]
  },
  {
    tag: 'Q9. 경품 당첨 사칭', pattern:'info',
    title: '명절 선물 당첨 문자,<br>어떻게 하시겠습니까?',
    type: 'sms', sender: '[농협 고객감사단]',
    body: '고객님께서 명절 감사 이벤트 1등(한우세트)에 당첨되셨습니다! 배송을 위해 이름, 주소, 생년월일을 회신 부탁드립니다.',
    link: null,
    options: [
      { text: '당첨됐다니 기뻐서 이름과 주소, 생년월일을 답장으로 보낸다.', score: 0,
        feedback: '참여하지 않은 이벤트의 당첨 통보, 그리고 개인정보를 문자로 요구하는 것은 대표적인 정보 수집형 사기예요.' },
      { text: '이름만 알려주고 주소나 생년월일은 알려주지 않는다.', score: 0.4,
        feedback: '이름도 개인정보예요. 일부만 알려줘도 추가 사기에 활용될 수 있으니 아예 응답하지 않는 것이 안전해요.' },
      { text: '참여한 적 없는 이벤트라 무시하고, 농협 고객센터에 직접 전화해 확인한다.', score: 1,
        feedback: '참여하지 않은 이벤트의 당첨은 일단 의심하고, 공식 고객센터로 확인하는 것이 정확해요.' },
    ]
  },
  {
    tag: 'Q10. 통신사 인증 사칭', pattern:'info',
    title: '소액결제 인증 문자,<br>어떻게 대응하시겠습니까?',
    type: 'sms', sender: '[SKT 안심결제]',
    body: '고객님 명의로 99,000원 소액결제가 시도되었습니다. 본인이 아니라면 아래 인증번호를 통신사 상담원에게 알려주세요. [인증번호: 4821]',
    link: null,
    options: [
      { text: '인증번호는 알려주지 않고, 통신사 공식 앱이나 114로 직접 확인한다.', score: 1,
        feedback: '인증번호 요구 자체가 이상 신호예요. 공식 앱·고객센터로 직접 확인하는 습관이 중요해요.' },
      { text: '내가 한 게 아니니 전화 온 상담원에게 인증번호를 바로 알려준다.', score: 0,
        feedback: '인증번호는 본인 확인 외 어떤 목적으로도 타인에게 알려주면 안 돼요. 상담원이라도 절대 요구하지 않는 정보예요.' },
      { text: '문자를 보낸 척하는 사람에게 전화로 "정말 SKT 직원이냐"고 되묻는다.', score: 0.3,
        feedback: '되묻는 시도는 좋지만, 가짜 상담원은 그럴듯하게 둘러댈 수 있어요. 직접 114로 거는 것이 더 안전해요.' },
    ]
  },
  {
    tag: 'Q11. 카카오톡 계정 도용', pattern:'info',
    title: '계정 보안 경고 문자,<br>어떻게 하시겠습니까?',
    type: 'sms', sender: '[카카오 보안센터]',
    body: '고객님의 카카오 계정에 비정상 로그인이 감지되었습니다. 계정 보호를 위해 인증번호 [6630]을 즉시 입력해주세요.',
    link: 'kakao-account-verify.com/auth',
    options: [
      { text: '계정이 위험하다니 급하게 링크를 눌러 인증번호를 입력한다.', score: 0,
        feedback: '카카오 공식 도메인이 아닌 주소로 인증번호를 입력하면 계정이 그대로 탈취돼요.' },
      { text: '인증번호만 입력하고 다른 정보는 입력하지 않는다.', score: 0.1,
        feedback: '인증번호 하나만으로도 계정이 탈취될 수 있어요. 이 유형은 인증번호 입력 자체가 가장 위험한 행동이에요.' },
      { text: '문자 속 링크는 누르지 않고, 카카오톡 앱 내 설정에서 직접 보안 상태를 확인한다.', score: 1,
        feedback: '보안 관련 확인은 항상 앱이나 공식 사이트에 직접 들어가서 하는 것이 안전해요.' },
    ]
  },
  {
    tag: 'Q12. 가짜 세금 고지서', pattern:'pressure',
    title: '재산세 고지서 문자,<br>어떻게 대응하시겠습니까?',
    type: 'sms', sender: '[위택스 안내]',
    body: '2025년 재산세 미납분이 확인되었습니다. 기한 내 미납시 가산세 및 압류 조치가 진행됩니다. 즉시 아래에서 납부해주세요.',
    link: 'wetax-pay.kr-secure.net/bill',
    options: [
      { text: '문자는 무시하고, 위택스 공식 앱이나 홈페이지에서 직접 납부 내역을 확인한다.', score: 1,
        feedback: '세금 관련 안내는 항상 공식 앱·홈페이지에서 직접 로그인해 확인하는 것이 정확해요.' },
      { text: '압류된다니 무서워서 바로 링크에 들어가 카드정보를 입력해 납부한다.', score: 0,
        feedback: '"압류"같은 위협적 표현으로 압박하는 것은 전형적인 수법이에요. 위택스는 이런 방식으로 안내하지 않아요.' },
      { text: '동사무소에 전화해서 문자가 사실인지 물어본다.', score: 0.9,
        feedback: '관공서에 직접 확인하는 좋은 습관이에요. 번호도 검색을 통해 공식 번호로 거셨다면 완벽해요.' },
    ]
  },
  {
    tag: 'Q13. 손주 응급실 사칭', pattern:'money',
    title: '손주가 응급실에 있다는 전화,<br>어떻게 하시겠습니까?',
    type: 'call', callerLabel: '발신: 알 수 없음 (병원 이름 언급)',
    callBody: '"여기 OO병원 응급실인데요, 손녀분이 교통사고로 실려와서 수술이 급한데 보호자가 연락이 안 돼서요. 수술비 150만원을 먼저 입금해주셔야 진행이 가능합니다."',
    options: [
      { text: '손녀가 걱정돼서 일단 안내받은 계좌로 수술비를 입금한다.', score: 0,
        feedback: '실제 응급실은 치료를 먼저 진행하고 비용은 나중에 정산해요. "선입금해야 수술 가능"이라는 말 자체가 사기 신호예요.' },
      { text: '병원 이름을 검색해 대표번호로 전화해 확인해본다.', score: 0.9,
        feedback: '병원 대표번호로 직접 확인하는 것도 좋은 방법이에요. 가족 확인과 함께 하면 더 확실해요.' },
      { text: '전화를 끊고 손녀나 손녀의 부모(자녀)에게 직접 전화해 사실인지 확인한다.', score: 1,
        feedback: '가족에게 직접 전화로 확인하는 것이 가장 빠르고 정확한 방법이에요.' },
    ]
  },
  {
    tag: 'Q14. 보험금 환급 사칭', pattern:'call',
    title: '숨은 보험금이 있다는 전화,<br>어떻게 대응하시겠습니까?',
    type: 'call', callerLabel: '발신: 1588-xxxx (보험사 대표번호로 표시)',
    callBody: '"고객님 명의로 숨은 보험금 320만원이 확인되었습니다. 빠른 환급을 위해 지금 통화로 본인 명의 계좌번호와 주민등록번호를 확인해드릴게요."',
    options: [
      { text: '전화는 끊고, 보험사 공식 앱이나 생명보험협회 "숨은보험금 찾기"에서 직접 조회한다.', score: 1,
        feedback: '숨은 보험금은 생명보험협회·손해보험협회 공식 사이트에서 본인이 직접 조회할 수 있어요.' },
      { text: '환급금을 받을 생각에 전화로 계좌번호와 주민등록번호를 알려준다.', score: 0,
        feedback: '발신번호는 조작될 수 있어요. 전화로 주민등록번호 전체를 묻는 것 자체가 위험 신호예요.' },
      { text: '계좌번호는 알려주지만 주민등록번호는 거부한다.', score: 0.3,
        feedback: '계좌번호만으로도 추가 사기에 악용될 수 있어요. 전화로는 어떤 정보도 주지 않는 것이 안전해요.' },
    ]
  },
  {
    tag: 'Q15. 방역지원금 사칭', pattern:'link',
    title: '지원금 안내 문자,<br>어떻게 하시겠습니까?',
    type: 'sms', sender: '[보건복지부 지원안내]',
    body: '어르신 방역물품 지원금 30,000원 대상자로 선정되셨습니다. 신청 마감이 임박했으니 아래 링크에서 빠르게 신청해주세요.',
    link: 'bokjiro-support.kr.app-link.net/apply',
    options: [
      { text: '문자 링크는 무시하고, 복지로(bokjiro.go.kr) 공식 사이트나 주민센터에서 직접 확인한다.', score: 1,
        feedback: '정부 지원금 관련 안내는 항상 복지로 공식 사이트나 주민센터에서 확인하는 것이 정확해요.' },
      { text: '마감이 임박했다니 서둘러 링크에 들어가 정보를 입력한다.', score: 0,
        feedback: '"마감 임박"이라는 압박 문구와 변형 도메인이 함께 쓰이면 거의 확실한 스미싱이에요.' },
      { text: '링크를 누르긴 하지만 개인정보는 입력하지 않고 화면만 본다.', score: 0.2,
        feedback: '링크를 누르는 순간 악성코드가 설치될 수도 있어요. 의심스러운 링크는 누르지 않는 것이 먼저예요.' },
    ]
  }
];

const PATTERN_META = {
  link:     { label: '링크클릭형',   color: '#C08C73' },
  info:     { label: '개인정보요구형', color: '#D7A23A' },
  money:    { label: '금전송금형',   color: '#E0654F' },
  call:     { label: '통화유도형',   color: '#8A7E7C' },
  pressure: { label: '압박감정형',   color: '#A9714F' },
};

const PATTERN_GUIDE = {
  link: '낯선 링크는 절대 누르지 않는 것이 기본이에요. 문자에 링크가 있으면, 발신자가 누구든 일단 의심하고 공식 앱이나 검색을 통해 직접 들어가는 습관을 들이세요. 링크 주소에 익숙한 기관명이 들어있어도, 뒤에 이상한 도메인이 붙어있는지(예: .net, .cn, 낯선 단어 조합) 꼭 확인하세요.',
  info: '전화나 문자로 주민등록번호, 카드 비밀번호, 인증번호 전체를 요구하는 곳은 100% 사기예요. 어떤 공공기관·금융기관도 이런 정보를 통화 중에 묻지 않아요. 누군가 정보를 요구하면 그 자리에서 끊고, 알고 있는 공식 번호로 직접 다시 거세요.',
  money: '"급하다", "지금 당장" 같은 말과 함께 송금을 요구받으면 가장 먼저 전화를 끊으세요. 그 다음 메시지를 보낸 사람에게 평소 알던 번호로 직접 전화해 본인이 맞는지 확인하세요. 같은 채팅창에서 확인하는 것은 위험해요, 채널을 바꿔서 확인하는 것이 핵심이에요.',
  call: '발신번호는 조작이 가능하다는 점을 꼭 기억하세요. 전화를 받은 그 자리에서 정보를 주거나 약속하지 말고, "확인 후 다시 연락드리겠습니다"라고 말한 뒤 끊고, 공식 대표번호를 직접 검색해서 거세요.',
  pressure: '무섭거나 급한 감정이 들 때일수록 사기일 가능성이 높아요. 전화를 받고 가슴이 철렁했다면, 잠시 끊고 10초간 숨을 고른 뒤 가족이나 신뢰할 수 있는 사람에게 먼저 알리세요. 사기범들은 바로 판단을 못 하게 압박하는 것을 노립니다.',
};

/* ── 공유 상태 (payment.js, report.js에서도 참조) ── */
let currentIndex = 0;
let answers = []; // {tag, pattern, score, feedback}
let isAnswering = false;
let resultPercent = 0, resultGrade = '', resultGradeColor = '';

function startTest(){
  document.getElementById('start-page').classList.add('hidden');
  document.getElementById('question-page').classList.remove('hidden');
  currentIndex = 0;
  answers = [];
  isAnswering = false;
  renderQuestion();
}

function renderQuestion(){
  const q = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;

  document.getElementById('progress-fill').style.width = ((currentIndex)/total*100) + '%';
  document.getElementById('progress-label').textContent = (currentIndex+1) + ' / ' + total;

  let mediaHtml = '';
  if(q.type === 'sms'){
    mediaHtml = `
      <div class="chat-box">
        <div class="chat-tag">${q.sender}</div>
        ${q.body}${q.link ? `<br><span class="chat-link">${q.link}</span>` : ''}
        <div class="chat-meta">방금 전 · 알 수 없는 발신 번호</div>
      </div>`;
  } else if(q.type === 'call'){
    mediaHtml = `
      <div class="call-box">
        <div class="num">📞 ${q.callerLabel}</div>
        <div style="margin-top:10px;">${q.callBody}</div>
      </div>`;
  }

  const optionsHtml = q.options.map((opt, i) =>
    `<button class="btn btn-select" onclick="selectOption(${i})">${opt.text}</button>`
  ).join('');

  document.getElementById('question-content').innerHTML = `
    <div class="qtag">${q.tag}</div>
    <h1 class="qtitle">${q.title}</h1>
    ${mediaHtml}
    <div class="options">${optionsHtml}</div>
  `;
}

function selectOption(i){
  if(isAnswering) return; // 중복 클릭/터치 방지 (107% 같은 비정상 점수 원인 차단)
  isAnswering = true;

  const q = QUESTIONS[currentIndex];
  const opt = q.options[i];
  answers.push({ tag: q.tag, pattern: q.pattern, score: opt.score, feedback: opt.feedback });

  if(currentIndex < QUESTIONS.length - 1){
    currentIndex++;
    renderQuestion();
    isAnswering = false;
  } else {
    document.getElementById('progress-fill').style.width = '100%';
    document.getElementById('progress-label').textContent = QUESTIONS.length + ' / ' + QUESTIONS.length;
    setTimeout(showResult, 250);
  }
}

function showResult(){
  document.getElementById('question-page').classList.add('hidden');
  document.getElementById('result-page').classList.remove('hidden');

  const totalScore = answers.reduce((s,a)=>s+a.score,0);
  const maxScore = QUESTIONS.length;
  const percent = Math.round((totalScore/maxScore)*100);
  resultPercent = percent;

  let grade, gradeColor, title, msg;
  if(percent >= 90){
    grade = '베테랑'; gradeColor = '#5B8C72';
    title = '거의 모든 함정을 피했어요';
    msg = '의심스러운 연락에 반응하기 전, 항상 공식 채널로 재확인하는 습관이 잘 잡혀 있어요. 다만 피싱 수법은 계속 진화하니 가족에게도 이 테스트를 공유해보세요.';
  } else if(percent >= 70){
    grade = '안전 우위'; gradeColor = '#7A9E7E';
    title = '대체로 안전하게 대응했어요';
    msg = '핵심 상황에서는 잘 대응했지만, 한두 가지 패턴에서 흔들렸어요. 아래 리뷰에서 어떤 부분을 보완하면 좋을지 확인해보세요.';
  } else if(percent >= 40){
    grade = '주의 필요'; gradeColor = '#D7A23A';
    title = '몇 가지 함정에 걸릴 수 있어요';
    msg = '급하거나 그럴듯한 상황일수록 판단이 흐려지기 쉬워요. "링크를 누르기 전 공식 채널로 확인" 한 가지 원칙만 기억해도 위험을 크게 줄일 수 있어요.';
  } else {
    grade = '고위험'; gradeColor = '#E0654F';
    title = '지금 바로 점검이 필요해요';
    msg = '여러 상황에서 피싱 신호를 놓쳤어요. 부끄러운 일이 아니에요 — 요즘 수법은 매우 정교해졌거든요. 아래 리뷰를 가족과 함께 읽어보는 것을 추천해요.';
  }
  resultGrade = grade; resultGradeColor = gradeColor;

  document.getElementById('ring-percent').textContent = percent + '%';
  const circumference = 465;
  const offset = circumference - (circumference * percent / 100);
  const ring = document.getElementById('ring-fg');
  ring.style.stroke = gradeColor;
  setTimeout(()=>{ ring.style.strokeDashoffset = offset; }, 80);

  const chip = document.getElementById('grade-chip');
  chip.textContent = grade + ' 등급';
  chip.style.background = gradeColor + '22';
  chip.style.color = gradeColor;

  document.getElementById('result-title').textContent = title;
  document.getElementById('result-msg').textContent = msg;

  // 무료: 앞 3문항만 리뷰 + 잠금 안내
  const freeAnswers = answers.slice(0, 3);
  let freeHtml = freeAnswers.map(a => reviewItemHtml(a)).join('');
  freeHtml += `<div class="locked-row">🔒 나머지 12개 문항 리뷰는 프리미엄에서 확인할 수 있어요</div>`;
  document.getElementById('review-list-free').innerHTML = freeHtml;

  // 프리미엄: 전체 리뷰는 미리 만들어두고 결제 후 노출
  document.getElementById('review-list-full').innerHTML = answers.map(a => reviewItemHtml(a)).join('');

  // 패턴별 분석 미리 계산
  renderPatternAnalysis();
}

function reviewItemHtml(a){
  const isGood = a.score >= 0.7;
  return `
    <div class="review-item">
      <div class="review-mark ${isGood ? 'mark-good' : 'mark-bad'}">${isGood ? '✓' : '!'}</div>
      <div class="review-text">
        <div class="review-q">${a.tag}</div>
        ${a.feedback}
      </div>
    </div>`;
}

function renderPatternAnalysis(){
  // 패턴별 평균 점수 -> 위험도(%) = 100 - 안전도. 숫자가 높을수록 위험하다는 직관과 일치시킴.
  const grouped = {};
  Object.keys(PATTERN_META).forEach(k => grouped[k] = []);
  answers.forEach(a => grouped[a.pattern].push(a.score));

  const patternRiskScores = {};
  Object.keys(grouped).forEach(k => {
    const arr = grouped[k];
    if(!arr.length){ patternRiskScores[k] = null; return; }
    const safety = Math.round((arr.reduce((s,v)=>s+v,0)/arr.length)*100);
    patternRiskScores[k] = 100 - safety; // 위험도로 환산
  });

  let barsHtml = '';
  Object.keys(PATTERN_META).forEach(k => {
    const meta = PATTERN_META[k];
    const risk = patternRiskScores[k];
    if(risk === null) return;
    barsHtml += `
      <div class="pattern-bar-row">
        <div class="pattern-bar-label">${meta.label}</div>
        <div class="pattern-bar-track"><div class="pattern-bar-fill" style="width:0%;background:${meta.color};" data-target="${risk}"></div></div>
        <div class="pattern-bar-pct">${risk}%</div>
      </div>`;
  });
  document.getElementById('pattern-bars').innerHTML = barsHtml;

  // 가장 취약한(=위험도가 가장 높은) 패턴 찾기
  let weakestKey = null, weakestRisk = -1;
  Object.keys(patternRiskScores).forEach(k => {
    if(patternRiskScores[k] !== null && patternRiskScores[k] > weakestRisk){
      weakestRisk = patternRiskScores[k]; weakestKey = k;
    }
  });

  if(weakestKey){
    const meta = PATTERN_META[weakestKey];
    document.getElementById('weak-pattern-card').innerHTML = `
      <div class="weak-card">
        <div class="weak-card-tag">⚠ 가장 취약한 패턴: ${meta.label}</div>
        <div class="weak-card-text">이 유형의 상황에서 위험도가 ${weakestRisk}%로 가장 높았어요. 아래 맞춤 가이드를 참고해보세요.</div>
      </div>`;
    document.getElementById('guide-box').textContent = PATTERN_GUIDE[weakestKey];
  }

  window._patternScores = patternRiskScores;
  window._weakestKey = weakestKey;
}

function animatePatternBars(){
  document.querySelectorAll('.pattern-bar-fill').forEach(el => {
    const target = el.getAttribute('data-target');
    setTimeout(()=>{ el.style.width = target + '%'; }, 100);
  });
}

function restartTest(){
  document.getElementById('result-page').classList.add('hidden');
  document.getElementById('start-page').classList.remove('hidden');
  document.getElementById('ring-fg').style.strokeDashoffset = 465;
  document.getElementById('upsell-section').classList.remove('hidden');
  document.getElementById('premium-section').classList.add('hidden');
  document.getElementById('plus-only-section').classList.add('hidden');
}
