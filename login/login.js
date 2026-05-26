document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const userIdInput = document.getElementById('user-id');
  const userPwInput = document.getElementById('user-pw');

  loginForm.addEventListener('submit', () => {
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
});