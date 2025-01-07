
const cartPopup = document.getElementById('cart');
let allproduct;
document.addEventListener('DOMContentLoaded', async function () {
    allproduct = await getAllProduct();

    document.getElementById('cart_ic').addEventListener('click', function () {
        cartPopup.style.display = '';
        displayCart();
    });

    document.getElementById('cancelBT').addEventListener('click', function () {
        sessionStorage.removeItem('cart');
        cartPopup.style.display = 'none';
    });

    document.getElementById('checkoutBT').addEventListener('click', function () {
        if (sessionStorage.getItem('cart') != null) {
            window.location.href = '/sale/checkout'
        }
        else {
            alert('Cart is empty!');
        }
    });

    document.getElementById('exit-ic').addEventListener('click', function () {
        cartPopup.style.display = 'none';
    });
});


function getCart() {
    console.log(sessionStorage.getItem('cart'));
    return JSON.parse(sessionStorage.getItem('cart')) || [];

}
function displayCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cartTable');
    let total = 0;
    cartContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        console.log(allproduct)
        const template = document.getElementById('cartitem').content.cloneNode(true);
        const product = allproduct.find(p => p.id === parseInt(item.id));
        console.log(item);
        const currentPrice = product.price * (1 - product.discount / 100);

        template.getElementById('img').src = !product.imageUrl ? './assets/images/productdefault.png' : product.imageUrl;
        template.getElementById('name').textContent = product.name;
        template.getElementById('current_price').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
        if (product.discount == 0) {
            template.getElementById('discount').style.display = 'none';
            template.getElementById('price').style.display = 'none';
        }
        else {
            template.getElementById('price').textContent = product.price;
            template.getElementById('value').textContent = product.discount + '%';
        }
        template.getElementById('quantity').textContent = item.quantity;
        template.getElementById('total').textContent = (currentPrice * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
        total += currentPrice * item.quantity;
        // Add event listener for delete button
        template.getElementById('delete').addEventListener('click', function () {
            removeFromCart(item.id);
        });
        cartContainer.appendChild(template);
    });


    // Display total
    const totalTemplate = document.getElementById('totalTemplate').content.cloneNode(true);
    totalTemplate.querySelector('#totalmoney').textContent = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
    cartContainer.appendChild(totalTemplate);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

async function getAllProduct() {
    try{
        const response = await fetch('http://localhost:5501/api/v1/products');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}