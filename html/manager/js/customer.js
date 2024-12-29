const getAllCustomer = async () => {
    try {
        const response = await fetch('http://localhost:5501/api/v1/customers/', {});
        const data = await response.json();
        data.forEach(customer => {
            var date = new Date(customer.birthday).toISOString().split('T')[0];
            const markup = `
                    <tr>
                        <td id="ID1">${customer.name}</td>
                        <td id="name">${customer.address}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.email}</td>
                        <td>${date}</td>
                        <td>${customer.loyalty_point}</td>
                        <td id="action"><button class="Edit">Edit</button> <button class="Delete">Delete</button></td>
                    </tr>
                    `;
            document.querySelector('tbody').insertAdjacentHTML('beforeend', markup);
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

