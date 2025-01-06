document.addEventListener('DOMContentLoaded', function () {
    const savedUsername = getCookie('username');

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
            document.getElementById('profileAvatar').src = data.Employee.EmployeeImage.url;
            document.getElementById('avatar').src = data.Employee.EmployeeImage.url;

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })();

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
})