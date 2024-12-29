const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get('id');
const mode = urlParams.get('mode');
let customer = null;

document.addEventListener('DOMContentLoaded', function () {
    if (mode !== 'edit') { viewMode(); }
    else { editMode(); }
    const savePopup = document.getElementById('save_popup');
    const logoutPopup = document.getElementById('logout_popup');
    const cancelButton = document.getElementById('cancelButton');
    const confirmButton = document.getElementById('confirmButton');
    const nameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const birthdayInput = document.getElementById('birthday');
    const loyaltyInput = document.getElementById('loyalty');
    const AccumulatedInput = document.getElementById('Accumulated');

    const deletePopup = document.getElementById('delete_popup');
    getCustomerInfo(customerId);

    document.getElementById('logout-ic').addEventListener('click', function () {
        logoutPopup.style.display = '';
    });

    cancelButton.addEventListener('click', function () {
        logoutPopup.style.display = 'none';
    });

    confirmButton.addEventListener('click', function () {
        // Thực hiện hành động đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
        window.location.href = '/';
    });

    document.getElementById('editCustomer').addEventListener('click', function () { editMode(); });

    document.getElementById('deleteCustomer').addEventListener('click', function () {
        deletePopup.style.display = '';
        deletePopup.setAttribute('data-customer-id', customerId);
    });

    document.getElementById('cancelDeleteButton').addEventListener('click', function () {
        deletePopup.style.display = 'none';
    });

    document.getElementById('confirmDeleteButton').addEventListener('click', function () {
        deleteCustomer(customerId);
        deletePopup.style.display = 'none';
    });

    document.getElementById('cancelEdit').addEventListener('click', function () {
        if (nameInput.value.trim() === customer.name
            && addressInput.value.trim() === customer.address
            && phoneInput.value.trim() === customer.phone
            && emailInput.value.trim() === customer.email
            && formatDate(birthdayInput.value) === formatDate(customer.birthday)) {
            window.location.href = '/sale/customer';
        }
        else {
            savePopup.style.display = '';
        }
    });

    document.getElementById('cancelSaveEButton').addEventListener('click', function () {
        savePopup.style.display = 'none';
        window.location.href = '/sale/customer';
    });

    document.getElementById('confirmSaveEButton').addEventListener('click', function () {
        const updatedCustomer = {
            name: nameInput.value,
            address: addressInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            birthday: birthdayInput.value,
            loyalty_point: loyaltyInput.value,
            accumulated_point: AccumulatedInput.value
        };
        updateCustomer(customerId, updatedCustomer);
    });

    document.getElementById('saveCustomer').addEventListener('click', function () {
        const updatedCustomer = {
            name: nameInput.value,
            address: addressInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            birthday: birthdayInput.value,
            loyalty_point: loyaltyInput.value,
            accumulated_point: AccumulatedInput.value
        };
        updateCustomer(customerId, updatedCustomer);
    });


    async function getCustomerInfo(id) {
        const response = await fetch(`http://localhost:5501/api/v1/customers/${id}`, {});
        const data = await response.json();
        customer = await data;
        nameInput.value = data.name;
        addressInput.value = data.address;
        phoneInput.value = data.phone;
        emailInput.value = data.email;
        birthdayInput.value = formatDate(data.birthday);
        loyaltyInput.value = data.loyalty_point;
        AccumulatedInput.value = data.accumulated_point;
    }

});

function editMode() {
    document.getElementById('name').removeAttribute('readonly');
    document.getElementById('address').removeAttribute('readonly');
    document.getElementById('phone').removeAttribute('readonly');
    document.getElementById('email').removeAttribute('readonly');
    document.getElementById('birthday').removeAttribute('readonly');
    document.getElementById('billTable').style.display = 'none';
    document.getElementById('billTitle').style.display = 'none';
    document.getElementById('viewmode').style.display = 'none';
    document.getElementById('editmode').style.display = '';
}

function viewMode() {
    document.getElementById('name').setAttribute('readonly', true);
    document.getElementById('address').setAttribute('readonly', true);
    document.getElementById('phone').setAttribute('readonly', true);
    document.getElementById('email').setAttribute('readonly', true);
    document.getElementById('birthday').setAttribute('readonly', true);
    document.getElementById('billTable').style.display = '';
    document.getElementById('billTitle').style.display = '';
    document.getElementById('viewmode').style.display = '';
    document.getElementById('editmode').style.display = 'none';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function deleteCustomer(customerId) {
    // Xử lý chỉnh sửa khách hàng ở đây

    console.log('Delete customer with ID:', customerId);
    fetch(`http://localhost:5501/api/v1/customers/${customerId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Customer deleted successfully');
                fetchCustomers(); // Refresh the customer list
            } else {
                alert('Failed to delete customer');
                console.error('Failed to delete customer');
            }
        })
        .catch(error => {
            alert('Failed to delete customer');
            console.error('Error deleting customer:', error);
        });
}

function updateCustomer(customerId, updatedCustomer) {
    fetch(`http://localhost:5501/api/v1/customers/${customerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCustomer)
    })
        .then(response => {
            if (response.ok) {
                alert('Customer updated successfully');
                window.location.href = '/sale/customer'; // Chuyển hướng về trang danh sách khách hàng sau khi cập nhật thành công
            } else {
                alert('Failed to update customer');
                console.error('Failed to update customer');
            }
        })
        .catch(error => {
            alert('Failed to update customer');
            console.error('Error updating customer:', error);
        });
}
