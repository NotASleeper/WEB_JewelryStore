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
        const url = "http://localhost:5501/api/v1/customers" + (name ? `?name=${name}` : "");

        const response = await fetch(url);
        const data = await response.json();
        data.forEach(customer => {
            var date = new Date(customer.birthday).toISOString().split('T')[0];
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.id = "ID1";
            nameCell.textContent = customer.name;
            row.appendChild(nameCell);

            const addressCell = document.createElement('td');
            addressCell.id = "name";
            addressCell.textContent = customer.address;
            row.appendChild(addressCell);

            const phoneCell = document.createElement('td');
            phoneCell.textContent = customer.phone;
            row.appendChild(phoneCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = customer.email;
            row.appendChild(emailCell);

            const birthdayCell = document.createElement('td');
            birthdayCell.textContent = date;
            row.appendChild(birthdayCell);

            const loyaltyCell = document.createElement('td');
            loyaltyCell.textContent = customer.loyalty_point;
            row.appendChild(loyaltyCell);

            const actionCell = document.createElement('td');
            actionCell.id = "action";

            const editButton = document.createElement('button');
            editButton.className = 'Edit';
            editButton.textContent = 'Info';
            editButton.addEventListener('click', () => {
                window.location.href = "customer-info.html?id=" + customer.id;
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