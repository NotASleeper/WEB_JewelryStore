let listImportForm = [];
const deletePopup = document.getElementById("delete_popup");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("avatar").src = sessionStorage.getItem("url");
  getAllImportForm();

  const filterPopup = document.getElementById("filterList");
  const filterBtn = document.getElementById("filterBT");
  filterBtn.addEventListener("click", function () {
    if (filterPopup.style.display === "none") {
      filterPopup.style.display = "";
    } else {
      filterPopup.style.display = "none";
    }
  });

  document.getElementById("from").addEventListener("change", function () {
    filterImport();
  });

  document.getElementById("to").addEventListener("change", function () {
    filterImport();
  });

  cancelDeleteButton.addEventListener("click", function () {
    deletePopup.style.display = "none";
  });

  confirmDeleteButton.addEventListener("click", function () {
    const id = deletePopup.getAttribute("data-form-id");
    deleteImport(id);
    deletePopup.style.display = "none";
  });
});

function filterImport() {
  const sDate = document.getElementById("from").value;
  const eDate = document.getElementById("to").value;
  let filterResult;
  const startDate = sDate ? new Date(sDate) : null;
  const endDate = eDate ? new Date(eDate) : null;

  if (startDate && endDate && startDate > endDate) {
    alert("Invalid date range");
    return;
  }
  if (!startDate && !endDate) {
    filterResult = listImportForm;
  } else if (!startDate) {
    filterResult = listImportForm.filter(
      (t) => new Date(t.date_created) <= endDate
    );
  } else if (!endDate) {
    filterResult = listImportForm.filter(
      (t) => new Date(t.date_created) >= startDate
    );
  } else {
    filterResult = listImportForm.filter((t) => {
      const date = new Date(t.date_created);
      return date >= startDate && date <= endDate;
    });
  }
  clearTbody();
  displayLiquidationList(filterResult);
}

document.getElementById("search").addEventListener("click", () => {
  const input = document.getElementById("supplierName").value;
  if (input) {
    const url = `http://localhost:5501/warehouse/import.html?supplier=${encodeURIComponent(
      input
    )}`;
    window.location.href = url;
  } else {
    const url = `http://localhost:5501/warehouse/import.html`;
    window.location.href = url;
  }

});

document.getElementById("supplierName")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const input = document.getElementById("supplierName").value;
      if (input) {
        const url = `http://localhost:5501/warehouse/import.html?supplier=${encodeURIComponent(
          input
        )}`;
        window.location.href = url;
      } else {
        const url = `http://localhost:5501/warehouse/import.html`;
        window.location.href = url;
      }
    }
  });

// document.getElementById('dateInput').addEventListener('change', (event) => {
//     console.log('Date changed to:', event.target.value);
//     getAllImportForm(event.target.value);
// });

function displayImportList(importList) {
  importList.forEach((importForm) => {
    var date = new Date(importForm.date_created).toISOString().split("T")[0];
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    idCell.id = "ID-content";
    idCell.textContent = importForm.id;
    row.appendChild(idCell);

    const supplierCell = document.createElement("td");
    supplierCell.textContent = importForm.Supplier.name;
    row.appendChild(supplierCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = date;
    row.appendChild(dateCell);

    const priceCell = document.createElement("td");
    priceCell.textContent =
      "-" + parseFloat(importForm.total_price).toLocaleString() + "VND";
    row.appendChild(priceCell);

    const imgCell = document.createElement("td");
    const actionCell = document.createElement("td");
    actionCell.id = "action";
    const button = document.createElement("button");
    imgCell.id = "state";
    const div1 = document.createElement("div");
    div1.style = "justify-items: center;";
    const div2 = document.createElement("div");
    div2.className = "accepted";
    const div3 = document.createElement("div");
    div3.className = "denied";
    const div4 = document.createElement("div");
    div4.className = "loading";
    if (importForm.id_employee_accepted !== null) {
      const img = document.createElement("img");
      img.src = "./assets/icons/accepted_ic.png";
      img.alt = "Accepted";
      div2.appendChild(img);
      div1.appendChild(div2);
      button.className = "View";
      button.addEventListener("click", () => {
        window.location.href = "import_detail.html?id=" + importForm.id;
      });
      button.textContent = "View";
    }
    else {
      if (importForm.date_accepted !== null && importForm.id_employee_accepted === null) {
        const img = document.createElement("img");
        img.src = "./assets/icons/denied_ic.png";
        img.alt = "denied";
        div3.appendChild(img);
        div1.appendChild(div3);
      }
      else {
        const img = document.createElement("img");
        img.src = "./assets/icons/loading_ic.png";
        img.alt = "loading";
        div4.appendChild(img);
        div1.appendChild(div4);
      }
      button.className = "Delete";
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        deletePopup.style.display = "";
        deletePopup.setAttribute("data-form-id", importForm.id);
      });
      button.textContent = "Delete";
    }
    imgCell.appendChild(div1);
    row.appendChild(imgCell);
    actionCell.appendChild(button);
    row.appendChild(actionCell);
    row.addEventListener("click", () => {
      window.location.href = "import_detail.html?id=" + importForm.id;
    });
    document.querySelector("tbody").appendChild(row);
  });
}

const getAllImportForm = async () => {
  clearTbody();
  try {
    const url = "http://localhost:5501/api/v1/import-forms";
    const response = await fetch(url);
    const data = await response.json();
    listImportForm = data;
    displayImportList(listImportForm);
    console.log("Succeeded");
  } catch (error) {
    console.error(error);
  }
}

function deleteImport(id) {
  fetch("http://localhost:5501/api/v1/import-details/form/" + id, {})
    .then((response) => response.json())
    .then((data) => {
      data.forEach((d) => {
        fetch(
          `http://localhost:5501/api/v1/import-details/${d.id_lot}/${d.id_product}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => { })
          .catch((error) => {
            alert("Error deleting detail");
            console.error("Error deleting detail:", error);
          });
        alert("Deleted successfully");
      });
    })
    .catch((error) => {
      alert("Error fetching details");
      console.error("Error fetching details:", error);
    });
  fetch(`http://localhost:5501/api/v1/import-forms/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      getAllImportForm();
    })
    .catch((error) => {
      alert("Error deleting form");
      console.error("Error:", error);
    });
}

const clearTbody = () => {
  const tbody = document.querySelector("tbody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
};
