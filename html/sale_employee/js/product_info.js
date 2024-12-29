document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    // Lấy giá trị của tham số 'id'
    const productId = urlParams.get('id');
    // Kiểm tra xem ID có tồn tại không
    if (productId) {
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
            document.getElementById('thumbnails').innerHTML = `<img src="${product.imageUrl}" alt="${product.name}"  class="thumbnail"> <img src="${product.imageUrl}" alt="${product.name}"  class="thumbnail">`;
            document.getElementById('main-image').innerHTML = `<img src="${product.imageUrl}" alt="${product.name}" style="width: 700px;">`;
            document.getElementById('name').textContent = product.name;
            document.getElementById('category').textContent = categoryName;
            document.getElementById('gemstone').textContent = product.gemstone;
            document.getElementById('material').textContent = product.material;
            document.getElementById('product-size').textContent = product.product_size;
            document.getElementById('caratweigtht').textContent = product.carat_weight;
            document.getElementById('color').textContent = product.id_category;
            document.getElementById('shape').textContent = product.shape;
            document.getElementById('purity').textContent = product.purity;
            document.getElementById('gemstone-size').textContent = product.gemstone_size;
            document.getElementById('description').textContent = 'Description: ' + product.description;
            document.getElementById('current-price').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            document.getElementById('discount').textContent = '↓ ' + product.discount + '%';
            document.getElementById('price').textContent = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            document.getElementById('price').textContent = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
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