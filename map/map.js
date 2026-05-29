document.addEventListener('DOMContentLoaded', () => {
  
    const mapContainer = document.getElementById('kakao-map-container');

    const purpleIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],     // 마커 크기
            iconAnchor: [12, 41],   // 마커가 좌표를 가리키는 뾰족한 바닥 지점
            popupAnchor: [1, -34],  // 팝업창 뜰 때 위치
            shadowSize: [41, 41]    // 그림자 크기
        });
  
    if (mapContainer) {
        const map = L.map('kakao-map-container').setView([37.5650, 126.9830], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        //경복궁
        L.marker([37.5796, 126.9770],{ icon: purpleIcon }).addTo(map);
        //남산타워
        L.marker([37.5511, 126.9882],{ icon: purpleIcon }).addTo(map);
        //청계천
        L.marker([37.5691, 126.9787],{ icon: purpleIcon }).addTo(map);
    }

    const homeTapBox = document.getElementById('box-nav-home');
    if (homeTapBox) {
        homeTapBox.addEventListener('click', () => {
            window.location.href = "../main/main.html";
        });
    }

    const mypageTapBox = document.getElementById('box-nav-mypage');
    if (mypageTapBox) {
        mypageTapBox.addEventListener('click', () => {
            window.location.href = '../mypage/mypage.html';
        });
    }
});