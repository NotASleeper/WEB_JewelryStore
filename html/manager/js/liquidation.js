document.addEventListener('DOMContentLoaded', function () {
    (getAllLiquidationForm = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const employee = urlParams.get('employee');
            const url = "http://localhost:5501/api/v1/liquidation-forms" + (employee ? `?employee=${employee}` : "");

            const response = await fetch(url);
            const data = await response.json();
            data.forEach(liquidationForm => {
                var date = new Date(liquidationForm.date_created).toISOString().split('T')[0];
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.id = "ID-content";
                idCell.textContent = liquidationForm.id;
                row.appendChild(idCell);

                const employeeCell = document.createElement('td');
                employeeCell.textContent = liquidationForm.create.name;
                row.appendChild(employeeCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = date;
                row.appendChild(dateCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = parseFloat(liquidationForm.total_price).toLocaleString() + " VND";
                row.appendChild(priceCell);

                const imgCell = document.createElement('td');
                imgCell.id = "state";
                const button = document.createElement('button');
                button.className = "btn";
                const img = document.createElement('img');
                img.src = "./assets/loading.png";
                button.appendChild(img);
                imgCell.appendChild(button);
                row.appendChild(imgCell);

                const actionCell = document.createElement('td');
                actionCell.id = "action";

                const viewButton = document.createElement('a');
                viewButton.className = "btn";
                //viewButton.style = "font-weight: 600";
                viewButton.textContent = 'View';
                viewButton.href = "liquidation-detail.html?id=" + liquidationForm.id;
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
    const input = document.getElementById('employeeName').value;
    if (input) {
        const url = `http://localhost:5501/admin/liquidation.html?employee=${encodeURIComponent(input)}`;
        window.location.href = url;
    } else {
        const url = `http://localhost:5501/admin/liquidation.html`;
        window.location.href = url;
    }
});

document.getElementById('employeeName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('employeeName').value;
        if (input) {
            const url = `http://localhost:5501/admin/liquidation.html?employee=${encodeURIComponent(input)}`;
            window.location.href = url;
        } else {
            const url = `http://localhost:5501/admin/liquidation.html`;
            window.location.href = url;
        }
    }
});
