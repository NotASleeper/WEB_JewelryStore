let preOrderList = [];
const deletePopup = document.getElementById('delete_popup');

document.addEventListener('DOMContentLoaded', function () {
    const cancelDelete = document.getElementById('cancelDeleteButton');
    const confirmDelete = document.getElementById('confirmDeleteButton');
    //thêm mới đơn đặt hàng
    document.getElementById('addNewPreOrderForm').addEventListener('click', function (event) {
        window.location.href = '/sale/preorderinfo?mode=add';
    });
    //hiển thị danh sách đơn đặt hàng
    getPreOrderList();

    //hủy xóa đơn đặt hàng
    cancelDelete.addEventListener('click', function () {
        deletePopup.style.display = 'none';
    });

    //xác nhận xóa đơn đặt hàng
    confirmDelete.addEventListener('click', function () {
        const id = deletePopup.getAttribute('data-id');
        deletePreOrder(id);
        deletePopup.style.display = 'none';
    });

    document.getElementById('searchInfo').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchInfo = document.getElementById('searchInfo').value;
            const filteredList = preOrderList.filter(p => p.id.toString().includes(searchInfo));
            displayPreOrderList(filteredList);
        }
    });

    document.getElementById('searchic').addEventListener('click', function () {
        const searchInfo = document.getElementById('searchInfo').value;
        const filteredList = preOrderList.filter(p => p.id.toString().includes(searchInfo));
        displayPreOrderList(filteredList);
    });

    document.getElementById('searchInfo').addEventListener('change', function () {
        const searchInfo = document.getElementById('searchInfo').value;
        if (searchInfo === '') {
            displayPreOrderList(preOrderList);
        }
    });
    
});

function getPreOrderList() {
    fetch('http://localhost:5501/api/v1/order-forms')
        .then(response => response.json())
        .then(data => {
            preOrderList = data.filter(p => p.date_payment === null);
            displayPreOrderList(preOrderList);
        })
        .catch(error => {
            console.error('Error fetching pre-order list:', error);
        });
}

function displayPreOrderList(preOrderList) {
    const preOrderTable = document.getElementById('pre-order-table');
    const template = document.getElementById('pre-order-template').content;
    preOrderTable.innerHTML = '';
    preOrderList.forEach(async preOrder => {
        const row = document.importNode(template, true);
        row.getElementById('ID_tbody').textContent = preOrder.id;
        if (preOrder.id_customer !== null) {
            row.getElementById('customer').textContent = await getCustomerByID(preOrder.id_customer).name;
        }
        row.getElementById('date').textContent = formatDate(preOrder.date_created);
        row.getElementById('price').textContent = preOrder.total_price;
        row.getElementById('editPreOrder').addEventListener('click', function (event) {
            event.stopPropagation();
            window.location.href = `/sale/preorderinfo?mode=edit&id=${preOrder.id}`;
        });
        row.getElementById('deletePreOrder').addEventListener('click', function (event) {
            event.stopPropagation();
            deletePopup.style.display = '';
            deletePopup.setAttribute('data-id', preOrder.id);
        });
        row.getElementById('tr').addEventListener('click', function () {
            window.location.href = '/sale/preorderinfo?mode=view';
        });
        preOrderTable.appendChild(row);
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

function deletePreOrder(id) {
    fetch(`http://localhost:5501/api/v1/order-forms/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            alert('Pre-order deleted successfully');
            getPreOrderList();
        })
        .catch(error => {
            alert('Error deleting pre-order');
            console.error('Error deleting pre-order:', error);
        });
}

function formatDate(date) {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}
