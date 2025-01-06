function redirectToNewPage(newPage) {
    window.location.href = newPage;
}
function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}
let minPrice = 0;
let maxPrice = 0;
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('avatar').src = sessionStorage.getItem('url');
    const menuToggle = document.querySelector('.menu-toggle');
    const leftContainer = document.querySelector('.left-Container');

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const url = "http://localhost:5501/api/v1/products/" + (name ? `?name=${name}` : "");
    getAllProduct(url, (price) => maxPrice = price, 0, Infinity);

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

    (getFilterDetail = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/product-categories/`, {});
            const data = await response.json();

            data.forEach(category => {
                const detailList = document.getElementById('categoryFilter');
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;

                detailList.appendChild(option);
            });

            document.getElementById('minPriceBubble').innerText = minPrice;
            document.getElementById('minPrice').value = minPrice;
            document.getElementById('minPrice').max = maxPrice;
            document.getElementById('minSpan').innerText = maxPrice.toLocaleString();

            document.getElementById('maxPriceBubble').innerText = maxPrice;
            document.getElementById('maxPrice').value = maxPrice;
            document.getElementById('maxPrice').max = maxPrice;
            document.getElementById('maxSpan').innerText = maxPrice.toLocaleString();
            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()

    minPriceInput.addEventListener('input', () => updatePrices(minPriceInput.value, maxPriceInput.value));
    maxPriceInput.addEventListener('input', () => updatePrices(minPriceInput.value, maxPriceInput.value));

    const updatePrices = async (minPrice, maxPrice) => {
        clearTbody();
        await getAllProduct(url, () => { }, parseInt(minPrice), parseInt(maxPrice));
    };
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

document.getElementById('search').addEventListener('click', () => {
    const input = document.getElementById('productName').value;
    if (input) {
        const url = `http://localhost:5501/admin/product.html?name=${encodeURIComponent(input)}`;
        window.location.href = url;
    } else {
        const url = `http://localhost:5501/admin/product.html`;
        window.location.href = url;
    }
});

document.getElementById('productName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('productName').value;
        if (input) {
            const url = `http://localhost:5501/admin/product.html?name=${encodeURIComponent(input)}`;
            window.location.href = url;
        } else {
            const url = `http://localhost:5501/admin/product.html`;
            window.location.href = url;
        }
    }
});

document.getElementById('categoryFilter').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    let url = '';
    if (selectedCategory == "All") {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        url = "http://localhost:5501/api/v1/products/" + (name ? `?name=${name}` : "");
    } else {
        url = "http://localhost:5501/api/v1/products/category-name/" + selectedCategory;
    }
    getAllProduct(url, () => { }, minPrice, maxPrice);
});

const getAllProduct = async (url, callback, minPrice, maxPrice) => {
    try {
        let highestPrice = 0;
        clearTbody();
        const response = await fetch(url);
        const data = await response.json();
        data.forEach(product => {
            if (product.price > highestPrice) {
                highestPrice = product.price;
            }

            if (product.price >= minPrice && product.price <= maxPrice) {
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
                priceCell.textContent = parseFloat(product.price).toLocaleString() + " VND";
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = (product.Inventory.quantity ? product.Inventory.quantity : "0");
                row.appendChild(quantityCell);

                const actionCell = document.createElement('td');
                actionCell.id = "action";

                const editButton = document.createElement('button');
                editButton.className = 'Edit';
                editButton.textContent = 'View';
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
            }
        })

        callback(highestPrice);
        console.log("Succeeded");
    } catch (error) {
        console.error(error);
    }
};

const clearTbody = () => {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
};
