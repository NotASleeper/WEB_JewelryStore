let oldUsername = "";
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('avatar').src = sessionStorage.getItem('url');
    const id = getQueryParam('id');

    (getDetailEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/employees/${id}`, {});
            const data = await response.json();
            console.log(data);
            var date = new Date(data.birthday).toISOString().split('T')[0];
            document.getElementById('name').value = data.name;
            document.getElementById('address').value = data.address;
            document.getElementById('phone').value = data.phone;
            document.getElementById('email').value = data.email;
            document.getElementById('birthday').value = date;
            document.getElementById('position').value = data.PositionEmployee.name_position;
            document.getElementById('account').value = data.Account.username;
            oldUsername = data.Account.username;

            if (!data.EmployeeImage) {
                document.getElementById('preview').src = "https://res.cloudinary.com/djf63iwha/image/upload/v1736245616/STORE/tdeqhzrfjbktbuanbmvm.jpg"
            } else {
                document.getElementById('preview').src = data.EmployeeImage.url;
            }
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
})

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

const updateEmployee = async (name, address, phone, email, birthday) => {
    const id = getQueryParam('id');
    const id_position = await getPositionID();
    const employee = {
        name: name,
        id_position: id_position,
        address: address,
        phone: phone,
        email: email,
        birthday: birthday,
    }

    try {
        const response = await fetch(`http://localhost:5501/api/v1/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        const data = await response.json()
        console.log('Success:');
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const updateAccount = async (username) => {
    const id = getQueryParam('id');
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
    const username = document.getElementById('account').value;
    const position = document.getElementById('position').value;

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

    const userConfirmed = confirm('Are you sure you want to update this employee?');
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

    const data = await updateEmployee(name, address, phone, email, birthday);

    //window.location.href = 'employee-info.html?id=' + data.id;
}

const isAccountExist = async (username) => {
    const response = await fetch("http://localhost:5501/api/v1/accounts/");
    const data = await response.json();

    const isExist = await data.some(user => user.username === username);
    return isExist;
}

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