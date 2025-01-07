let preOrderInfo = {};
const urlParams = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', async function () {
    const editPopup = document.getElementById('edit_popup');
    const cancelEdit = document.getElementById('cancelChange');
    const saveEdit = document.getElementById('saveChange');
    const mode = urlParams.get('mode');
    if (mode === 'view') {
        const id = urlParams.get('id');
        await displayPreOrder(id);
        viewMode();
        document.getElementById('savePay').addEventListener('click', () => {
            finishPreOrder(id);
        });
        document.getElementById('cancelPay').addEventListener('click', () => {
            window.location.href = '/sale/preorder';
        });
    }
    else {
        let customer;
        const idProduct = urlParams.get('idproduct');
        addMode();
        await displayProduct(idProduct);
        document.getElementById('searchInfo').addEventListener('keydown', async function (e) {
            if (e.key === 'Enter') {
                customer = await searchCustomer();
                if (customer) {
                    document.getElementById('customer').value = customer.name;
                    document.getElementById('phone').value = customer.phone;
                    document.getElementById('address').value = customer.address;
                }
                else {
                    console.log('Customer not found');
                }
            }
        });
        document.getElementById('cancel').addEventListener('click', () => {
            window.location.href = '/sale/productinfo0?id=' + idProduct;
        });
        document.getElementById('save').addEventListener('click', function () {
            addPreOrder(customer);
        });
        document.getElementById('edititem').addEventListener('click', () => {
            editPopup.style.display = '';
            document.getElementById('productEdit').value = document.getElementById('product').textContent;
            document.getElementById('quantityEdit').value = document.getElementById('quantity').textContent;
            document.getElementById('noteEdit').value = document.getElementById('note').textContent;
            document.getElementById('surchargeEdit').value = parseCurrency(document.getElementById('surcharge').textContent);
        });
        document.getElementById('cancelChange').addEventListener('click', () => {
            editPopup.style.display = 'none';
        });
        document.getElementById('saveChange').addEventListener('click', () => {
            document.getElementById('quantity').textContent = document.getElementById('quantityEdit').value;
            document.getElementById('note').textContent = document.getElementById('noteEdit').value;
            document.getElementById('surcharge').textContent = parseInt(document.getElementById('surchargeEdit').value)
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            const currentPrice = parseCurrency(document.getElementById('currentPrice').textContent);
            const money = parseInt(document.getElementById('quantity').textContent)*currentPrice +
                parseInt(document.getElementById('surchargeEdit').value);
            document.getElementById('money').textContent = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            document.getElementById('total').textContent = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            editPopup.style.display = 'none';
        });
    }
});

function parseCurrency(currency) {
    // Remove commas and non-numeric characters
    const cleaned = currency.replace(/[^0-9]/g, '');
    // Parse the cleaned string to an integer
    const value = parseInt(cleaned);
    return value;
}

async function displayProduct(id) {
    const product = await getProductByID(id);
    document.getElementById('img').src = product.imgUrl ? product.imgUrl : './assets/images/productdefault.png';
    document.getElementById('product').textContent = product.name;
    document.getElementById('quantity').textContent = 1;
    document.getElementById('note').textContent = '';
    document.getElementById('surcharge').textContent = '0';
    const currentPrice = product.price * (100 - product.discount) / 100;
    document.getElementById('money').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    document.getElementById('currentPrice').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    if (product.discount === 0) {
        document.getElementById('discount').style.display = 'none';
        document.getElementById('price').style.display = 'none';
    }
    else {
        document.getElementById('discount').style.display = '';
        document.getElementById('price').style.display = '';
        document.getElementById('total').textContent = product.price * (100 - product.discount) / 100;
        document.getElementById('value').textContent = product.discount + '%';
        document.getElementById('price').textContent = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    }
    document.getElementById('total').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";

}

