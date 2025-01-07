const urlParams = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', function () {
    const id = urlParams.get('id');
    getLiquidationInfo(id);
    getLiquidationDetail(id);
});

function getLiquidationInfo(id) {
    fetch(`http://localhost:5501/api/v1/liquidation-forms/${id}`, {})
        .then(response => response.json())
        .then(async data => {
            document.getElementById('id').value = data.id;
            document.getElementById('staff').value = data.create.name;
            document.getElementById('date').value = formatDate(data.date_created);
            if (data.id_employee_accepted === null) {
                document.getElementById('state').value = 'Waiting for acceptance';
            }
            else if (data.id_employee_accepted !== null && data.date_accepted === null) {
                document.getElementById('state').value = 'Denied';
            }
            else if (data.id_employee_accepted !== null && data.date_accepted === null) {
                document.getElementById('state').value = 'Accepted - ' + formatDate1(data.date_accepted);
            }
            document.getElementById('totalPrice').textContent = 'Total: ' + data.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
        })
        .catch(error => console.error('Error fetching liquidation: ', error));
}

function getLiquidationDetail(id) {
    const template = document.getElementById('detailTemplate').content;
    document.getElementById('detailTable').innerHTML = '';
    fetch(`http://localhost:5501/api/v1/liquidation-details/form/${id}`, {})
    .then(response => response.json())
    .then(data => {
        let i = 1;
        data.forEach(async detail => {
            const row = document.importNode(template, true);
            const product = await getProductByID(detail.id_product);
            row.getElementById('ID').textContent = i++;
            row.getElementById('name').innerHTML = '<b>'+detail.Product.name+'</b><br>'+detail.Product.material+', '+product.Gemstone.name;
            row.getElementById('quantity').textContent = detail.quantity;
            row.getElementById('total').textContent = detail.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            row.getElementById('category').textContent = detail.Product.ProductCategory.name;
            row.getElementById('price').textContent = detail.price_down.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            document.getElementById('detailTable').appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching bill detail: ', error));
}

async function getProductByID(id) {
    try {
        const response = await fetch(`http://localhost:5501/api/v1/products/${id}`, {});
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching product: ', error);
    }
}

function formatDate(date) {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}

function formatDate1(date) {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}