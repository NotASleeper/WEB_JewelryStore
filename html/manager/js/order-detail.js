document.addEventListener('DOMContentLoaded', function () {
    const id = getQueryParam('id');

    (getDetailOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/order-forms/${id}`, {});
            const data = await response.json();
            console.log(data);
            var date_created = new Date(data.date_created).toISOString().split('T')[0];
            var date_payment = new Date(data.date_payment).toISOString().split('T')[0];
            document.getElementById('id').value = data.id;
            document.getElementById('employee').value = data.Employee.name;
            document.getElementById('customer').value = data.Customer.name;
            document.getElementById('created').value = date_created;
            document.getElementById('payment').value = date_payment;
            document.getElementById('coupon').value = "";

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })();

    (getAllOrderDetail = async () => {
        try {
            const url = `http://localhost:5501/api/v1/order-details/form/${id}`;
            console.log(url);

            let total = 0;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            data.forEach(ordertDetail => {
                console.log(ordertDetail.date_created);
                total += parseFloat(ordertDetail.total);
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.id = "ID";
                idCell.textContent = ordertDetail.id_product;
                row.appendChild(idCell);

                const requestCell = document.createElement('td');
                requestCell.textContent = ordertDetail.request;
                row.appendChild(requestCell);

                const nameCell = document.createElement('td');
                nameCell.id = "name";
                nameCell.textContent = ordertDetail.Product.name;
                row.appendChild(nameCell);

                const imgCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = "./assets/product1.jpg";
                img.alt = "Product image";
                imgCell.appendChild(img);
                row.appendChild(imgCell);

                const categoryCell = document.createElement('td');
                categoryCell.textContent = ordertDetail.Product.ProductCategory.name;
                row.appendChild(categoryCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = parseFloat(ordertDetail.surcharge).toLocaleString() + " VND";
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = ordertDetail.quantity;
                row.appendChild(quantityCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = parseFloat(ordertDetail.total).toLocaleString() + " VND";
                row.appendChild(totalCell);

                document.querySelector('tbody').appendChild(row);
                document.getElementById('total').innerText = "Total: " + total.toLocaleString() + " VND";
            })

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})