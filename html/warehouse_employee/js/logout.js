const logoutPopup = document.getElementById('logout_popup');
const cancelButton = document.getElementById('cancelButton');
const confirmButton = document.getElementById('confirmButton');
document.getElementById('avt').src = sessionStorage.getItem('url');
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
    sessionStorage.removeItem('idAccount');

    window.location.href = '/logout';
});