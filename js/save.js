import { placeImages } from "./save-images.js";

document.querySelectorAll("[data-place-image]").forEach((image) => {
    const key = image.dataset.placeImage;

    if (placeImages[key]) {
        image.src = placeImages[key];
    }
});
