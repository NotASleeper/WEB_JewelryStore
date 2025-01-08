const addPopup = document.getElementById('adddetail_popup');
let total = 0;
document.addEventListener('DOMContentLoaded', async function () {
    getProduct();
    getCategory();
    getSupplier();
    document.getElementById('date').value = formatDate(Date.now());
    const staff = await getStaffByID(sessionStorage.getItem('id_employee'));
    document.getElementById('staff').value = staff.name;
});

document.getElementById('supplier').addEventListener('change', async function () {
    const supplier = await getSupplierByID(this.value);
    document.getElementById('address').value = supplier.address;
});

document.getElementById('category').addEventListener('change', function () {
    getProductByCategory(this.value);
});

document.getElementById('product').addEventListener('change', async function () {
    const product = await getProductByID(this.value);
    document.getElementById('category').value = product.id_category;
});

document.getElementById('addNewDetail').addEventListener('click', function () {
    document.getElementById('product').value = '';
    document.getElementById('category').value = '';
    document.getElementById('importPrice').value = '';
    document.getElementById('quantity1').value = '';
    addPopup.style.display = '';
});

document.getElementById('cancelChange').addEventListener('click', function () {
    addPopup.style.display = 'none';
});

document.getElementById('saveChange').addEventListener('click', async function () {
    if (document.getElementById('product').value === '' ||
        document.getElementById('category').value === '' ||
        document.getElementById('importPrice').value === '' ||
        document.getElementById('quantity1').value === '') {
        alert('Please fill in information');
        return;
    }
    addPopup.style.display = 'none';
    const template = document.getElementById('detailTemplate').content;
    const row = template.querySelector('tr').cloneNode(true);
    row.setAttribute('data-product-id', document.getElementById('product').value);
    row.querySelector('#ID').textContent = document.getElementById('detailTable').children.length + 1;
    const product = await getProductByID(document.getElementById('product').value);
    row.querySelector('#name').innerHTML = '<b>' + product.name + '</b><br>' + product.material + ', ' + product.Gemstone.name;
    row.querySelector('#categorydetail').textContent = document.getElementById('category').options[document.getElementById('category').selectedIndex].text;
    row.querySelector('#quantity').textContent = document.getElementById('quantity1').value;
    row.querySelector('#price').textContent = document.getElementById('importPrice').value;
    row.querySelector('#total').textContent = document.getElementById('quantity1').value * document.getElementById('importPrice').value;
    total += document.getElementById('quantity1').value * document.getElementById('importPrice').value;
    document.getElementById('money').textContent = 'Total: ' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    row.querySelector('#delete').addEventListener('click', function () {
        total -= parseInt(row.querySelector('#total').textContent);
        document.getElementById('money').textContent = 'Total: ' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
        row.remove();
    });
    document.getElementById('detailTable').appendChild(row);
});

document.getElementById('cancelBT').addEventListener('click', function () {
    window.location.href = 'liquidation.html';
});

document.getElementById('saveBT').addEventListener('click', async function () {
    createImport();
});

function createImport() {
    if (document.getElementById('supplier').value === '' ||
        document.getElementById('detailTable').children.length === 0) {
        alert('Please fill in information');
        return;
    }
    fetch('http://localhost:5501/api/v1/import-forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_supplier: document.getElementById('supplier').value,
            id_employee: sessionStorage.getItem('id_employee'),
            id_employee_accepted: null,
            date_created: Date.now(),
            date_accepted: null,
            total_price: total,
            status: 1,
        })
    })
        .then(response => response.json())
        .then(data => {
            const id = data.id;
            const rows = Array.from(document.getElementById('detailTable').children);
            const details = rows.map(row => ({
                id_lot: id,
                id_product: row.getAttribute('data-product-id'),
                quantity: parseInt(row.querySelector('#quantity').textContent),
                price: parseInt(row.querySelector('#price').textContent),
                total: parseInt(row.querySelector('#total').textContent),
                status: 1,
            }));
            details.forEach(detail => {
                fetch('http://localhost:5501/api/v1/import-details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(detail)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Detail created: ', data);
                    })
                    .catch(error => {
                        console.error('Error creating detail: ', error);
                        alert('Error creating liquidation');
                    });
            });
            alert('Import created successfully');
            window.location.href = 'import.html';
        })
        .catch(error => {
            console.error('Error creating import: ', error);
            alert('Error creating import')
        });
}

function getSupplier() {
    fetch('http://localhost:5501/api/v1/suppliers')
        .then(response => response.json())
        .then(data => {
            data.forEach(s => {
                document.getElementById('supplier').appendChild(new Option(s.name, s.id));
            })
        })
        .catch(error => console.error('Error fetching supplier: ', error));
}

function getProduct() {
    fetch('http://localhost:5501/api/v1/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(p => {
                document.getElementById('product').appendChild(new Option(p.name, p.id));
            })
        })
        .catch(error => console.error('Error fetching product: ', error));
}

function getCategory() {
    fetch('http://localhost:5501/api/v1/product-categories')
        .then(response => response.json())
        .then(data => {
            data.forEach(c => {
                document.getElementById('category').appendChild(new Option(c.name, c.id));
            })
        })
        .catch(error => console.error('Error fetching category: ', error));
}

function getProductByCategory(id) {
    fetch('http://localhost:5501/api/v1/products')
        .then(response => response.json())
        .then(data => {
            const filtered = data.filter(p => p.id_category === parseInt(id));
            document.getElementById('product').innerHTML = '';
            document.getElementById('product').appendChild(new Option('Select product', ''));
            filtered.forEach(p => {
                document.getElementById('product').appendChild(new Option(p.name, p.id));
            })
        })
        .catch(error => console.error('Error fetching product: ', error));
}

async function getSupplierByID(id) {
    const response = await fetch(`http://localhost:5501/api/v1/suppliers/${id}`);
    const data = await response.json();
    return data;
}

async function getStaffByID(id) {
    const response = await fetch(`http://localhost:5501/api/v1/employees/${id}`);
    const data = await response.json();
    return data;
}

async function getProductByID(id) {
    const response = await fetch(`http://localhost:5501/api/v1/products/${id}`);
    const data = await response.json();
    return data;
}

function formatDate(date) {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}