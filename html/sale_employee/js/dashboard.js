if (typeof allproduct === 'undefined') {
  var allproduct = [];
}
if (typeof products === 'undefined') {
  var products = [];
}


document.addEventListener('DOMContentLoaded', function () {

  const lowerSlider = document.getElementById('lower');
  const upperSlider = document.getElementById('upper');
  const lowerValue = document.getElementById('lower-value');
  const upperValue = document.getElementById('upper-value');
  const searchInput = document.getElementById('searchInfo');
  const categoryList = document.getElementById('category-list');
  const logoutPopup = document.getElementById('logout_popup');
  const cancelButton = document.getElementById('cancelButton');
  const confirmButton = document.getElementById('confirmButton');

  //custom slider
  lowerSlider.addEventListener('input', function () {
    const lower = parseInt(lowerSlider.value);
    const upper = parseInt(upperSlider.value);

    if (lower > upper - 100000) {
      lowerSlider.value = upper - 100000;
    }

    lowerValue.textContent = lowerSlider.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    filterProductsByPrice();
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
    filterProductsByPrice();
  });

  updateSliderTrack();

  //lấy dữ liệu ban đầu
  fetchProducts();

  //reset filter
  document.getElementById('resetFilter').addEventListener('click', function () {
    displayProducts(allproduct);
    products = allproduct;
  });

  //nhấn icon search
  document.getElementById('searchic').addEventListener('click', function () {
    const search = searchInput.value.toLowerCase();
    filterProductsByName(search);
  });

  //nhấn nút ở search input
  searchInput.addEventListener('keydown', function (event) {
    const search = searchInput.value.toLowerCase();
    if (event.key === 'Enter') {
      filterProductsByName(search);
    }
    else if (search === '') {
      displayProducts(products);
    }
  });

  //chọn category
  categoryList.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      const category = event.target.getAttribute('data-category');
      filterProductsByCategory(category);
      updateURLWithCategory(category);
    }
  });

  //click icon logout
  document.getElementById('logout-ic').addEventListener('click', function () {
    logoutPopup.style.display = '';
  });

  cancelButton.addEventListener('click', function () {
    logoutPopup.style.display = 'none';
  });

  confirmButton.addEventListener('click', function () {
    // Thực hiện hành động đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
    window.location.href = '../manager/login.html';
  });

});

//chuyển trang
function redirectToNewPage(page) {
  window.location.href = page;
}


//lấy danh sách sản phẩm
function fetchProducts() {
  const url = 'http://localhost:5501/api/v1/products'
  fetch(url)
    .then(response => response.json())
    .then(data => {
      allproduct = data;
      products = data;
      displayProducts(data);
      const maxPrice = Math.max(...allproduct.map(product => product.price));
      document.getElementById('max-value').textContent = maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
      document.getElementById('lower').min = 0;
      document.getElementById('lower').value = 0;
      document.getElementById('upper').max = maxPrice;
      document.getElementById('upper').value = maxPrice;
      document.getElementById('upper-value').textContent = maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      updateSliderTrack();
    })
    .catch(error => {
      console.error('Error fetching customers:', error);
    });
}

//hiển thị sản phẩm
function displayProducts(listproduct) {
  const productList = document.getElementById('products');
  const template = document.getElementById('product-cart').content;
  productList.innerHTML = ''; // Xóa nội dung cũ
  listproduct.forEach(product => {
    const clone = document.importNode(template, true);
    clone.getElementById('image') = product.image;
    clone.getElementById('name').textContent = product.name;
    if (product.discount === 0) { clone.getElementById('disccount').style.display = 'none'; }
    else { clone.getElementById('disccount').textContent = product.discount + "%"; }
    clone.querySelector('.product-cart').addEventListener('click', function () {
      if (product.quantity === 0) { window.location.href = `product_info_outofstock.html?id=${product.id}`; }
      else {
        window.location.href = `product_info.html?id=${product.id}`;
      }
    });
    clone.getElementById('price').textContent = product.price;
    productList.appendChild(clone);
  });
}

//lọc sản phẩm theo tên
function filterProductsByName(searchinfo) {
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchinfo.toLowerCase()));
  displayProducts(filteredProducts);
}

//lọc sản phẩm theo phân loại
function filterProductsByCategory(category) {
  const filteredProducts = category === 'all' ? allproduct : allproduct.filter(product => product.id_category === category);
  products = filteredProducts;
  displayProducts(filteredProducts);
}

//lọc sản phẩm theo đơn giá
function filterProductsByPrice() {
  const lower = parseInt(document.getElementById('lower').value);
  const upper = parseInt(document.getElementById('upper').value);
  const filteredProducts = products.filter(product => product.price >= lower && product.price <= upper);
  products = filteredProducts;
  displayProducts(filteredProducts);
}

//cập nhật url khi tìm sản phẩm theo phân loại
function updateURLWithCategory(category) {
  const url = new URL(window.location);
  url.searchParams.set('category', category);
  window.history.pushState({}, '', url);
}

//Cập nhật giá trị cho slider
function updateSliderTrack() {
  const lowerSlider = document.getElementById('lower');
  const upperSlider = document.getElementById('upper')
  const lower = parseInt(lowerSlider.value);
  const upper = parseInt(upperSlider.value);
  const percentLower = (lower / lowerSlider.max) * 100;
  const percentUpper = (upper / upperSlider.max) * 100;
  document.querySelector('.slider-track').style.background = `linear-gradient(to right, #ddd ${percentLower}%, #1279C3 ${percentLower}%, #1279C3 ${percentUpper}%, #ddd ${percentUpper}%)`;
}