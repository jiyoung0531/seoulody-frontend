document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const userIdInput = document.getElementById('user-id');
  const userPwInput = document.getElementById('user-pw');
  const goSignupBtn = document.getElementById('btn-go-signup');
  const findAccountBtn = document.getElementById('btn-find-account');


  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const idValue = userIdInput.value.trim();
    const pwValue = userPwInput.value.trim();
      
    if (idValue === '') {
      alert('아이디를 입력해 주세요!');
      userIdInput.focus();
      return;
    }

    if (pwValue === '') {
      alert('비밀번호를 입력해 주세요!');
      userPwInput.focus();
      return;
    }

    window.location.href = '../main/main.html'; 
  });

  goSignupBtn.addEventListener('click', () => {
    window.location.href = '../Signup/terms.html';
  });

  findAccountBtn.addEventListener('click', () => {
    alert('아이디/비밀번호 찾기 기능은 준비 중입니다.');
  });
});