async function displayPreOrder(id) {
    const preOrder = await getPreOrder(id);
    const customer = await getCustomerByID(preOrder.id_customer);
    document.getElementById('customer').value = customer.name;
    document.getElementById('phone').value = customer.phone;
    document.getElementById('address').value = customer.address;
    const detail = await getDetailByID(id);
    console.log(detail);
    const product = await getProductByID(detail.id_product);
    document.getElementById('img').src = product.imgUrl ? product.imgUrl : './assets/images/productdefault.png';
    document.getElementById('product').textContent = product.name;
    document.getElementById('quantity').textContent = detail.quantity;
    document.getElementById('note').textContent = detail.request;
    document.getElementById('surcharge').textContent = detail.surcharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    document.getElementById('money').textContent = detail.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    const currentPrice = product.price * (100 - product.discount) / 100;
    document.getElementById('currentPrice').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    if (product.discount === 0) {
        document.getElementById('discount').style.display = 'none';
        document.getElementById('price').style.display = 'none';
    }
    else {
        document.getElementById('discount').style.display = '';
        document.getElementById('price').style.display = '';
        document.getElementById('value').textContent = product.discount + '%';
        document.getElementById('price').textContent = currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    }
    document.getElementById('total').textContent = preOrder.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
}

function finishPreOrder(id) {
    let preOrder = getPreOrder(id);
    preOrder.date_payment = Date.now();
    fetch('http://localhost:5501/api/v1/order-forms/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preOrder),
    })
        .then(response => response.json())
        .then(data => {
            alert('Successfully paid pre-order');
            window.location.href = '/sale/preorder';
        })
        .catch((error) => {
            alert('Error finishing pre-order. Please try again.');
            console.error('Error finishing pre-order:', error);
        });
}

async function getPreOrder(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/order-forms/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch pre-order');
        }
        const data = await response.json();
        // console.log('Data:',data);
        return data;
    } catch (error) {
        console.error('Error fetching pre-order:', error);
        return null;
    }
}

async function getDetailByID(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/order-details/form/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch detail');
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching detail:', error);
        return null;
    }
}

async function getCustomerByID(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/customers/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch customer');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching customer:', error);
        return null;
    }
}

async function searchCustomer() {
    const search = document.getElementById('searchInfo').value.toLowerCase();
    try {
        const response = await fetch(`http://localhost:5501/api/v1/customers`);
        if (!response.ok) {
            throw new Error('Failed to fetch customer');
        }
        const data = await response.json();
        const filterList = data.find(c => c.name.toLowerCase().includes(search)
            || c.phone.includes(search));
        return filterList;
    }
    catch (error) {
        console.error('Error fetching customer:', error);
        return null;
    }
}

async function getProductByID(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

function addPreOrder(customer) {
    const quantity = parseInt(document.getElementById('quantity').textContent);
    const note = document.getElementById('note').textContent;
    const surcharge = parseCurrency(document.getElementById('surcharge').textContent);
    const total = parseCurrency(document.getElementById('total').textContent);
    if (!customer) { alert('Customer does not exist. Please try again.'); return; }

    const preOrder = {
        id_customer: customer.id,
        id_employee: sessionStorage.getItem('id_employee'),
        is_used_point: false,
        id_coupon: null,
        total_price: 0,
        date_created: Date.now(),
        date_payment: null,
        status: 1
    };

    fetch('http://localhost:5501/api/v1/order-forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preOrder),
    })
        .then(response => response.json())
        .then(data => {
            const orderid = data.id;
            const detail = {
                id_order: data.id,
                id_product: urlParams.get('idproduct'),
                quantity: quantity,
                request: note,
                surcharge: surcharge,
                total: total,
                status: 1,
            };
            fetch('http://localhost:5501/api/v1/order-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(detail),
            })
                .then(response => response.json())
                .then(async data => {
                    let order = await getPreOrder(orderid);
                    order.total_price = total;
                    fetch('http://localhost:5501/api/v1/order-forms/' + data.id_order, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(order),
                    })
                        .then(response => response.json())
                        .then(data => {
                            alert('Successfully added pre-order');
                            window.location.href = '/sale/preorder';
                        })
                        .catch((error) => {
                            console.error('Error updating order:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error adding detail:', error);
                });
        })
        .catch((error) => {
            console.error('Error adding order:', error);
        });
}

function viewMode() {
    document.getElementById('actions_pay').style.display = '';
    document.getElementById('searchinput').style.display = 'none';
    document.getElementById('actions').style.display = 'none';
    document.getElementById('customer').setAttribute('readonly', true);
    document.getElementById('phone').setAttribute('readonly', true);
    document.getElementById('address').setAttribute('readonly', true);
}

function addMode() {
    document.getElementById('actions_pay').style.display = 'none';
    document.getElementById('searchinput').style.display = '';
    document.getElementById('actions').style.display = '';
    document.getElementById('customer').setAttribute('readonly', false);
    document.getElementById('phone').setAttribute('readonly', false);
    document.getElementById('address').setAttribute('readonly', false);
}
