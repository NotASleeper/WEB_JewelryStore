document.addEventListener('DOMContentLoaded', function () {
    const logoutPopup = document.getElementById('logout_popup');
    const cancelButton = document.getElementById('cancelButton');
    const confirmButton = document.getElementById('confirmButton');
    const savePopup = document.getElementById('save_popup');
    const cancelSaveButton = document.getElementById('cancelSaveButton');
    const confirmSaveButton = document.getElementById('confirmSaveButton');
    const nameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const birthdayInput = document.getElementById('birthday');

    document.getElementById('user').textContent = sessionStorage.getItem('username');

    document.getElementById('logout-ic').addEventListener('click', function () {
        logoutPopup.style.display = '';
    });

    cancelButton.addEventListener('click', function () {
        logoutPopup.style.display = 'none';
    });

    confirmButton.addEventListener('click', function () {
        // Thực hiện hành động đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id_employee');
        sessionStorage.removeItem('token');

        window.location.href = '/logout';
    });


    document.getElementById('cancelAddButton').addEventListener('click', function () {
        if (nameInput.value.trim() === '' && addressInput.value.trim() === '' &&
            phoneInput.value.trim() === '' && emailInput.value.trim() === '' &&
            birthdayInput.value.trim() === '') {
                window.location.href = '/sale/customer';
        }
        else {            
            savePopup.style.display = '';
        }
    });
    
    document.getElementById('saveButton').addEventListener('click', function () {
        createCustomer(nameInput.value, addressInput.value, phoneInput.value, emailInput.value, birthdayInput.value);
    });

    cancelSaveButton.addEventListener('click', function () { savePopup.style.display = 'none'; });
    confirmSaveButton.addEventListener('click', function () {
        createCustomer(nameInput.value, addressInput.value, phoneInput.value, emailInput.value, birthdayInput.value);
    });

});
function createCustomer(name, address, phone, email, birthday) {
    if (name.trim() === '' || address.trim() === '' || phone.trim() === '' || email.trim() === '' || birthday.trim() === '') {
        alert('Please fill in all required fields');
        return;
    }
    const customer = {
        name: name,
        address: address,
        phone: phone,
        email: email,
        birthday: birthday,        
        loyalty_point: 0,
        accumulated_point: 0,
        status: 1
    };
    fetch('http://localhost:5501/api/v1/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (response.ok) {
            console.log(response);
            alert('Customer saved successfully');
            window.location.href = '/sale/customer'; // Chuyển hướng về trang danh sách khách hàng sau khi lưu thành công
        } else {
            alert('Failed to save customer');
            console.error('Failed to save customer');
        }
    })
    .catch(error => {
        console.error('Error saving customer:', error);
        alert('Failed to save customer');
    });
}