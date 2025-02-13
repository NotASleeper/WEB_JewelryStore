let profile = {};

const changePasswordPopup = document.getElementById('changePassword-popup');
document.addEventListener('DOMContentLoaded', function () {
    const logoutPopup = document.getElementById('logout_popup');
    const cancelButton = document.getElementById('cancelButton');
    const confirmButton = document.getElementById('confirmButton');
    const cancelChange = document.getElementById('cancelChange');
    const saveChange = document.getElementById('saveChange');

    const savePopup = document.getElementById('save_popup');
    const cancelSave = document.getElementById('cancelSaveEButton');
    const save = document.getElementById('confirmSaveEButton');

    document.getElementById('avt').src = sessionStorage.getItem('url');

    document.getElementById('user').textContent = sessionStorage.getItem('username');
    document.getElementById('avatar').src = sessionStorage.getItem('url');
    displayProfile();
    viewMode();

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
        sessionStorage.removeItem('idAccount');
        window.location.href = '/logout';
    });

    document.getElementById('changePassword').addEventListener('click', function () {
        document.getElementById('oldPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        changePasswordPopup.style.display = '';
    });

    cancelChange.addEventListener('click', function () {
        changePasswordPopup.style.display = 'none';
    });

    saveChange.addEventListener('click', async function () {
        const isPasswordCorrect = await checkPassword(document.getElementById('oldPassword').value.trim());
        if (!isPasswordCorrect) {
            alert('Old password is incorrect');
            return;
        }
        if (document.getElementById('newPassword').value.trim() === document.getElementById('confirmPassword').value.trim()) {
            changePassword();
        } else {
            alert('Password and confirm password do not match');
        }
    });

    document.getElementById('edit').addEventListener('click', function () {
        editMode();
    });

    document.getElementById('cancelSave').addEventListener('click', function () {
        displayProfile();
        viewMode();
    });

    document.getElementById('save').addEventListener('click', function () {
        document.getElementById('password').value = '';
        savePopup.style.display = '';
    });

    cancelSave.addEventListener('click', function () {
        savePopup.style.display = 'none';
    });

    save.addEventListener('click', async function () {
        const password = document.getElementById('password').value.trim();
        const isPasswordCorrect = await checkPassword(password);
        if (password === '') { alert('Please enter your password'); return; }
        if (!isPasswordCorrect) {
            alert('Password is incorrect');
        }
        else {
            saveProfile();
            savePopup.style.display = 'none';
        }
    });
});

async function checkPassword(enterpassword) {
    const id_account = sessionStorage.getItem('idAccount');
    try {
        const response = await fetch(`http://localhost:5501/api/v1/accounts/${id_account}`);
        const data = await response.json();
        if (data.password.trim() === enterpassword.trim()) {
            return true;
        } else {
            console.error('Incorrect');
            return false;
        }
    } catch (error) {
        console.error('Fail', error);
        return false;
    }
}

function changePassword() {
    const id_account = sessionStorage.getItem('idAccount');
    const updatedPassword = {
        id_employee: sessionStorage.getItem('id_employee'),
        username: sessionStorage.getItem('username'),
        password: document.getElementById('newPassword').value
    }
    fetch(`http://localhost:5501/api/v1/accounts/${id_account}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPassword)
    })
        .then(response => {
            if (response.ok) {
                alert('Password changed successfully');// Chuyển hướng về trang danh sách khách hàng sau khi cập nhật thành công
                changePasswordPopup.style.display = 'none';

            } else {
                alert('Failed to change password');
                console.error('Failed to change password');
            }
        })
        .catch(error => {
            alert('Failed to change password');
            console.error('Error change password:', error);
        });
}

function saveProfile() {
    const id_employee = sessionStorage.getItem('id_employee');
    const updatedProfile = {
        name: document.getElementById('name').value,
        id_position: profile.id_position,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        birthday: document.getElementById('birthday').value
    }
    fetch(`http://localhost:5501/api/v1/employees/${id_employee}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
    })
        .then(response => {
            if (response.ok) {
                alert('Your profile updated successfully');
                displayProfile();
            } else {
                alert('Failed to update your profile');
                console.error('Failed to update your profile');
            }
        })
        .catch(error => {
            alert('Failed to update your profile');
            console.error('Error update your profile:', error);
        });
}

function displayProfile() {
    const id_employee = sessionStorage.getItem('id_employee');
    fetch(`http://localhost:5501/api/v1/employees/${id_employee}`, {})
        .then(response => response.json())
        .then(data => {
            profile = data;
            document.getElementById('name').value = data.name;
            document.getElementById('email').value = data.email;
            document.getElementById('phone').value = data.phone;
            document.getElementById('address').value = data.address;
            document.getElementById('birthday').value = formatDate(data.birthday);
            document.getElementById('username').value = sessionStorage.getItem('username');
            getRole(data.id_position);
        }
        )
        .catch(error => {
            console.error('Error fetching profile:', error);
        });
}

function getRole(id_position) {
    fetch(`http://localhost:5501/api/v1/position-employees/${id_position}`, {}).
        then(response => response.json()).
        then(data => {
            document.getElementById('position').value = data.name_position;
        }).
        catch(error => { console.error('Error:', error); });

}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function editMode() {
    document.getElementById('viewMode').style.display = 'none';
    document.getElementById('editMode').style.display = 'flex';
    document.getElementById('name').removeAttribute('readonly');
    document.getElementById('email').removeAttribute('readonly');
    document.getElementById('phone').removeAttribute('readonly');
    document.getElementById('address').removeAttribute('readonly');
    document.getElementById('birthday').removeAttribute('readonly');
}

function viewMode() {
    document.getElementById('viewMode').style.display = 'block';
    document.getElementById('editMode').style.display = 'none';
    document.getElementById('name').setAttribute('readonly', true);
    document.getElementById('email').setAttribute('readonly', true);
    document.getElementById('phone').setAttribute('readonly', true);
    document.getElementById('address').setAttribute('readonly', true);
    document.getElementById('birthday').setAttribute('readonly', true);
}