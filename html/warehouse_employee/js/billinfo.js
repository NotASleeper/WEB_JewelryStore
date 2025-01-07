const urlParams = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', function () {
    const id = urlParams.get('id');
    getBillInfo(id);
    getBillDetail(id);
});

function getBillInfo(id) {
    fetch(`http://localhost:5501/api/v1/order-forms/${id}`, {})
    .then(response => response.json())
    .then(async data => {
        document.getElementById('id').value = data.id;
        const staff = await getStaffByID(data.id_employee);
        document.getElementById('staff').value = staff.name;
        document.getElementById('date').value = formatDate(data.date_created);
        document.getElementById('totalPrice').textContent = 'Total: '+data.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    })
    .catch(error => console.error('Error fetching bill: ', error));
}

function getBillDetail(id) {
    const template = document.getElementById('detailTemplate').content;
    document.getElementById('detailTable').innerHTML = '';
    fetch(`http://localhost:5501/api/v1/order-details/form/${id}`, {})
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
            row.getElementById('price').textContent = detail.Product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
            document.getElementById('detailTable').appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching bill detail: ', error));
}

async function getStaffByID(id){
    try{
        const response = await fetch(`http://localhost:5501/api/v1/employees/${id}`, {});
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error('Error fetching employee: ', error);
    }
}

async function getProductByID(id){
    try{
        const response = await fetch(`http://localhost:5501/api/v1/products/${id}`, {});
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error('Error fetching product: ', error);
    }
}


function formatDate(date) {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}