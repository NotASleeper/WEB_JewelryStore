let refundList = [];

document.addEventListener('DOMContentLoaded', function () {
    //hiển thị danh sách đơn trả hàng
    getRefundList(refundList);

    //thêm mới đơn trả hàng
    document.getElementById('addNewRefundForm').addEventListener('click', function () {
        window.location.href = '/sale/refundinfo?mode=add';
    });

    //tìm kiếm đơn trả hàng
    document.getElementById('searchInfo').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchValue = document.getElementById('searchInfo').value;
            const filteredList = refundList.filter(r => r.id.toString().includes(searchValue));
            displayRefundList(filteredList);
        }
    });

    document.getElementById('searchic').addEventListener('click', function () {
        const searchValue = document.getElementById('searchinput').value;
        const filteredList = refundList.filter(r => r.id.toString().includes(searchValue));
        displayRefundList(filteredList);
    });

    document.getElementById('searchInfo').addEventListener('change', function () {
        const searchValue = document.getElementById('searchInfo').value;
        if (searchValue === '') {
            displayRefundList(refundList);
        }
    });
});

function getRefundList() {
    fetch('http://localhost:5501/api/v1/refund-forms')
        .then(response => response.json())
        .then(data => {
            refundList = data;
            console.log(refundList);
            displayRefundList(refundList);
        })
        .catch(error => {
            console.error('Error fetching refund list:', error);
        });
}

function displayRefundList(refundList) {
    const table = document.getElementById('refundTable');
    const template = document.getElementById('refundTemplate').content;
    table.innerHTML = '';
    refundList.forEach(async refund => {
        const row = document.importNode(template, true);
        row.getElementById('ID_tbody').textContent = refund.id;
        const customer = await getCustomerByID(refund.id_customer);
        row.getElementById('customer').textContent = customer.name;
        row.getElementById('date').textContent = formatDate(refund.date_created);
        const product = await getProductByID(refund.id_product);
        row.getElementById('product').textContent = product.name;
        row.getElementById('bill').textContent = refund.id_order;
        row.getElementById('tr').addEventListener('click', function () {
            window.location.href = `/sale/refundinfo?mode=view&id=${refund.id}`;
        });
        table.appendChild(row);
    });
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

function formatDate(date) {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}