document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('avatar').src = sessionStorage.getItem('url');
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

const createEmployee = async (name, address, phone, email, birthday, img) => {
    const id_position = await getPositionID();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id_position', id_position);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('birthday', birthday);
    formData.append('status', 1);
    formData.append('img', img);
    // const employee = {
    //     name: name,
    //     id_position: id_position,
    //     address: address,
    //     phone: phone,
    //     email: email,
    //     birthday: birthday,
    //     status: 1,
    //     image
    // }

    try {
        const response = await fetch('http://localhost:5501/api/v1/employees/', {
            method: 'POST',
            body: formData
        });

        const data = await response.json()
        console.log('Success:');
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const createAccount = async (id_employee, username) => {
    const account = {
        id_employee: id_employee,
        username: username,
        password: 123,
        status: 1,
    }

    try {
        const response = await fetch(`http://localhost:5501/api/v1/accounts/`, {
            method: 'POST',
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
    const img = document.getElementById('file-input').files[0];

    if (name.trim() === '' ||
        address.trim() === '' ||
        phone.trim() === '' ||
        email.trim() === '' ||
        birthday.trim() === '' ||
        username.trim() === '' ||
        position.trim() === '' ||
        !img) {
        alert('Please fill in all required fields');
        return;
    }

    const userConfirmed = confirm('Are you sure you want to add new employee?');
    if (!userConfirmed) {
        return;
    }

    if (await isAccountExist(username)) {
        alert('Account already exist');
        return;
    }

    const data = await createEmployee(name, address, phone, email, birthday, img);
    console.log(data);

    await createAccount(data.id, username);
    window.location.href = 'employee-info.html?id=' + data.id;
};

const isAccountExist = async (username) => {
    const response = await fetch("http://localhost:5501/api/v1/accounts/");
    const data = await response.json();

    const isExist = await data.some(user => user.username === username);
    return isExist;
}