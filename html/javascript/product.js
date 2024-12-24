function formatPrice(price) {
    return new Intl.NumberFormat().format(price);
}

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