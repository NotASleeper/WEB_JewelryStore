const urlParams = new URLSearchParams(window.location.search);
document.addEventListener('DOMContentLoaded', async function () {
    const mode = urlParams.get('mode');
    const categories = await getCategory();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        document.getElementById('category').appendChild(option);
    });
    const activities = await getActivity();
    activities.forEach(activity => {
        const option = document.createElement('option');
        option.value = activity.id;
        option.textContent = activity.name_activity;
        document.getElementById('activity').appendChild(option);
    });
    if (mode === 'add') {
        let customer, product, activity, type;
        addMode();
        document.getElementById('searchCustomerInfo').addEventListener('keydown', async function (e) {
            if (e.key !== 'Enter') return;
            customer = await searchCustomer();
            if (customer) {
                document.getElementById('customer').value = customer.name;
                document.getElementById('phone').value = customer.phone;
                document.getElementById('address').value = customer.address;
                if (product) {
                    const result = await checkPeriod(customer.id, product.id);
                    if (result) type = 1;//miễn phí
                    else type = 0;//có phí
                }
            }
        });
        document.getElementById('searchProductInfo').addEventListener('keydown', async function (e) {
            if (e.key !== 'Enter') return;
            product = await searchProduct();
            if (product.length === 0) {
                alert('Product not found');
                return;
            }
            if (product) {
                document.getElementById('nameProduct').value = product.name;
                document.getElementById('category').value = product.id_category;
                if (customer) {
                    const result = await checkPeriod(customer.id, product.id);
                    if (result) type = 1;//miễn phí
                    else type = 0;//có phí
                }
            }
        });
        document.getElementById('activity').addEventListener('change', async function () {
            activity = await getActivityByID(this.value);
            if (!activity) return;
            document.getElementById('price').value = activity.price;
        });
        document.getElementById('cancel').addEventListener('click', function () {
            window.location.href = '/sale/warranty';
        });
        document.getElementById('save').addEventListener('click', async function () {
            createWarranty(customer.id, product.id ? product.id : '', activity.id, type);
        });
    }
    else {
        const id = urlParams.get('id');
        viewMode();
        getWarrantyByID(id);
    }
});

function getWarrantyByID(id) {
    fetch(`http://localhost:5501/api/v1/warranty-maintainances/${id}`)
        .then(response => response.json())
        .then(async data => {
            const customer = await getCustomerByID(data.id_customer);
            const activity = await getActivityByID(data.id_activity);
            document.getElementById('customer').value = customer.name;
            document.getElementById('phone').value = customer.phone;
            document.getElementById('address').value = customer.address;
            document.getElementById('nameProduct').value = data.name_product;
            document.getElementById('category').value = data.id_category;
            document.getElementById('activity').value = data.id_activity;
            document.getElementById('surcharge').value = data.surcharge;
            document.getElementById('date').value = formatDate(data.date_created);
            document.getElementById('price').textContent = activity.price;
            document.getElementById('total').textContent = data.total_price;
        })
        .catch(error => {
            console.error('Error fetching warranty:', error);
        });
};

async function checkPeriod(customerID, productID) {
    const order = await getOrderByCustomerID(customerID);
    order.forEach(async o => {
        const detail = await getDetailByID(o.id);
        detail.forEach(async d => {
            if (d.id_product === productID) {
                const product = await getProductByID(productID);
                const warrantyPeriod = product.warranty_period; // Assuming warranty_period is an integer representing months
                const orderDate = new Date(o.date_created);
                const warrantyEndDate = addMonths(orderDate, warrantyPeriod);
                console.log(warrantyEndDate);
                const today = new Date();
                document.getElementById('warranty_period').textContent = formatDate(warrantyEndDate);
                if (today <= warrantyEndDate) {
                    document.getElementById('surcharge').textContent = 'Free';
                    return true;
                }
                return false;
            }
        });
    });
}

async function createWarranty(customerID, productID, activityID, type) {
    if (!customerID || !activityID || document.getElementById('nameProduct').value === '' || document.getElementById('category').value === '') {
        alert('Please fill in all required fields');
        return;
    }
    const product = await getProductByID(productID);
    const activity = await getActivityByID(activityID);
    const surcharge = document.getElementById('surcharge').textContent === 'Free' ? 0 : parseInt(document.getElementById('surcharge').value);
    const price = type === 1 ? 0 : activity.price;
    const data = {
        id_employee: sessionStorage.getItem('idStaff'),
        id_customer: customerID,
        id_order: null,
        id_product: productID ? productID : null,
        id_category: product ? product.id_category : document.getElementById('category').value,
        id_activity: activityID,
        date_created: Date.now(),
        type: type,
        name_product: !product ? document.getElementById('nameProduct').value : product.name,
        image: null,
        surcharge: surcharge,
        total_price: price + surcharge,
        status: 1
    };
    try {
        const response = await fetch('http://localhost:5501/api/v1/warranty-maintainances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to create warranty');
        }
        alert('Warranty created successfully');
        window.location.href = '/sale/warranty';
    } catch (error) {
        console.error('Error creating warranty:', error);
    }
}


async function getDetailByID(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/order-details/form/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch detail');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching detail:', error);
        return null;
    }
}

async function getOrderByCustomerID(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/order-forms/id-customer/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

async function searchProduct() {
    const search = document.getElementById('searchProductInfo').value.toLowerCase();
    try {
        const response = await fetch(`http://localhost:5501/api/v1/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const filterList = data.find(c => c.name.toLowerCase().includes(search));
        return filterList;
    }
    catch (error) {
        console.error('Error fetching products:', error);
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

async function searchCustomer() {
    const search = document.getElementById('searchCustomerInfo').value.toLowerCase();
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

async function getActivity() {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/service-activities`);
        if (!response.ok) {
            throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        return null;
    }
}

async function getActivityByID() {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/service-activities/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        return null;
    }
}

async function getCategory() {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/product-categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}

async function getCategoryByID() {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/product-categories/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}

function viewMode() {
    document.getElementById('searchCustomer').style.display = 'none';
    document.getElementById('searchProduct').style.display = 'none';
    document.getElementById('actions').style.display = 'none';
    document.getElementById('customer').setAttribute('readonly', true);
    document.getElementById('phone').setAttribute('readonly', true);
    document.getElementById('address').setAttribute('readonly', true);
    document.getElementById('nameProduct').setAttribute('readonly', true);
    document.getElementById('category').setAttribute('readonly', true);
    document.getElementById('activity').setAttribute('readonly', true);
    document.getElementById('surcharge').setAttribute('readonly', true);
    document.getElementById('period').style.display = 'block';
}

function addMode() {
    document.getElementById('searchCustomer').style.display = 'block';
    document.getElementById('searchProduct').style.display = 'block';
    document.getElementById('actions').style.display = 'block';
    document.getElementById('createdDate').style.display = 'none';
}


function addMonths(date, months) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}

function formatDate(date) {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}