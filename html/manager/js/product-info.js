document.addEventListener('DOMContentLoaded', function () {
    const id = getQueryParam('id');
    (getDetailProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/products/${id}`, {});
            const data = await response.json();
            console.log(data);
            if (!data.discount)
                data.discount = 0;
            document.getElementById('name').innerText = data.name;
            document.getElementById('category').innerText = data.ProductCategory.name;
            document.getElementById('material').innerText = data.material;
            document.getElementById('weight').innerText = data.weight + "g";
            document.getElementById('gemstone').innerText = data.Gemstone.name;
            document.getElementById('size').innerText = data.size + "cm";
            document.getElementById('carat-weight').innerText = data.Gemstone.weight;
            document.getElementById('color').innerText = data.Gemstone.color;
            //document.getElementById('shape').innerText = data.accumulated_point;
            document.getElementById('purity').innerText = data.Gemstone.purity;
            document.getElementById('gemstone-size').innerText = data.Gemstone.size + "mm x " + data.Gemstone.size + "mm";
            document.getElementById('description').innerText = "Description: " + (data.description ? data.description : "");
            document.getElementById('current-price').innerText = (parseFloat(data.price) * (1. - parseFloat(data.discount) / 100)).toLocaleString() + "VND";
            document.getElementById('original-price').innerText = parseFloat(data.price).toLocaleString() + "VND";
            document.getElementById('discount').innerText = "↓ " + data.discount + "%";
            document.getElementById('quantity').innerText = "Quantity: " + data.Inventory.quantity;

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})