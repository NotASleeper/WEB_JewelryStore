const getAllCustomer = async () => {
    try {
        const response = await fetch('http://localhost:5501/api/v1/customers');
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

const getDetailCustomer = async (id) => {
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
}

