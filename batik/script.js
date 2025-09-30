// Slider
let currentSlide = 0;
const slider = document.getElementById('slider');
const totalSlides = slider.children.length;

function showSlide(index) {
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }
setInterval(nextSlide, 5000);

// Detail modal
function openDetail(title, img, desc, asal, makna, kategori) {
  document.getElementById("detailTitle").textContent = title;
  document.getElementById("detailImg").src = img;
  document.getElementById("detailDesc").textContent = desc;
  document.getElementById("detailAsal").textContent = asal;
  document.getElementById("detailMakna").textContent = makna;
  document.getElementById("detailKategori").textContent = kategori;
  document.getElementById("detail").classList.remove("hidden");
}
function closeDetail() {
  document.getElementById("detail").classList.add("hidden");
}
