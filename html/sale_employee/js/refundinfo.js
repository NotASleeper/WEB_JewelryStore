const urlParams = new URLSearchParams(window.location.search);
document.addEventListener('DOMContentLoaded', function () {
    const mode = urlParams.get('mode');
    if (mode === 'view') {
        const id = urlParams.get('id');
        viewMode();
        getRefundInfo(id);
    }
    else {
        let customer;
        addMode();
        document.getElementById('searchInfo').addEventListener('keydown', async function (event) {
            if (event.key === 'Enter') {
                customer = await searchCustomer();
                if (customer) {
                    document.getElementById('customer').value = customer.name;
                    document.getElementById('address').value = customer.address;
                    document.getElementById('phone').value = customer.phone;
                }
            }
        });

        document.getElementById('bill').addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                console.log(this.value);
                checkBill(customer.id, this.value);
            }
        });

        document.getElementById('save').addEventListener('click', function () {
            createRefund(customer.id);
        });

        document.getElementById('cancel').addEventListener('click', function () {
            window.location.href = '/sale/refund';
        });
    }
});

function getRefundInfo(id) {
    fetch('http://localhost:5501/api/v1/refund-forms/' + id)
        .then(response => response.json())
        .then(async data => {
            const customer = await getCustomerByID(data.id_customer);
            const product = await getProductByID(data.id_product);
            document.getElementById('customer').value = customer.name;
            document.getElementById('address').value = customer.address;
            document.getElementById('phone').value = customer.phone;
            document.getElementById('bill').value = data.id_order;
            const option = document.createElement('option');
            option.value = data.id_product;
            option.text = product.name;
            option.selected = true;
            document.getElementById('product').add(option);
            document.getElementById('product').setAttribute('disabled', true);
            document.getElementById('note').value = data.note;
        })
        .catch(error => console.error('Error fetch refund: ', error));
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

async function createRefund(customerID) {
    if (!customerID || document.getElementById('bill').value === '' || document.getElementById('product').value === '0') {
        alert('Please fill in all required fields');
        return;
    }
    const product = document.getElementById('product').value;
    const refund = {
        id_employee: sessionStorage.getItem('idStaff'),
        id_customer: customerID,
        id_order: document.getElementById('bill').value,
        id_product: product,
        date_created: Date.now(),
        note: document.getElementById('note').value,
        status: 1
    };
    try {
        const response = await fetch('http://localhost:5501/api/v1/refund-forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(refund)
        });
        if (!response.ok) {
            throw new Error('Failed to create refund');
        }
        try {
            const response = await fetch(`http://localhost:5501/api/v1/order-forms/${document.getElementById('bill').value}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete order detail');
            }
            alert('Refund created successfully');
            window.location.href = '/sale/refund';

            // let inventory = await getInventoryDetail(product);
            // inventory.quantity += document.getElementById('product').quantity;
            // try {
            //     fetch(`http://localhost:5501/api/v1/inventories`, {
            //         method: 'PUT',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(inventory)
            //     })
            //         .then(response => response.json())
            //         .then(data => {
            //             alert('Refund created successfully');
            //             window.location.href = '/sale/refund';
            //         })
            //         .catch(error => console.error('Error updating inventory:', error));
            // }
            // catch (error) {
            //     console.error('Error updating inventory:', error);
            // }
        }
        catch (error) {
            console.error('Error deleting order:', error);
        }
    }
    catch (error) {
        alert('Failed to create refund');
        console.error('Error creating refund:', error);
    }
}


async function getInventoryDetail(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/inventories/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch inventory detail');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching inventory detail:', error);
        return null;
    }
}

async function checkBill(id, bill) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/order-forms/${bill}`);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        if (data.id !== parseInt(bill)) {
            alert('Bill does not exist');
            document.getElementById('bill').value = '';
            return;
        }
        if (data.id_customer !== parseInt(id)) {
            alert('Bill does not belong to this customer');
            document.getElementById('bill').value = '';
            return;
        }
        const creationDate = new Date(data.date_created);
        const today = new Date();
        const diffTime = Math.abs(today - creationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 7) {
            alert('Bill has been out of date to refund');
            document.getElementById('bill').value = '';
            return;
        }
        document.getElementById('product').innerHTML = '';
        const option1 = document.createElement('option');
        option1.value = 0;
        option1.text = 'Select product';
        option1.selected = true;
        option1.disabled = true;
        document.getElementById('product').add(option1)
        const detail = await getDetailByID(bill);
        detail.forEach(async d => {
            const product = await getProductByID(d.id_product);
            const option = document.createElement('option');
            option.value = d.id_product;
            option.quantity = d.quantity;
            option.text = product.name;
            document.getElementById('product').add(option);
        });

    } catch (error) {
        console.error('Error fetching order:', error);
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

function viewMode() {
    document.getElementById('actions').style.display = 'none';
    document.getElementById('searchcustomer').style.display = 'none';
    document.getElementById('customer').setAttribute('readonly', true);
    document.getElementById('address').setAttribute('readonly', true);
    document.getElementById('phone').setAttribute('readonly', true);
    document.getElementById('bill').setAttribute('readonly', true);
    document.getElementById('note').setAttribute('readonly', true);
}

function addMode() {
    document.getElementById('actions').style.display = '';
    document.getElementById('searchcustomer').style.display = '';
    document.getElementById('customer').removeAttribute('readonly');
    document.getElementById('address').removeAttribute('readonly');
    document.getElementById('phone').removeAttribute('readonly');
    document.getElementById('bill').removeAttribute('readonly');
    document.getElementById('note').removeAttribute('readonly');
    document.getElementById('product').removeAttribute('disabled');
}