document.addEventListener('DOMContentLoaded', function () {
    const id = getQueryParam('id');

    (getDetailLiquidation = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1//liquidation-forms/${id}`, {});
            const data = await response.json();
            console.log(data);
            var date_created = new Date(data.date_created).toISOString().split('T')[0];
            var date_accepted = new Date(data.date_accepted).toISOString().split('T')[0];
            document.getElementById('id').value = data.id;
            document.getElementById('creator').value = data.create.name;
            document.getElementById('inspector').value = data.accept.name;
            document.getElementById('date-created').value = date_created;
            document.getElementById('date-accepted').value = date_accepted;
            document.getElementById('state').value = "";

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
                priceCell.textContent = liquidationDetail.price_down;
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = liquidationDetail.quantity;
                row.appendChild(quantityCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = liquidationDetail.total;
                row.appendChild(totalCell);

                document.querySelector('tbody').appendChild(row);
            })

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})