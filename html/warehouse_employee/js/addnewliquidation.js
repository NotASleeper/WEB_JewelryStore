const addPopup = document.getElementById('adddetail_popup');
let total = 0;
document.addEventListener('DOMContentLoaded', async function () {
    getProduct();
    getCategory();
    document.getElementById('date').value = formatDate(Date.now());
    const staff = await getStaffByID(sessionStorage.getItem('id_employee'));
    document.getElementById('staff').value = staff.name;
});

document.getElementById('category').addEventListener('change', function () {
    getProductByCategory(this.value);
});

document.getElementById('product').addEventListener('change', async function () {
    const product = await getProductByID(this.value);
    document.getElementById('category').value = product.id_category;
    document.getElementById('price1').value = product.price;
});

document.getElementById('addNewDetail').addEventListener('click', function () {
    document.getElementById('product').value = '';
    document.getElementById('category').value = '';
    document.getElementById('sellingPrice').value = '';
    document.getElementById('price1').value = '';
    document.getElementById('quantity1').value = '';
    addPopup.style.display = '';
});

document.getElementById('cancelChange').addEventListener('click', function () {
    addPopup.style.display = 'none';
});

document.getElementById('saveChange').addEventListener('click', async function () {
    if (document.getElementById('product').value === '' ||
        document.getElementById('category').value === '' ||
        document.getElementById('sellingPrice').value === '' ||
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
    const liqQuantity = document.getElementById('quantity1').value;
    if (product.Inventory.quantity < liqQuantity) {
        alert("Out of stock");
        return;
    }
    row.querySelector('#name').innerHTML = '<b>' + product.name + '</b><br>' + product.material + ', ' + product.Gemstone.name;
    row.querySelector('#categorydetail').textContent = document.getElementById('category').options[document.getElementById('category').selectedIndex].text;
    row.querySelector('#quantity').textContent = document.getElementById('quantity1').value;
    row.querySelector('#price').textContent = document.getElementById('sellingPrice').value;
    row.querySelector('#total').textContent = document.getElementById('quantity1').value * document.getElementById('sellingPrice').value;
    total += document.getElementById('quantity1').value * document.getElementById('sellingPrice').value;
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
    createLiquidation();
});

function createLiquidation() {
    const liq = {
        id_employee_created: sessionStorage.getItem('id_employee'),
        id_employee_accepted: null,
        date_created: Date.now(),
        date_accepted: null,
        total_price: total,
        product_status: 0,
        status: 1,
    }
    fetch('http://localhost:5501/api/v1/liquidation-forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(liq)
    })
        .then(response => response.json())
        .then(data => {
            const id = data.id;
            const rows = Array.from(document.getElementById('detailTable').children);
            const details = rows.map(row => ({
                id_liq: id,
                id_product: row.getAttribute('data-product-id'),
                quantity: parseInt(row.querySelector('#quantity').textContent),
                price_down: parseInt(row.querySelector('#price').textContent),
                status: 1,
            }));
            details.forEach(detail => {
                fetch('http://localhost:5501/api/v1/liquidation-details', {
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
            alert('Liquidation created successfully');
            window.location.href = 'liquidation.html';
        })
        .catch(error => {
            console.error('Error creating liquidation: ', error);
            alert('Error creating liquidation');
        });
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