const changePasswordPopup = document.getElementById('changePassword-popup');
let oldUsername = "";
let id = "";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('avatar').src = sessionStorage.getItem('url');
    const savedUsername = getCookie('username');
    const cancelChange = document.getElementById('cancelChange');
    const saveChange = document.getElementById('saveChange');

    (getDetailEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/accounts/username/${savedUsername}`, {});
            const data = await response.json();
            console.log(data);
            var date = new Date(data.Employee.birthday).toISOString().split('T')[0];
            document.getElementById('name').value = data.Employee.name;
            document.getElementById('address').value = data.Employee.address;
            document.getElementById('phone').value = data.Employee.phone;
            document.getElementById('email').value = data.Employee.email;
            document.getElementById('birthday').value = date;
            document.getElementById('position').value = data.Employee.PositionEmployee.name_position;
            document.getElementById('username').value = data.username;
            document.getElementById('preview').src = data.Employee.EmployeeImage.url;
            id = data.Employee.id;
            oldUsername = data.username;

            document.getElementById('avatar').src = sessionStorage.getItem('url');
            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })();

    (getAllPosition = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/position-employees/`, {});
            const data = await response.json();

            data.forEach(position => {
                const detailList = document.getElementById('positionList');
                const option = document.createElement('option');
                option.value = position.name_position;
                detailList.appendChild(option);
            });

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    document.getElementById('changePassword').addEventListener('click', function () {
        document.getElementById('oldPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        changePasswordPopup.style.display = '';
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

const getPositionID = async () => {
    const response = await fetch(`http://localhost:5501/api/v1/position-employees/`, {});
    const data = await response.json();

    const input = document.getElementById('position').value;
    const selectedItem = data.find(item => item.name_position === input);

    if (selectedItem) {
        console.log(selectedItem.id);

        return selectedItem.id;
    }
}

const updateEmployee = async (name, address, phone, email, birthday, img) => {
    const id_position = await getPositionID();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id_position', id_position);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('birthday', birthday);
    formData.append('img', img);
    // const employee = {
    //     name: name,
    //     id_position: id_position,
    //     address: address,
    //     phone: phone,
    //     email: email,
    //     birthday: birthday,
    // }

    try {
        const response = await fetch(`http://localhost:5501/api/v1/employees/${id}`, {
            method: 'PUT',
            body: formData
        });

        const data = await response.json();
        console.log(data);

        sessionStorage.setItem('url', data.employeeImage.url)
        console.log(sessionStorage.getItem('url'));

        console.log('Success:');
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const updateAccount = async (username) => {
    const account = {
        username: username,
    }

    try {
        const response = await fetch(`http://localhost:5501/api/v1/accounts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
        console.log('Success:');
    } catch (error) {
        console.error('Error:', error);
    }
}

const saveClick = async () => {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const birthday = document.getElementById('birthday').value;
    const username = document.getElementById('username').value;
    const position = document.getElementById('position').value;
    const img = document.getElementById('file-input').files[0];
    console.log(img);


    if (name.trim() === '' ||
        address.trim() === '' ||
        phone.trim() === '' ||
        email.trim() === '' ||
        birthday.trim() === '' ||
        username.trim() === '' ||
        position.trim() === '') {
        alert('Please fill in all required fields');
        return;
    }

    const userConfirmed = confirm('Are you sure you want to update your information?');
    if (!userConfirmed) {
        return;
    }

    if (oldUsername != username) {
        if (await isAccountExist(username)) {
            alert('Account already exist');
            return;
        }
        await updateAccount(username);
    }

    const data = await updateEmployee(name, address, phone, email, birthday, img);

    location.reload();
}

const isAccountExist = async (username) => {
    const response = await fetch("http://localhost:5501/api/v1/accounts/");
    const data = await response.json();

    const isExist = await data.some(user => user.username === username);
    return isExist;
}