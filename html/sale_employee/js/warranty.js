let warrantyList = [];

document.addEventListener("DOMContentLoaded", function () {
  //hiển thị danh sách phiếu bảo hành
  getWarrantyList();

  const filterPopup = document.getElementById('filterList');
  const filterBtn = document.getElementById('filterBT');
  filterBtn.addEventListener('click', function () {
    if (filterPopup.style.display === 'none') {
      filterPopup.style.display = '';
    }
    else {
      filterPopup.style.display = 'none';
    }
  });


  document.getElementById('from').addEventListener('change', function () {
    filterWarranty();
  });

  document.getElementById('to').addEventListener('change', function () {
    filterWarranty();
  });

  //thêm mới phiếu bảo hành
  document
    .getElementById("addNewWarrantyForm")
    .addEventListener("click", function () {
      window.location.href = "/sale/warrantyinfo?mode=add";
    });

  //tìm kiếm phiếu bảo hành
  document
    .getElementById("searchInfo")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const searchValue = document.getElementById("searchInfo").value;
        const filteredList = warrantyList.filter((w) =>
          w.id.toString().includes(searchValue)
        );
        displayWarrantyList(filteredList);
      }
    });

  document.getElementById("searchic").addEventListener("click", function () {
    const searchValue = document.getElementById("searchinput").value;
    const filteredList = warrantyList.filter((w) =>
      w.id.toString().includes(searchValue)
    );
    displayWarrantyList(filteredList);
  });

  document.getElementById("searchInfo").addEventListener("click", function () {
    const searchValue = document.getElementById("searchInfo").value;
    if (searchValue === "") {
      displayWarrantyList(warrantyList);
    }
  });
});

function filterWarranty() {
  const sDate = document.getElementById('from').value;
  const eDate = document.getElementById('to').value;
  let filterResult;
  const startDate = sDate ? new Date(sDate) : null;
  const endDate = eDate ? new Date(eDate) : null;

  if (startDate && endDate && startDate > endDate) {
    alert('Invalid date range');
    return;
  }
  if (!startDate && !endDate) {
    filterResult = warrantyList;
  } else if (!startDate) {
    filterResult = warrantyList.filter(t => new Date(t.date_created) <= endDate);
  } else if (!endDate) {
    filterResult = warrantyList.filter(t => new Date(t.date_created) >= startDate);
  } else {
    filterResult = warrantyList.filter(t => {
      const date = new Date(t.date_created);
      return date >= startDate && date <= endDate;
    });
  }
  displayWarrantyList(filterResult);
}

function getWarrantyList() {
  fetch("http://localhost:5501/api/v1/warranty-maintainances")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      warrantyList = data;
      displayWarrantyList(warrantyList);
    })
    .catch((error) => {
      console.error("Error fetching pre-order list:", error);
    });
}

function displayWarrantyList(list) {
  const warrantyTable = document.getElementById("warrantyTable");
  const template = document.getElementById("warranty-template").content;
  warrantyTable.innerHTML = "";

  list.forEach(async (warranty) => {
    const row = document.importNode(template, true);
    row.getElementById("ID_tbody").textContent = warranty.id;
    const customer = await getCustomerByID(warranty.id_customer);
    row.getElementById("customer").textContent = customer.name;
    row.getElementById("date").textContent = formatDate(warranty.date_created);
    row.getElementById("product").textContent = warranty.name_product;
    if (warranty.id_activity) {
      const activity = await getActivityByID(warranty.id_activity);

      row.getElementById("content").textContent = activity.name_activity;
    }
    row.getElementById("tr").addEventListener("click", function () {
      window.location.href = `/sale/warrantyinfo?mode=view&id=${warranty.id}`;
    });
    warrantyTable.appendChild(row);
  });
}

async function getCustomerByID(id) {
  try {
    const response = await fetch(
      `http://localhost:5501/api/v1/customers/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch customer");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function getProductByID(id) {
  try {
    const response = await fetch(`http://localhost:5501/api/v1/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getActivityByID(id) {
  try {
    const response = await fetch(
      `http://localhost:5501/api/v1/service-activities/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch activity");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
}

function formatDate(date) {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
}
