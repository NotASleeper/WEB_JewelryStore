if (typeof customers === 'undefined') {
    var customers = [];
}

let sortOrder = 'none';

document.addEventListener('DOMContentLoaded', function () {
    const logoutPopup = document.getElementById('logout_popup');
    const deletePopup = document.getElementById('delete_popup');
    const cancelButton = document.getElementById('cancelButton');
    const confirmButton = document.getElementById('confirmButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const searchInput = document.getElementById('searchInfo');
    fetchCustomers();

    document.getElementById('logout-ic').addEventListener('click', function () {
        logoutPopup.style.display = '';
    });

    cancelButton.addEventListener('click', function () {
        logoutPopup.style.display = 'none';
    });

    confirmButton.addEventListener('click', function () {
        // Thực hiện hành động đăng xuất, ví dụ: chuyển hướng đến trang đăng nhập
        window.location.href = '../manager/login.html';
    });

    cancelDeleteButton.addEventListener('click', function () {
        deletePopup.style.display = 'none';
    });

    confirmDeleteButton.addEventListener('click', function () {
        const customerId = deletePopup.getAttribute('data-customer-id');
        deleteCustomer(customerId);
        deletePopup.style.display = 'none';
    });

    document.getElementById('searchic').addEventListener('click', function () {
        const search = searchInput.value.toLowerCase(); 
        filterCustomers(search);
    });

    searchInput.addEventListener('keydown', function (event) {
        const search = searchInput.value.toLowerCase();
        if (event.key === 'Enter') {
            filterCustomers(search);
        }
        else if (search === '') {
            displayCustomers(customers);
        }
    });

    document.getElementById('arrange').addEventListener('click', function (){
        if (sortOrder !== 'asc') {sortOrder = 'asc';}
        else {sortOrder = 'desc';}
        sortCustomersByLoyalty();
    });
});

function filterCustomers(search) {
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(search) ||
        customer.phone.includes(search)
    );
    displayCustomers(filteredCustomers);
}

function fetchCustomers() {
    fetch('http://localhost:5501/api/v1/customers')
        .then(response => response.json())
        .then(data => {
            customers = data;
            displayCustomers(data);
        })
        .catch(error => {
            console.error('Error fetching customers:', error);
        });
}

function displayCustomers(customers) {
    const customerList = document.getElementById('customerList');
    const template = document.getElementById('customer').content;

    customerList.innerHTML = ''; // Clear existing rows

    customers.forEach(customer => {
        const clone = document.importNode(template, true);
        clone.getElementById('name').textContent = customer.name;
        clone.getElementById('address').textContent = customer.address;
        clone.getElementById('phone').textContent = customer.phone;
        clone.getElementById('email').textContent = customer.email;
        clone.getElementById('birthday').textContent = customer.birthday;
        clone.getElementById('loyalty').textContent = customer.loyalty;

        // Add event listeners for Edit and Delete buttons
        clone.getElementById('editButton').addEventListener('click',function () {
            window.location.href = `/sale/customerinfo?id=${customerId}`;
        });
        clone.getElementById('deleteButton').addEventListener('click', function () {
            deletePopup.style.display = '';
            deletePopup.setAttribute('data-customer-id', customer.id);
        });

        customerList.appendChild(clone);
    });
}

function sortCustomersByLoyalty() {
    const sortedCustomers = [...customers].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.loyalty - b.loyalty;
        } else {
            return b.loyalty - a.loyalty;
        }
    });
    displayCustomers(sortedCustomers);
}

function deleteCustomer(customerId) {
    // Xử lý chỉnh sửa khách hàng ở đây

    console.log('Delete customer with ID:', customerId);
    fetch(`http://localhost:5501/api/v1/customers/${customerId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                fetchCustomers(); // Refresh the customer list
            } else {
                console.error('Failed to delete customer');
            }
        })
        .catch(error => {
            console.error('Error deleting customer:', error);
        });
}

function redirectToNewPage(newPage) {
    window.location.href = newPage;
}
