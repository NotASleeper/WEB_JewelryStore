document.addEventListener('DOMContentLoaded', function () {
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
    })()
})

const getCategoryID = async () => {
    console.log(1);
    const response = await fetch(`http://localhost:5501/api/v1/product-categories/`, {});
    const data = await response.json();

    const input = document.getElementById('category').value;
    const selectedItem = data.find(item => item.name === input);
    if (selectedItem) {
        return selectedItem.id;
    }
}

const createProduct = async (name, category, material, size, weight, price, discount, description) => {
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
        status: 1,
    }

    try {
        const response = await fetch('http://localhost:5501/api/v1/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        console.log('Success:');
        const data = await response.json()
        console.log(data);

        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

const saveClick = async () => {
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

    const userConfirmed = confirm('Are you sure you want to create product?');
    if (!userConfirmed) {
        return;
    }

    const data = await createProduct(name, category, material, size, weight, price, discount, description);
    await createGemstone(data.id, gemstoneName, gemstoneSize, gemstoneWeight, color, purity, certificate);
    window.location.href = 'product-info.html?id=' + data.id
}

const createGemstone = async (id, name, size, weight, color, purity, certificate,) => {
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