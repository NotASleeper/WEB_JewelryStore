let billList = [];
let totalOrder = '';
let dateOrder = '';

document.addEventListener('DOMContentLoaded', async function () {
    await getBillList();
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

    document.getElementById('dateArrange').addEventListener('click', function () {
        sortBillsByDate();
    });

    document.getElementById('totalArrange').addEventListener('click', function () {
        sortBillByTotal();
    });

    document.getElementById('searchInfo').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            searchBill();
        }
    });

    document.getElementById('searchic').addEventListener('click', function () {
        searchBill();
    });

    document.getElementById('from').addEventListener('change', function () {
        filterBill();
    });

    document.getElementById('to').addEventListener('change', function () {
        filterBill();
    });
});

function sortBillsByDate() {
    if (dateOrder !== 'desc') {
        billList.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
        dateOrder = 'desc';
    } else {
        billList.sort((a, b) => new Date(a.date_created) - new Date(b.date_created));
        dateOrder = 'asc';
    }
    displayBillList(billList);
}

function sortBillByTotal(){
    if (totalOrder !== 'desc') {
        billList.sort((a, b) => b.total_price - a.total_price);
        totalOrder = 'desc';
    } else {
        billList.sort((a, b) => a.total_price - b.total_price);
        totalOrder = 'asc';
    }
    displayBillList(billList);
}


function getBillList() {
    try {
        fetch('http://localhost:5501/api/v1/order-forms')
            .then(response => response.json())
            .then(data => {
                billList = data;
                displayBillList(billList);
            })
            .catch(error => console.log('Error fetching order form: ', error));
    }
    catch (error) {
        console.log('Error fetching order form: ', error);
    }
}

function displayBillList(billList) {
    const billTable = document.getElementById('billTable');
    const template = document.getElementById('billTemplate').content;
    billTable.innerHTML = '';
    billList.forEach(async bill => {
        const row = document.importNode(template, true);
        row.getElementById('ID_tbody').textContent = bill.id;
        row.getElementById('date').textContent = formatDate(bill.date_created);
        if (bill.id_customer) {
            const customer = await getCustomerByID(bill.id_customer);
            row.getElementById('customer').textContent = customer.name;
        }
        row.getElementById('total').textContent = bill.total_price;
        row.getElementById('tr').addEventListener('click', function () {
            window.location.href = `/warehouse/bill-info.html?id=${bill.id}`;
        });
        billTable.appendChild(row);
    });
}

async function getCustomerByID(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/customers/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch customer');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching customer:', error);
        return null;
    }
}

function searchBill() {
    const searchInput = document.getElementById('searchInfo');
    const searchValue = searchInput.value.toLowerCase().trim();
    console.log(searchValue);
    if (searchValue === '') {
        displayBillList(billList);
        return;
    }
    const searchResult = billList.filter(bill =>
        bill.id.toString().includes(searchValue)
    );
    displayBillList(searchResult);
}

function filterBill() {
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
        filterResult = billList;
    } else if (!startDate) {
        filterResult = billList.filter(bill => new Date(bill.date_created) <= endDate);
    } else if (!endDate) {
        filterResult = billList.filter(bill => new Date(bill.date_created) >= startDate);
    } else {
        filterResult = billList.filter(bill => {
            const billDate = new Date(bill.date_created);
            return billDate >= startDate && billDate <= endDate;
        });
    }

    displayBillList(filterResult);
}

function formatDate(date) {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}