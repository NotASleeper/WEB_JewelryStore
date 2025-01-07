let allproduct;
let customerid;
let couponid;
let customers;
document.addEventListener('DOMContentLoaded', async function () {
    allproduct = await getProduct();
    await fetchCustomers();
    document.getElementById('avt').src = sessionStorage.getItem('url');

    document.getElementById('user').textContent = sessionStorage.getItem('username');
    const search = document.getElementById('searchInfo');
    displayCart();
    document.getElementById('cancelCheckout').addEventListener('click', function () {
        redirectToNewPage('/sale')
    });
    document.getElementById('saveCheckout').addEventListener('click', async function () {
        await createOrder();
    });
    document.getElementById('cancelChange').addEventListener('click', function () {
        document.getElementById('edit_popup').style.display = 'none';
    });
    document.getElementById('saveChange').addEventListener('click', function () {
        UpdateDetail();
    });
    search.addEventListener('change', async function () {
        const customer = filterCustomer(search.value.toLowerCase());
        console.log(customer);
        if (customer !== null) {
            customerid = customer.id;
            document.getElementById('nameCus').value = customer.name;
            document.getElementById('address').value = customer.address;
            document.getElementById('phone').value = customer.phone;
            document.getElementById('point').textContent = 'Redeem ' + customer.accumulated_point + ' accumulated points';
        }
    })
    document.getElementById('discount').addEventListener('change', async function () {
        const discount = await getCoupon(document.getElementById('discount').value);
        if (discount !== null) {
            document.getElementById('discountValue').textContent = discount.discount + '%';
            couponid = discount.idCoupon;
        }
        else {
            document.getElementById('discountValue').textContent = '';
            couponid = '';
        }
    });

});

function filterCustomer(search) {
    return customers.find(customer => customer.phone.includes(search) ||
        customer.name.toLowerCase().includes(search));
}

async function fetchCustomers() {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/customers`);
        const data = await response.json();
        customers = data;
    } catch (error) {
        console.error('Error fetching customer data:', error);
        return null;
    }
}
async function getProduct() {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/products`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching customer data:', error);
        return null;
    }
}

