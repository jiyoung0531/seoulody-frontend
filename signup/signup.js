document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  
  // 인풋 요소들
  const idInput = document.getElementById('user-id');
  const pwInput = document.getElementById('user-pw');
  const pwConfirmInput = document.getElementById('user-pw-confirm');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const authCodeInput = document.getElementById('auth-code');
  
  // 버튼 요소들
  const btnCheckId = document.getElementById('btn-check-id');
  const btnRequestEmail = document.getElementById('btn-request-email');
  const btnVerifyCode = document.getElementById('btn-verify-code');
  const submitBtn = document.getElementById('btn-submit');

  // 비밀번호 조건 요소들
  const reqLength = document.getElementById('req-length');
  const reqUpper = document.getElementById('req-upper');
  const reqSpecial = document.getElementById('req-special');

  // 백엔드 통신 상태 플래그 변수
  let isIdChecked = false;
  let isEmailSent = false;
  let isCodeVerified = false;

  // 1. 🔒 실시간 비밀번호 정규식 조건 체크 로직
  pwInput.addEventListener('input', () => {
    const val = pwInput.value;

    // 조건 A: 최소 8자 이상
    const hasLength = val.length >= 8;
    toggleReqStyle(reqLength, hasLength);

    // 조건 B: 대문자 포함
    const hasUpper = /[A-Z]/.test(val);
    toggleReqStyle(reqUpper, hasUpper);

    // 조건 C: 특수기호 포함
    const hasSpecial = /[\{\}\[\]\/?.,;:|\)*~` !^\-_+<>@\#$%&\\\=\(\'\"]/.test(val);
    toggleReqStyle(reqSpecial, hasSpecial);

    validateFormStatus();
  });

  function toggleReqStyle(element, isValid) {
    if (isValid) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  }

  pwConfirmInput.addEventListener('input', validateFormStatus);
  idInput.addEventListener('input', () => { isIdChecked = false; validateFormStatus(); });
  nameInput.addEventListener('input', validateFormStatus);
  emailInput.addEventListener('input', () => { isCodeVerified = false; validateFormStatus(); });
  authCodeInput.addEventListener('input', validateFormStatus);

  // 2. 🆔 아이디 중복확인 모의 연동
  btnCheckId.addEventListener('click', async () => {
    if (idInput.value.trim() === "") {
      alert('아이디를 입력해주세요.');
      return;
    }
    
    try {
      // 💡 나중에 실제 백엔드 중복확인 엔드포인트 주소로 교체하세요!
      // const res = await fetch(`https://api.seoulody.com/v1/auth/check-id?id=${idInput.value}`);
      // const data = await res.json();
      
      // 테스트용 임시 가상 로직
      alert('사용 가능한 아이디입니다.');
      isIdChecked = true;
      validateFormStatus();
    } catch (err) {
      console.error(err);
    }
  });

  // 3. ✉️ 이메일 인증코드 요청 모의 연동
  btnRequestEmail.addEventListener('click', () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    alert('입력하신 이메일로 인증코드가 발송되었습니다.');
    isEmailSent = true;
  });

  // 4. 🔑 인증코드 확인 버튼 모의 연동
  btnVerifyCode.addEventListener('click', () => {
    if (!isEmailSent) {
      alert('이메일 인증요청을 먼저 진행해주세요.');
      return;
    }
    if (authCodeInput.value.trim() === "") {
      alert('인증코드를 입력해주세요.');
      return;
    }
    // 가상 성공 처리
    alert('인증이 완료되었습니다.');
    isCodeVerified = true;
    validateFormStatus();
  });

  // 5. 폼 전체 정밀 상태 검증 후 제출 버튼 스위칭
  function validateFormStatus() {
    const valPw = pwInput.value;
    const hasLength = valPw.length >= 8;
    const hasUpper = /[A-Z]/.test(valPw);
    const hasSpecial = /[\{\}\[\]\/?.,;:|\)*~` !^\-_+<>@\#$%&\\\=\(\'\"]/.test(valPw);
    
    const isPwValid = hasLength && hasUpper && hasSpecial;
    const isConfirmValid = valPw === pwConfirmInput.value && pwConfirmInput.value !== "";
    const isNameValid = nameInput.value.trim() !== "";

    if (isIdChecked && isPwValid && isConfirmValid && isNameValid && isCodeVerified) {
      submitBtn.disabled = false;
      submitBtn.classList.add('active');
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove('active');
    }
  }

  // 6. 🚀 최종 회원가입 백엔드 데이터 전송 로직
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const finalData = {
      userId: idInput.value,
      password: pwInput.value,
      name: nameInput.value.trim(),
      email: emailInput.value
    };

    submitBtn.disabled = true;
    submitBtn.innerText = "처리 중...";

    try {
      const response = await fetch('https://api.seoulody.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      
      if (response.ok) {
        alert('회원가입이 완료되었습니다! 로그인 후 선율을 즐겨보세요.');
        window.location.href = '../login/login.html';
      } else {
        alert('가입 처리 중 오류가 발생했습니다.');
        submitBtn.disabled = false;
        submitBtn.classList.add('active');
        submitBtn.innerText = "회원가입하기";
      }
    } catch (error) {
      console.error(error);
      alert('네트워크 연결이 원활하지 않습니다.');
      submitBtn.disabled = false;
      submitBtn.innerText = "회원가입하기";
    }
  });
});