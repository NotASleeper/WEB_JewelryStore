document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('avatar').src = sessionStorage.getItem('url');

    const id = getQueryParam('id');

    (getDetailCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/customers/${id}`, {});
            const data = await response.json();
            console.log(data);
            var date = new Date(data.birthday).toISOString().split('T')[0];
            document.getElementById('name').value = data.name;
            document.getElementById('address').value = data.address;
            document.getElementById('phone').value = data.phone;
            document.getElementById('email').value = data.email;
            document.getElementById('birthday').value = date;
            document.getElementById('loyalty').value = data.loyalty_point;
            document.getElementById('accumulated').value = data.accumulated_point;

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })();

    (getAllCustomerOrder = async () => {
        try {
            const url = `http://localhost:5501/api/v1/order-forms/id-customer/${id}`;
            console.log(url);

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            data.forEach(order => {
                console.log(order.date_created);

                var date = new Date(order.date_created).toISOString().split('T')[0];
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.id = "ID-content";
                idCell.textContent = "OD" + order.id;
                row.appendChild(idCell);

                const contentCell = document.createElement('td');
                contentCell.textContent = "Buy Product";
                row.appendChild(contentCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = date;
                row.appendChild(dateCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = "+" + parseFloat(order.total_price).toLocaleString() + " VND";
                row.appendChild(priceCell);

                const loyaltyCell = document.createElement('td');
                loyaltyCell.textContent = (parseFloat(order.total_price) * 0.01).toLocaleString();
                row.appendChild(loyaltyCell);

                const actionCell = document.createElement('td');
                actionCell.id = "action";
                row.appendChild(actionCell);

                const viewButton = document.createElement('button');
                viewButton.className = "btn";
                viewButton.textContent = "View";
                //viewButton.href = "order-detail.html?id="+ order.id;
                viewButton.addEventListener('click', () => {
                    window.location.href = "order-detail.html?id=" + order.id;
                });
                actionCell.appendChild(viewButton);

                document.querySelector('tbody').appendChild(row);
            })

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})

const updateClick = async () => {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const birthday = document.getElementById('birthday').value;
    const loyalty = document.getElementById('loyalty').value;
    const accumulated = document.getElementById('accumulated').value;
    if (name.trim() === '' ||
        address.trim() === '' ||
        phone.trim() === '' ||
        email.trim() === '' ||
        birthday.trim() === '' ||
        loyalty.trim() === '' ||
        accumulated.trim() === '') {
        alert('Please fill in all required fields');
        return;
    }
    const userConfirmed = confirm('Are you sure you want to update customer?');
    if (!userConfirmed) {
        return;
    }
    updateCustomer(name, address, phone, email, birthday, loyalty, accumulated);
}

const updateCustomer = async (name, address, phone, email, birthday, loyalty, accumulated) => {
    const id = getQueryParam('id');
    const customer = {
        name: name,
        address: address,
        phone: phone,
        email: email,
        birthday: birthday,
        loyalty: loyalty,
        accumulated: accumulated,
    }
    try {
        const response = await fetch(`http://localhost:5501/api/v1/customers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });

        const data = await response.json()
        console.log('Success:');
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const deleteCustomer = async () => {
    const id = getQueryParam('id');
    try {
        const response = await fetch(`http://localhost:5501/api/v1/customers/${id}`, {
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
    const userConfirmed = confirm('Are you sure you want to delete this customer?');
    if (!userConfirmed) {
        return;
    }
    deleteCustomer();
    window.location.href = "customer.html";
}