async function getCoupon(coupon) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/coupons?couponCode=${coupon}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching customer data:', error);
        return null;
    }
}
async function createOrder() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    if (document.getElementById('nameCus').value == '') {
        alert("Customer doesn't exist");
        return;
    }

    const discount = await getCoupon(document.getElementById('discount').value);
    if (discount === null) {
        alert('Invalid coupon code');
        return;
    }

    const usePoint = document.getElementById('usePoint').checked;
    const order = {
        id_customer: customerid,
        id_employee: sessionStorage.getItem('id_employee'),
        is_used_point: usePoint,
        id_coupon: couponid,
        total_price: 0,
        date_created: Date.now(),
        date_payment: null,
        status: 1,
    };

    try {
        // Create the order
        const orderResponse = await fetch('http://localhost:5501/api/v1/order-forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        if (!orderResponse.ok) {
            throw new Error('Failed to create order');
        }

        const orderData = await orderResponse.json();
        console.log(orderData);
        const orderId = orderData.id;
        let totalPrice = 0;
        let totalPayment = 0;
        // Add order details
        for (const item of cart) {
            const product1 = allproduct.find(product => product.id === parseInt(item.id))
            const currentPrice = product1.price * (1 - product1.discount / 100) * item.quantity + item.surcharge;

            const orderDetail = {
                id_order: orderId,
                id_product: item.id,
                quantity: item.quantity,
                request: item.note,
                surcharge: item.surcharge,
                total: currentPrice,
                status: 1
            };
            const orderDetailResponse = await fetch('http://localhost:5501/api/v1/order-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetail),
            });
            if (!orderDetailResponse.ok) {
                throw new Error('Failed to add order detail');
            }
            const res = await fetch(`http://localhost:5501/api/v1/inventories/${item.id}`);
            let inventory = await res.json();
            inventory.quantity -= item.quantity;
            const inventoryResponse = await fetch(`http://localhost:5501/api/v1/inventories/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventory),
            });
            if (!inventoryResponse.ok) {
                throw new Error('Failed to update inventory');
            }
            totalPrice += currentPrice;
            totalPayment += currentPrice;
        }


        totalPayment = totalPayment * (1 - discount.discount / 100);
        const customer = await getCustomerByID(customerid);
        if (usePoint) {
            totalPayment = totalPayment - customer.accumulated_point * 1000;
        }
        const order1 = await getOrder(orderId);
        let updateOrder = {
            id_customer: order1.id_customer,
            id_employee: order1.id_employee,
            is_used_point: order1.is_used_point,
            id_coupon: order1.id_coupon,
            total_price: totalPrice,
            date_created: order1.date_created,
            date_payment: Date.now()
        }
        updateOrder.totalPrice = totalPrice;
        const updateOrderResponse = await fetch(`http://localhost:5501/api/v1/order-forms/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateOrder),
        });

        if (!updateOrderResponse.ok) {
            console.log(updateOrderResponse);
            throw new Error('Failed to update order with total price and payment');
        }
        alert('Order created successfully!');
        sessionStorage.removeItem('cart');
        let customerUpdate = await getCustomerByID(order1.id_customer);

        
        customerUpdate.accumulated_point = Math.floor(totalPrice / 1000);
        if (usePoint) {
            if (customerUpdate.loyalty_point === null) {
                customerUpdate.loyalty_point = Math.floor(totalPrice / 1000);
            }
            else {
                customerUpdate.loyalty_point += Math.floor(totalPrice / 1000);
            }
        }
        customerUpdate.loyalty_point += Math.floor(totalPrice / 1000);
        const customerResponse = await fetch(`http://localhost:5501/api/v1/customers/${order1.id_customer}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerUpdate),
        });
        if (!customerResponse.ok) {
            console.log('Failed to update customer point', customerResponse);
            alert('Failed to update customer point');
            throw new Error('Failed to update customer point');
        }
        redirectToNewPage('/sale');
    }
    catch (error) {
        console.error('Error creating order:', error);
        alert('Failed to create order');
    }
}

function displayCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cartTable');
    let total = 0;
    cartContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const template = document.getElementById('cartitem').content.cloneNode(true);
        const product = allproduct.find(product => product.id === parseInt(item.id));
        const currentPrice = product.price * (1 - product.discount / 100);
        template.getElementById('img').src = !product.imageUrl ? './assets/images/productdefault.png' : product.imageUrl;
        template.getElementById('name').textContent = product.name;
        template.getElementById('current_price').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
        if (product.discount == 0) {
            template.getElementById('discount').style.display = 'none';
            template.getElementById('price').style.display = 'none';
        }
        else {
            template.getElementById('price').textContent = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
            template.getElementById('value').textContent = product.discount + '%';
        }
        template.getElementById('note').textContent = item.note;
        template.getElementById('surcharge').textContent = item.surcharge;
        template.getElementById('quantity').textContent = item.quantity;
        template.getElementById('money').textContent = (currentPrice * item.quantity + item.surcharge).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
        total += currentPrice * item.quantity;
        // Add event listener for delete button
        template.getElementById('deleteitem').addEventListener('click', function () {
            removeFromCart(item.id);
        });

        template.getElementById('edititem').addEventListener('click', function () {
            document.getElementById('edit_popup').dataset.id = item.id;
            document.getElementById('edit_popup').style.display = '';
            document.getElementById('quantityEdit').value = item.quantity;
            document.getElementById('surchargeEdit').value = item.surcharge;
            document.getElementById('productEdit').value = product.nameProduct;
            document.getElementById('noteEdit').value = item.note;
        });

        cartContainer.appendChild(template);
    });
    const totalTemplate = document.getElementById('totalTemplate').content.cloneNode(true);
    totalTemplate.getElementById('totalMoney').textContent = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
    cartContainer.appendChild(totalTemplate);
    document.getElementById('totalPayment').textContent = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
}

function getCart() {
    console.log(sessionStorage.getItem('cart'))
    return JSON.parse(sessionStorage.getItem('cart')) || [];
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

async function getOrder(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/order-forms/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text();
        if (!text) {
            return null;
        }
        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

async function getCustomerByID(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/customers/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text();
        if (!text) {
            return null;
        }
        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Error fetching customer:', error);
        return null;
    }
}

function UpdateDetail() {
    const id = document.getElementById('edit_popup').dataset.id;
    const quantity = parseInt(document.getElementById('quantityEdit').value);
    const surcharge = parseFloat(document.getElementById('surchargeEdit').value);
    const note = document.getElementById('noteEdit').value;

    let cart = getCart();
    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity = quantity;
        item.surcharge = surcharge;
        item.note = note;
        sessionStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('edit_popup').style.display = 'none';
        displayCart();
    }
}

function redirectToNewPage(newPage) {
    window.location.href = newPage;
}
