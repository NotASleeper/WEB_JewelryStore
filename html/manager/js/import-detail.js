document.addEventListener('DOMContentLoaded', function () {
    const id = getQueryParam('id');

    (getDetailCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1//import-forms/${id}`, {});
            const data = await response.json();
            console.log(data);
            var date = new Date(data.date_created).toISOString().split('T')[0];
            document.getElementById('id').value = data.id;
            document.getElementById('supplier').value = data.Supplier.name;
            document.getElementById('employee').value = data.Employee.name;
            document.getElementById('created').value = date;
            document.getElementById('accepted').value = "";
            document.getElementById('state').value = "";

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })();

    (getAllImportDetail = async () => {
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
                priceCell.textContent = "+" + parseFloat(order.total_price).toLocaleString();
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
                actionCell.appendChild(viewButton);

                document.querySelector('tbody').appendChild(row);
            })

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})