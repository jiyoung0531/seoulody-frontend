const backButton = document.querySelector("#backButton");
const addSongButton = document.querySelector("#addSongButton");
const mySeonyulSong = document.querySelector("#mySeonyulSong");

const savedSongName = localStorage.getItem("seonyulSongName");

if (mySeonyulSong && savedSongName) {
  mySeonyulSong.textContent = savedSongName;
  mySeonyulSong.classList.add("has-song");
}

backButton?.addEventListener("click", function () {
  location.href = "index.html";
});

addSongButton?.addEventListener("click", function () {
  location.href = "addsong.html";
});
