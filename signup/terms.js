document.addEventListener('DOMContentLoaded', () => {
  const checkAll = document.getElementById('check-all');
  const subCheckboxes = document.querySelectorAll('.sub-check');
  const requiredCheckboxes = document.querySelectorAll('.sub-check[data-required="true"]');
  const nextBtn = document.getElementById('btn-next');
  
  const accordionToggle = document.getElementById('accordion-toggle');
  const accordionContent = document.getElementById('accordion-content');
  const arrowIcon = accordionToggle.querySelector('.arrow-icon');

  // 1. 전체 동의하기 체크박스 제어 로직
  checkAll.addEventListener('change', () => {
    subCheckboxes.forEach(cb => {
      cb.checked = checkAll.checked;
    });
    validateRequiredTerms();
  });

  // 2. 개별 체크박스 선택 시 상호 관계 제어 로직
  subCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      // 하나라도 풀리면 전체동의 해제, 전부 켜지면 전체동의 활성화
      const allChecked = Array.from(subCheckboxes).every(item => item.checked);
      checkAll.checked = allChecked;
      
      validateRequiredTerms();
    });
  });

  // 3. 필수 약관 충족 여부 확인 및 다음 버튼 상태 갱신 함수
  function validateRequiredTerms() {
    const allRequiredChecked = Array.from(requiredCheckboxes).every(item => item.checked);
    
    if (allRequiredChecked) {
      nextBtn.disabled = false;
      nextBtn.classList.add('active');
    } else {
      nextBtn.disabled = true;
      nextBtn.classList.remove('active');
    }
  }

  // 4. 개인정보 수집 및 이용 안내 아코디언 토글 애니메이션
  accordionToggle.addEventListener('click', () => {
    arrowIcon.classList.toggle('rotate');
    
    if (accordionContent.style.maxHeight && accordionContent.style.maxHeight !== '0px') {
      accordionContent.style.maxHeight = '0px';
    } else {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
    }
  });

  // 5. 다음 버튼 누를 시 데이터 세팅 및 전송 구조
  nextBtn.addEventListener('click', () => {
    // 백엔드 세션/로컬스토리지 저장용 동의 여부 객체 데이터 빌드
    const agreementStatus = {
      userTerms: document.getElementById('check-required-1').checked,
      locationTerms: document.getElementById('check-optional-1').checked,
      privacyTerms: document.getElementById('check-optional-2').checked,
      marketingAd: document.getElementById('check-ad').checked
    };
    
    // 다음 입력 화면으로 넘어가도 동의 내역이 유지되도록 브라우저에 임시 박제
    localStorage.setItem('user_agreements', JSON.stringify(agreementStatus));

    // 이전에 만들어두었던 회원정보 입력(signup.html) 페이지로 토스!
    window.location.href = 'signup.html';
  });
});