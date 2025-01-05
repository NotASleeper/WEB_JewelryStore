document.addEventListener('DOMContentLoaded', function () {
    const id = getQueryParam('id');
    (getAllCategory = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/product-categories/`, {});
            const data = await response.json();

            data.forEach(category => {
                const detailList = document.getElementById('categoryList');
                const option = document.createElement('option');
                option.value = category.name;
                detailList.appendChild(option);
            });

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })();

    (getDetailProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5501/api/v1/products/${id}`, {});
            const data = await response.json();
            if (!data.discount)
                data.discount = 0;
            document.getElementById('name').value = data.name;
            document.getElementById('category').value = data.ProductCategory.name;
            document.getElementById('material').value = data.material;
            document.getElementById('weight').value = data.weight;
            document.getElementById('gemstone-name').value = data.Gemstone.name;
            document.getElementById('size').value = data.size;
            document.getElementById('gemstone-weight').value = data.Gemstone.weight;
            document.getElementById('color').value = data.Gemstone.color;
            document.getElementById('purity').value = data.Gemstone.purity;
            document.getElementById('gemstone-size').value = data.Gemstone.size;
            document.getElementById('certificate').value = data.Gemstone.certificate;
            document.getElementById('description').value = data.description;
            document.getElementById('price').value = data.price;
            document.getElementById('discount').value = data.discount;

            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})

const saveClick = async () => {
    const id = getQueryParam('id');
    console.log(id);

    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const material = document.getElementById('material').value;
    const size = document.getElementById('size').value;
    const weight = document.getElementById('weight').value;
    const price = document.getElementById('price').value;
    const discount = document.getElementById('discount').value;
    const description = document.getElementById('description').value;

    const gemstoneName = document.getElementById('gemstone-name').value;
    const gemstoneSize = document.getElementById('gemstone-size').value;
    const gemstoneWeight = document.getElementById('gemstone-weight').value;
    const color = document.getElementById('color').value;
    const purity = document.getElementById('purity').value;
    const certificate = document.getElementById('certificate').value;

    if (name.trim() === '' ||
        category.trim() === '' ||
        material.trim() === '' ||
        size.trim() === '' ||
        weight.trim() === '' ||
        price.trim() === '' ||
        discount.trim() === '' ||
        description.trim() === '' ||
        gemstoneName.trim() === '' ||
        gemstoneSize.trim() === '' ||
        gemstoneWeight.trim() === '' ||
        color.trim() === '' ||
        purity.trim() === '' ||
        certificate.trim() === '') {
        alert('Please fill in all required fields');
        return;
    }

    const userConfirmed = confirm('Are you sure you want to update this product?');
    if (!userConfirmed) {
        return;
    }

    const data = await updateProduct(name, material, size, weight, price, discount, description);
    await updateGemstone(id, gemstoneName, gemstoneSize, gemstoneWeight, color, purity, certificate);
    window.location.href = 'product-info.html?id=' + data.id
}

const updateProduct = async (name, material, size, weight, price, discount, description) => {
    const id = getQueryParam('id');
    const id_category = await getCategoryID();
    const product = {
        name: name,
        id_category: id_category,
        material: material,
        size: size,
        weight: weight,
        price: price,
        warranty_period: "0",
        discount: discount,
        description: description,
    }
    console.log(product);

    const url = 'http://localhost:5501/api/v1/products/' + id;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json()

        console.log('Success:');
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const updateGemstone = async (id, name, size, weight, color, purity, certificate,) => {
    const gemstone = {
        name: name,
        size: size,
        weight: weight,
        color: color,
        purity: purity,
        certificate: certificate
    }

    try {
        const response = await fetch(`http://localhost:5501/api/v1/gemstones/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gemstone)
        });
        console.log('Success:');
    } catch (error) {
        console.error('Error:', error);
    }
}

const getCategoryID = async () => {
    const response = await fetch(`http://localhost:5501/api/v1/product-categories/`, {});
    const data = await response.json();

    const input = document.getElementById('category').value;
    const selectedItem = data.find(item => item.name === input);
    if (selectedItem) {
        return selectedItem.id;
    }
}