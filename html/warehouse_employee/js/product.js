document.addEventListener('DOMContentLoaded', function () {
    (getAllProduct = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('name');
            const url = "http://localhost:5501/api/v1/products/" + (name ? `?name=${name}` : "");

            const response = await fetch(url);
            const data = await response.json();
            data.forEach(product => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.id = "ID";
                idCell.textContent = product.id;
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.id = "name";
                nameCell.textContent = product.name;
                row.appendChild(nameCell);

                const imgCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = "./assets/images/product1.jpg";
                img.alt = "Product image";
                imgCell.appendChild(img);
                row.appendChild(imgCell);

                const categoryCell = document.createElement('td');
                categoryCell.textContent = product.ProductCategory.name;
                row.appendChild(categoryCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = parseFloat(product.price).toLocaleString() + " VND";
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = (product.Inventory.quantity ? product.Inventory.quantity : "0");
                row.appendChild(quantityCell);

                const actionCell = document.createElement('td');
                actionCell.id = "action";

                const editButton = document.createElement('button');
                editButton.className = 'View';
                editButton.textContent = 'View';
                editButton.addEventListener('click', () => {
                    window.location.href = "product_info.html?id=" + product.id;
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
    })()
});

// document.getElementById('search').addEventListener('click', () => {
//     const input = document.getElementById('productName').value;
//     if (input) {
//         const url = `http://localhost:5501/admin/product.html?name=${encodeURIComponent(input)}`;
//         window.location.href = url;
//     } else {
//         const url = `http://localhost:5501/admin/product.html`;
//         window.location.href = url;
//     }
// });

document.getElementById('productName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('productName').value;
        if (input) {
            const url = `http://localhost:5501/warehouse/product.html?name=${encodeURIComponent(input)}`;
            window.location.href = url;
        } else {
            const url = `http://localhost:5501/warehouse/product.html`;
            window.location.href = url;
        }
    }
});