document.addEventListener('DOMContentLoaded', function () {
  const lowerSlider = document.getElementById('lower');
  const upperSlider = document.getElementById('upper');
  const lowerValue = document.getElementById('lower-value');
  const upperValue = document.getElementById('upper-value');

  lowerSlider.addEventListener('input', function () {
    const lower = parseInt(lowerSlider.value);
    const upper = parseInt(upperSlider.value);

    if (lower > upper - 100000) {
      lowerSlider.value = upper - 100000;
    }

    lowerValue.textContent = lowerSlider.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    updateSliderTrack();
  });

  upperSlider.addEventListener('input', function () {
    const lower = parseInt(lowerSlider.value);
    const upper = parseInt(upperSlider.value);

    if (upper < lower + 100000) {
      upperSlider.value = lower + 100000;
    }

    upperValue.textContent = upperSlider.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    updateSliderTrack();
  });

  function updateSliderTrack() {
    const lower = parseInt(lowerSlider.value);
    const upper = parseInt(upperSlider.value);
    const percentLower = (lower / lowerSlider.max) * 100;
    const percentUpper = (upper / upperSlider.max) * 100;

    document.querySelector('.slider-track').style.background = `linear-gradient(to right, #ddd ${percentLower}%, #1279C3 ${percentLower}%, #1279C3 ${percentUpper}%, #ddd ${percentUpper}%)`;
  }

  updateSliderTrack();
  fetchProducts();
});

function fetchProducts() {
  fetch('http://localhost:5501/api/v1/products')
    .then(response => response.json())
    .then(data => {
      const productList = document.getElementById('products');
      const template = document.getElementById('product-cart').content;
      productList.innerHTML = ''; // Xóa nội dung cũ

      data.forEach(product => {
        const clone = document.importNode(template, true);
        clone.getElementById('image') = product.image;
        clone.getElementById('name').textContent = product.name;
        if (product.discount = 0) { clone.getElementById('disccount').style.display = 'none'; }
        else { clone.getElementById('disccount').textContent = product.discount + "%"; }
        clone.getElementById('price').textContent = product.price;
        productList.appendChild(clone);
      });

    })
    .catch(error => {
      console.error('Error fetching customers:', error);
    });
}
