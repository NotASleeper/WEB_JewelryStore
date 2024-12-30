document.addEventListener('DOMContentLoaded', function () {
    const loginform = document.getElementById('login_form');
    const errorMessage = document.getElementById('error');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const checlbox = document.getElementById('checkbox');

    const savedUsername = getCookie('username');
    const savedPassword = getCookie('password');
    if (savedUsername && savedPassword) {
        usernameInput.value = savedUsername;
        passwordInput.value = savedPassword;
    }

    loginform.addEventListener('submit', function (event) {

        event.preventDefault();
        const loginData = {
            username: username.value,
            password: password.value
        };

        fetch('http://localhost:5501/api/v1/accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Login response:', data);
                if (data) {
                    if (checlbox.checked) {
                        setCookie('username', username.value, 7);
                        setCookie('password', password.value, 7);
                    }
                    else {
                        setCookie('username', '', -1);
                        setCookie('password', '', -1);
                    }
                    sessionStorage.setItem('username', username.value);
                    sessionStorage.setItem('id_employee', data.id_employee);
                    sessionStorage.setItem('token', data.token);
                    fetch(`http://localhost:5501/api/v1/employees/${data.id_employee}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log('Staff:', data);
                            switch (data.id_position) {
                                case 1:
                                    window.location.href = '/admin';
                                    break;
                                case 2:
                                    window.location.href = '/sale';
                                    break;
                                case 3:
                                    window.location.href = '/warehouse';
                                    break;
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching staff:', error);
                        });
                }
                else {
                    errorMessage.style.display = '';
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                errorMessage.style.display = '';
            });
    });
    username.addEventListener('input', function () {
        errorMessage.style.display = 'none';
    });
    password.addEventListener('input', function () {
        errorMessage.style.display = 'none';
    });
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
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


});