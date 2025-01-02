document.addEventListener('DOMContentLoaded', function () {
    (getAllImportForm = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const supplier = urlParams.get('supplier');
            const url = "http://localhost:5501/api/v1/import-forms" + (supplier ? `?supplier=${supplier}` : "");

            const response = await fetch(url);
            const data = await response.json();
            data.forEach(importForm => {
                var date = new Date(importForm.date_created).toISOString().split('T')[0];
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.id = "ID-content";
                idCell.textContent = importForm.id;
                row.appendChild(idCell);

                const supplierCell = document.createElement('td');
                supplierCell.textContent = importForm.Supplier.name;
                row.appendChild(supplierCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = date;
                row.appendChild(dateCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = "-" + parseFloat(importForm.total_price).toLocaleString() + "VND";
                row.appendChild(priceCell);

                const imgCell = document.createElement('td');
                imgCell.id = "state";
                const button = document.createElement('button');
                button.className = "btn"
                const img = document.createElement('img');
                img.src = "./assets/loading.png";
                button.appendChild(img);
                imgCell.appendChild(button);
                row.appendChild(imgCell);

                const actionCell = document.createElement('td');
                actionCell.id = "action";

                const viewButton = document.createElement('button');
                viewButton.addEventListener('click', () => {
                    window.location.href = 'import-detail.html?id=' + importForm.id;
                })
                viewButton.textContent = 'View';
                //viewButton.href = "import-detail.html?id=" + importForm.id;
                actionCell.appendChild(viewButton);

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
})

document.getElementById('search').addEventListener('click', () => {
    const input = document.getElementById('supplierName').value;
    if (input) {
        const url = `http://localhost:5501/admin/import.html?supplier=${encodeURIComponent(input)}`;
        window.location.href = url;
    } else {
        const url = `http://localhost:5501/admin/import.html`;
        window.location.href = url;
    }
});

document.getElementById('supplierName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('supplierName').value;
        if (input) {
            const url = `http://localhost:5501/admin/import.html?supplier=${encodeURIComponent(input)}`;
            window.location.href = url;
        } else {
            const url = `http://localhost:5501/admin/import.html`;
            window.location.href = url;
        }
    }
});
