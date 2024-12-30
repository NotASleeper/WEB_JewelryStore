const getAllCustomer = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const url = "http://localhost:5501/api/v1/customers" + (name ? `?name=${name}` : "");

        const response = await fetch(url);
        const data = await response.json();
        data.forEach(customer => {
            var date = new Date(customer.birthday).toISOString().split('T')[0];
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.id = "ID1";
            nameCell.textContent = customer.name;
            row.appendChild(nameCell);

            const addressCell = document.createElement('td');
            addressCell.id = "name";
            addressCell.textContent = customer.address;
            row.appendChild(addressCell);

            const phoneCell = document.createElement('td');
            phoneCell.textContent = customer.phone;
            row.appendChild(phoneCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = customer.email;
            row.appendChild(emailCell);

            const birthdayCell = document.createElement('td');
            birthdayCell.textContent = date;
            row.appendChild(birthdayCell);

            const loyaltyCell = document.createElement('td');
            loyaltyCell.textContent = customer.loyalty_point;
            row.appendChild(loyaltyCell);

            const actionCell = document.createElement('td');
            actionCell.id = "action";

            const editButton = document.createElement('button');
            editButton.className = 'Edit';
            editButton.textContent = 'Info';
            editButton.addEventListener('click', () => {
                window.location.href = "customer-info.html?id=" + customer.id;
            })
            actionCell.appendChild(editButton);

            // const deleteButton = document.createElement('button');
            // deleteButton.className = 'Delete';
            // deleteButton.textContent = 'Delete';
            // actionCell.appendChild(deleteButton);

            row.appendChild(actionCell);

            document.querySelector('tbody').appendChild(row);
        })

        console.log("Succeeded");
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('search').addEventListener('click', () => {
    const input = document.getElementById('customerName').value;
    const url = `http://localhost:5501/admin/customer.html?name=${encodeURIComponent(input)}`;
    window.location.href = url;
});

document.getElementById('customerName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('customerName').value;
        const url = `http://localhost:5501/admin/customer.html?name=${encodeURIComponent(input)}`;
        window.location.href = url;
    }
});
