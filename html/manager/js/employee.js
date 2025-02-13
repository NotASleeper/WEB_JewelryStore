document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("avatar").src = sessionStorage.getItem("url");
  (getAllEmployee = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get("name");
      const url =
        "http://localhost:5501/api/v1/employees" +
        (name ? `?name=${name}` : "");

      const response = await fetch(url);
      const data = await response.json();
      let sum = 0;
      data.forEach((employee) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.id = "ID1";
        nameCell.textContent = employee.name;
        row.appendChild(nameCell);

        const imgCell = document.createElement("td");
        const img = document.createElement("img");
        if (!employee.EmployeeImage) {
          img.src = 'https://res.cloudinary.com/djf63iwha/image/upload/v1736245616/STORE/tdeqhzrfjbktbuanbmvm.jpg';
        } else {
          img.src = employee.EmployeeImage.url;
        }
        img.alt = "Employee image";
        imgCell.appendChild(img);
        row.appendChild(imgCell);

        const addressCell = document.createElement("td");
        addressCell.id = "name";
        addressCell.textContent = employee.address;
        row.appendChild(addressCell);

        const phoneCell = document.createElement("td");
        phoneCell.textContent = employee.phone;
        row.appendChild(phoneCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = employee.email;
        row.appendChild(emailCell);

        const positionCell = document.createElement("td");
        positionCell.textContent = employee.PositionEmployee.name_position;
        row.appendChild(positionCell);

        const accountCell = document.createElement("td");
        accountCell.textContent = employee.Account.username;
        row.appendChild(accountCell);

        // const kpiCell = document.createElement('td');
        // kpiCell.textContent = "80%";
        // row.appendChild(kpiCell);

        const actionCell = document.createElement("td");
        actionCell.id = "action";

        const editButton = document.createElement("button");
        editButton.className = "Edit";
        editButton.textContent = "View";
        editButton.addEventListener("click", () => {
          window.location.href = "employee-info.html?id=" + employee.id;
        });
        actionCell.appendChild(editButton);

        // const deleteButton = document.createElement('button');
        // deleteButton.className = 'Delete';
        // deleteButton.textContent = 'Delete';
        // actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        document.querySelector("tbody").appendChild(row);
        sum += 1;
      });
      document.getElementById("sum").innerText = "Sum: " + sum;
      console.log("Succeeded");
    } catch (error) {
      console.error(error);
    }
  })();
});

document.getElementById("search").addEventListener("click", () => {
  const input = document.getElementById("employeeName").value;
  if (input) {
    const url = `http://localhost:5501/admin/employee.html?name=${encodeURIComponent(
      input
    )}`;
    window.location.href = url;
  } else {
    const url = `http://localhost:5501/admin/employee.html`;
    window.location.href = url;
  }
});

document
  .getElementById("employeeName")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const input = document.getElementById("employeeName").value;
      if (input) {
        const url = `http://localhost:5501/admin/employee.html?name=${encodeURIComponent(
          input
        )}`;
        window.location.href = url;
      } else {
        const url = `http://localhost:5501/admin/employee.html`;
        window.location.href = url;
      }
    }
  });

const exportTableToPDF = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "landscape",
  });

  doc.text("EmployeeEmployee Table", 20, 20);

  const table = document.querySelector("table");
  const rows = [];
  const headers = [];

  table.querySelectorAll("thead th").forEach((header, index, headerArr) => {
    if (index !== 1 && index < headerArr.length - 1) {
      headers.push(header.textContent);
    }
  });

  table.querySelectorAll("tbody tr").forEach((row) => {
    const rowData = [];
    row.querySelectorAll("td").forEach((cell, index, cellArr) => {
      if (index !== 1 && index < cellArr.length - 1) {
        rowData.push(cell.textContent);
      }
    });
    rows.push(rowData);
  });

  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 30,
    tableWidth: "wrap",
    styles: { cellWidth: "wrap" },
    headStyles: { overflow: "linebreak" },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 60 },
      2: { cellWidth: 40 },
      3: { cellWidth: 60 },
      4: { cellWidth: 40 },
    },
  });

  doc.save("employee_table.pdf");
};
