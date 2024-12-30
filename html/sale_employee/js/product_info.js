document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    // Lấy giá trị của tham số 'id'
    const productId = urlParams.get('id');
    // Kiểm tra xem ID có tồn tại không
    if (productId) {
        document.getElementById('user').textContent = sessionStorage.getItem('username');
        const logoutPopup = document.getElementById('logout_popup');
        const cancelButton = document.getElementById('cancelButton');
        const confirmButton = document.getElementById('confirmButton');
        console.log('Product ID:', productId);
        // Fetch dữ liệu sản phẩm từ API
        fetch(`http://localhost:5501/api/v1/products?id=${productId}`)
            .then(response => response.json())
            .then(data => {
                fetch('http://localhost:5501/api/v1/product-categories')
                    .then(response => response.json())
                    .then(categories => {
                        // Hiển thị thông tin sản phẩm lên màn hình
                        displayProductInfo(data[0], categories);
                    })
                    .catch(error => {
                        console.error('Error fetching categories:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
        document.getElementById('logout-ic').addEventListener('click', function () {
            logoutPopup.style.display = '';
        });

        cancelButton.addEventListener('click', function () {
            logoutPopup.style.display = 'none';
        });

        confirmButton.addEventListener('click', function () {
            // Thực hiện hành động đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('id_employee');
            sessionStorage.removeItem('token');

            window.location.href = '/logout';
        });
        // Thực hiện các hành động khác với productId
    } else {
        console.error('Product ID not found in URL');
    }

    function displayProductInfo(product, categories) {
        if (product) {
            const currentPrice = product.price - (product.price * product.discount / 100);
            const category = categories.find(cat => cat.id === product.id_category);
            const categoryName = category ? category.name : 'Unknown Category';
            // Cập nhật DOM để hiển thị thông tin sản phẩm
            document.getElementById('thumbnails').innerHTML = `<img src="${!product.imageUrl?'':product.imageUrl}" alt="${product.name}"  class="thumbnail"> <img src="${!product.imageUrl?'':product.imageUrl}" alt="${product.name}"  class="thumbnail">`;
            document.getElementById('main-image').innerHTML = `<img src="${!product.imageUrl?'':product.imageUrl}" alt="${product.name}" style="width: 700px;">`;
            document.getElementById('name').textContent = !product.name ? '' : product.name;
            document.getElementById('category').textContent = categoryName;
            document.getElementById('gemstone').textContent = product.Gemstone.name;
            document.getElementById('material').textContent = product.material;
            document.getElementById('product-size').textContent = product.size;
            document.getElementById('caratweigtht').textContent = product.Gemstone.weight;
            document.getElementById('color').textContent = product.Gemstone.color;
            document.getElementById('shape').textContent = product.Gemstone.shape ? '' : product.Gemstone.shape;
            document.getElementById('purity').textContent = product.Gemstone.purity;
            document.getElementById('gemstone-size').textContent = product.Gemstone.size;
            document.getElementById('description').textContent = product.description;
            document.getElementById('certificate').href = product.Gemstone.certificate;
            document.getElementById('current-price').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            if (product.discount === 0) {
                document.getElementById('discount').style.display = 'none';
                document.getElementById('price').style.display = 'none';

            }
            else
                document.getElementById('discount').textContent = '↓ ' + product.discount + '%';
            document.getElementById('price').textContent = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            document.getElementById('quantity').textContent = 'Quantity: ' + product.Inventory.quantity;
            document.getElementById('add-to-cart').addEventListener('click', function () {
                // Lưu trữ dữ liệu sản phẩm trong localStorage
                addToCart(product);
            });
        }
        else console.log('Product not found!');
    }
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    }
});