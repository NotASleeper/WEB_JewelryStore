document.addEventListener('DOMContentLoaded', function () {
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

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })();
})

document.getElementById('edit').addEventListener('click', () => {
    const id = getQueryParam('id');
    window.location.href = "http://localhost:5501/admin/update-employee-info.html?id=" + id;
})

const deleteEmployee = async () => {
    const id = getQueryParam('id');
    try {
        const response = await fetch(`http://localhost:5501/api/v1/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log('Success:');
    } catch (error) {
        console.error('Error:', error);
    }
}

const deleteAccount = async () => {
    const id = getQueryParam('id');
    try {
        const response = await fetch(`http://localhost:5501/api/v1/accounts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log('Success:');
    } catch (error) {
        console.error('Error:', error);
    }
}

const deleteClick = () => {
    const userConfirmed = confirm('Are you sure you want to delete this employee?');
    if (!userConfirmed) {
        return;
    }
    deleteEmployee();
    deleteAccount();
    window.location.href = "employee.html";
}