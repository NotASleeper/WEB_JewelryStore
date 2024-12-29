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

document.addEventListener('DOMContentLoaded', getAllCustomer)

// fetch('http://localhost:5501/api/v1/customers/', {})
//     .then(res => {
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
//         data.forEach(customer => {
//             var date = new Date(customer.birthday).toISOString().split('T')[0]

//             const markup = `
//                 <tr>
//                     <td id="ID1">${customer.name}</td>
//                     <td id="name">${customer.address}</td>
//                     <td>${customer.phone}</td>
//                     <td>${customer.email}</td>
//                     <td>${date}</td>
//                     <td>${customer.loyalty_point}</td>
//                     <td id="action"><button class="Edit">Edit</button> <button class="Delete">Delete</button></td>
//                 </tr>
//                 `;
//             document.querySelector('tbody').insertAdjacentHTML('beforeend', markup);
//         });
//     })
//     .catch(error => console.log(error));