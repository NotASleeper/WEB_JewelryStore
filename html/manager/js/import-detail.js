document.addEventListener('DOMContentLoaded', function () {
    const id = getQueryParam('id');

    (getDetailImport = async () => {
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
            const url = `http://localhost:5501/api/v1/import-details/form/${id}`;
            console.log(url);

            let total = 0;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            data.forEach(importDetail => {
                console.log(importDetail.date_created);
                total += parseFloat(importDetail.total);
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.id = "ID";
                idCell.textContent = importDetail.id_product;
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.id = "name";
                nameCell.textContent = importDetail.Product.name;
                row.appendChild(nameCell);

                const imgCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = "./assets/product1.jpg";
                img.alt = "Product image";
                imgCell.appendChild(img);
                row.appendChild(imgCell);

                const categoryCell = document.createElement('td');
                categoryCell.textContent = importDetail.Product.ProductCategory.name;
                row.appendChild(categoryCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = parseFloat(importDetail.price).toLocaleString() + " VND";
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = importDetail.quantity;
                row.appendChild(quantityCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = "-" + parseFloat(importDetail.total).toLocaleString() + " VND";
                row.appendChild(totalCell);

                document.querySelector('tbody').appendChild(row);
                document.getElementById('total').innerText = "Total: -" + total.toLocaleString() + " VND";
            })

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})