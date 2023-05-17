const images = document.querySelectorAll('.image-container img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentImg = 0;

function reset() {
	images.forEach(img => {
		img.classList.remove('active');
	});
}

function showImage(index) {
	reset();
	images[index].classList.add('active');
}

function nextImage() {
	currentImg++;
	if (currentImg > images.length - 1) {
		currentImg = 0;
	}
	showImage(currentImg);
}

function prevImage() {
	currentImg--;
	if (currentImg < 0) {
		currentImg = images.length - 1;
	}
	showImage(currentImg);
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
