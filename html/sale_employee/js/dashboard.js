const lowerSlider = document.getElementById("lower");
const upperSlider = document.getElementById("upper");

const sliderTrack = document.querySelector(".slider-track");

lowerValue.innerHTML = lowerSlider.value.toLocaleString();
upperValue.innerHTML = upperSlider.value.toLocaleString();

lowerSlider.oninput = function() {
if (parseInt(lowerSlider.value) > parseInt(upperSlider.value)) {
    lowerSlider.value = upperSlider.value;
}
  
  updateSliderTrack();
}

upperSlider.oninput = function() {
  if (parseInt(upperSlider.value) < parseInt(lowerSlider.value)) {
    upperSlider.value = lowerSlider.value;
  }
  
  updateSliderTrack();
}

function updateSliderTrack() {
  const lowerPercent = (lowerSlider.value / lowerSlider.max) * 100;
  const upperPercent = (upperSlider.value / upperSlider.max) * 100;
  sliderTrack.style.left = `${lowerPercent}%`;
  sliderTrack.style.width = `${upperPercent - lowerPercent}%`;
}

updateSliderTrack();