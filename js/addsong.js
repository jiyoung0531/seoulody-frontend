const songFileInput = document.querySelector("#songFileInput");
const fileNameText = document.querySelector("#fileNameText");
const uploadButton = document.querySelector("#uploadButton");
const saveSongButton = document.querySelector("#saveSongButton");

let selectedSongName = localStorage.getItem("seonyulSongName") || "";

if (selectedSongName && fileNameText) {
  fileNameText.textContent = selectedSongName;
  fileNameText.classList.add("has-file");
}

uploadButton?.addEventListener("click", function () {
  songFileInput?.click();
});

songFileInput?.addEventListener("change", function () {
  const file = songFileInput.files && songFileInput.files[0];

  if (!file) {
    selectedSongName = "";
    fileNameText.textContent = "파일을 올려주세요";
    fileNameText.classList.remove("has-file");
    return;
  }

  selectedSongName = file.name;
  fileNameText.textContent = selectedSongName;
  fileNameText.classList.add("has-file");
});

saveSongButton?.addEventListener("click", function () {
  if (selectedSongName) {
    localStorage.setItem("seonyulSongName", selectedSongName);
  }

  location.href = "player.html";
});
