document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('avatar').src = sessionStorage.getItem('url');
    const id = getQueryParam('id');

    (getDetailLiquidation = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/liquidation-forms/${id}`, {});
            const data = await response.json();
            console.log(data);
            var date_created = new Date(data.date_created).toISOString().split('T')[0];
            if (data.id_employee_accepted == null) {
                var date_accepted = "";
                document.getElementById('inspector').value = "";
                document.getElementById('state').value = "Waiting";
                document.getElementById('cancel').innerText = "Deny";
            } else if (data.id_employee_accepted != null && data.date_accepted == null) {
                var date_accepted = "";
                document.getElementById('inspector').value = data.accept.name;
                document.getElementById('state').value = "Denied";
                document.getElementById('accept').remove();
            } else if (data.id_employee_accepted != null && data.date_accepted != null) {
                var date_accepted = new Date(data.date_accepted).toISOString().split('T')[0];
                document.getElementById('inspector').value = data.accept.name;
                document.getElementById('state').value = "Accepted";
                document.getElementById('accept').remove();
            }
            document.getElementById('id').value = data.id;
            document.getElementById('creator').value = data.create.name;
            document.getElementById('date-created').value = date_created;
            document.getElementById('date-accepted').value = date_accepted;

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })();

    (getAllLiquidationDetail = async () => {
        try {
            const url = `http://localhost:5501/api/v1/liquidation-details/form/${id}`;
            console.log(url);

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            let total = 0;

            data.forEach(liquidationDetail => {

                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.id = "ID";
                idCell.textContent = liquidationDetail.id_product;
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.id = "name";
                nameCell.textContent = liquidationDetail.Product.name;
                row.appendChild(nameCell);

                const imgCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = "./assets/product1.jpg";
                img.alt = "Product image";
                imgCell.appendChild(img);
                row.appendChild(imgCell);

                const categoryCell = document.createElement('td');
                categoryCell.textContent = liquidationDetail.Product.ProductCategory.name;
                row.appendChild(categoryCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = parseFloat(liquidationDetail.price_down).toLocaleString() + " VND";
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = liquidationDetail.quantity;
                row.appendChild(quantityCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = "+" + parseFloat(liquidationDetail.total).toLocaleString() + " VND";
                row.appendChild(totalCell);

                document.querySelector('tbody').appendChild(row);
                total += liquidationDetail.total;
            })
            document.getElementById('total').innerText = "Total: +" + total.toLocaleString() + " VND";
            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})

const acceptClick = async () => {
    const id = getQueryParam('id');
    const userConfirmed = confirm('Are you sure you want to accept this form?');
    if (!userConfirmed) {
        return;
    }
    const now = new Date();
    const isoString = now.toISOString();
    const accept = {
        id_employee_accepted: sessionStorage.getItem('idAccount'),
        date_accepted: isoString,
    }
    console.log(JSON.stringify(accept));

    try {
        const response = await fetch(`http://localhost:5501/api/v1/liquidation-forms/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accept)
        });

        const data = await response.json()
        await acceptForm();
        console.log('Success:');
        location.reload();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const acceptForm = async () => {
    const id = getQueryParam('id');
    const url = `http://localhost:5501/api/v1/liquidation-details/form/${id}`;
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    data.forEach(async liquidationDetail => {
        const currentQuantity = liquidationDetail.Product.Inventory.quantity;
        const newQuantity = currentQuantity - liquidationDetail.quantity;
        const id = liquidationDetail.id_product;
        const quantity = {
            quantity: newQuantity,
        }
        console.log(quantity);

        try {
            const response = await fetch(`http://localhost:5501/api/v1/inventories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quantity)
            });

            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    })
}

const denyForm = async () => {
    const id = getQueryParam('id');
    const userConfirmed = confirm('Are you sure you want to deny this form?');
    if (!userConfirmed) {
        return;
    }
    const deny = {
        id_employee_accepted: sessionStorage.getItem('idAccount'),
    }
    console.log(JSON.stringify(deny));

    try {
        const response = await fetch(`http://localhost:5501/api/v1/liquidation-forms/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deny)
        });

        const data = await response.json()
        console.log('Success:');
        location.reload();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const cancelClick = async () => {
    if (document.getElementById('cancel').innerText == "Deny") {
        await denyForm()
    } else if (document.getElementById('cancel').innerText == "Cancel") {
        location.reload();
        history.back();
    }
}