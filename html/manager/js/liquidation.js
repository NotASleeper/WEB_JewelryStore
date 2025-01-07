document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('avatar').src = sessionStorage.getItem('url');
    getAllLiquidationForm("");
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

document.getElementById('dateInput').addEventListener('change', (event) => {
    console.log('Date changed to:', event.target.value);
    getAllLiquidationForm(event.target.value);
});

const getAllLiquidationForm = async (datePicked) => {
    clearTbody();
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const employee = urlParams.get('employee');
        const url = "http://localhost:5501/api/v1/liquidation-forms" + (employee ? `?employee=${employee}` : "");

        const response = await fetch(url);
        const data = await response.json();
        data.forEach(liquidationForm => {
            var date = new Date(liquidationForm.date_created).toISOString().split('T')[0];
            if (datePicked == "" || date == datePicked) {
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
                priceCell.textContent = "+" + parseFloat(liquidationForm.total_price).toLocaleString() + " VND";
                row.appendChild(priceCell);

                const imgCell = document.createElement('td');
                imgCell.id = "state";
                const button = document.createElement('button');
                button.className = "btn";
                const img = document.createElement('img');
                if (liquidationForm.id_employee_accepted == null) {
                    img.src = "./assets/loading.png";
                } else if (liquidationForm.id_employee_accepted != null && liquidationForm.date_accepted == null) {
                    img.src = "./assets/denied_ic.png";
                } else if (liquidationForm.id_employee_accepted != null && liquidationForm.date_accepted != null) {
                    img.src = "./assets/accepted_ic.png";
                }
                button.appendChild(img);
                imgCell.appendChild(button);
                row.appendChild(imgCell);

                const actionCell = document.createElement('td');
                actionCell.id = "action";

                const viewButton = document.createElement('button');
                viewButton.addEventListener('click', () => {
                    window.location.href = 'liquidation-detail.html?id=' + liquidationForm.id;
                })
                viewButton.textContent = 'View';
                //viewButton.href = "liquidation-detail.html?id=" + liquidationForm.id;
                actionCell.appendChild(viewButton);

                // const deleteButton = document.createElement('button');
                // deleteButton.className = 'Delete';
                // deleteButton.textContent = 'Delete';
                // actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                document.querySelector('tbody').appendChild(row);
            }
        })

        console.log("Succeeded");
    } catch (error) {
        console.error(error);
    }
}

const clearTbody = () => {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
};

const exportTableToPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Liquidation Table", 20, 20);

    const table = document.querySelector("table");
    const rows = [];
    const headers = [];

    table.querySelectorAll("thead th").forEach((header, index, headerArr) => {
        if (index < headerArr.length - 2) {
            headers.push(header.textContent);
        }
    });

    table.querySelectorAll("tbody tr").forEach(row => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell, index, cellArr) => {
            if (index < cellArr.length - 2) {
                rowData.push(cell.textContent);
            }
        });
        rows.push(rowData);
    });

    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
        styles: { cellWidth: 'wrap' },
        headStyles: { overflow: 'linebreak' },
    });

    doc.save("liquidation_table.pdf");
};