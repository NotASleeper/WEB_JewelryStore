function redirectToNewPage(newPage) {
    window.location.href = newPage;
}
function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const leftContainer = document.querySelector('.left-Container');

    // Toggle menu khi click button
    menuToggle.addEventListener('click', () => {
        leftContainer.classList.toggle('show');
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', (event) => {
        if (!leftContainer.contains(event.target) && !menuToggle.contains(event.target)) {
            leftContainer.classList.remove('show');
        }
    });
});

function updatePriceBubble(input, bubble) {
    const value = input.value;
    const bubbleElement = document.getElementById(bubble);
    bubbleElement.textContent = formatPrice(value);
    const percent = (value - input.min) / (input.max - input.min);
    const position = percent * input.offsetWidth;
    bubbleElement.style.left = `${position}px`;
}

const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

minPriceInput.addEventListener('input', () => {
    updatePriceBubble(minPriceInput, 'minPriceBubble');
});

maxPriceInput.addEventListener('input', () => {
    updatePriceBubble(maxPriceInput, 'maxPriceBubble');
});

updatePriceBubble(minPriceInput, 'minPriceBubble');
updatePriceBubble(maxPriceInput, 'maxPriceBubble');

const filterButton = document.getElementById('filterButton');
const filterPopup = document.getElementById('filterPopup');

filterButton.addEventListener('click', (e) => {
    e.stopPropagation();
    filterPopup.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!filterPopup.contains(e.target)) {
        filterPopup.classList.remove('active');
    }
});

const getAllProduct = async () => {
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
            img.src = "./assets/product1.jpg";
            img.alt = "Product image";
            imgCell.appendChild(img);
            row.appendChild(imgCell);

            const categoryCell = document.createElement('td');
            categoryCell.textContent = product.ProductCategory.name;
            row.appendChild(categoryCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = parseFloat(product.price).toLocaleString();
            row.appendChild(priceCell);

            const quantityCell = document.createElement('td');
            quantityCell.textContent = product.Inventory.quantity;
            row.appendChild(quantityCell);

            const actionCell = document.createElement('td');
            actionCell.id = "action";

            const editButton = document.createElement('button');
            editButton.className = 'Edit';
            editButton.textContent = 'Info';
            editButton.addEventListener('click', () => {
                window.location.href = "product-info.html?id=" + product.id;
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
}

document.getElementById('search').addEventListener('click', () => {
    const input = document.getElementById('productName').value;
    const url = `http://localhost:5501/admin/product.html?name=${encodeURIComponent(input)}`;
    window.location.href = url;
});

document.getElementById('productName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('productName').value;
        const url = `http://localhost:5501/admin/product.html?name=${encodeURIComponent(input)}`;
        window.location.href = url;
    }
});