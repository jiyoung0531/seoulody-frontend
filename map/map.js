const homeTapBox = document.getElementById('box-nav-home');
if (homeTapBox) {
    homeTapBox.addEventListener('click', () => {
        window.location.href = "main.html";
    });
}