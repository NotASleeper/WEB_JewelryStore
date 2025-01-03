document.addEventListener('DOMContentLoaded', function () {
    const savedUsername = getCookie('username');
    console.log(savedUsername);

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