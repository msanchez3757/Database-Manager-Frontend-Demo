async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/product'); // Changed from api/product to api/products
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Failed to fetch products: ', error);
    }
}

function displayProducts(products) {
    const tbody = document.querySelector('.productsbrowse table tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const row = `
            <tr>
                <td class="tc_ulist"></td>
                <td class="tc_title">
                    <a href="">${product.name}</a>
                </td>
                <td class="tc_plat">${product.category}</td>
                <td class="tc_lang"></td>
                <td class="tc_rel"></td>
                <td class="tc_price">$${product.price.toFixed(2)}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

async function handleSearch(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('q').value;
    try {
        const response = await fetch(`http://localhost:8080/api/product?nameOrDescription=${encodeURIComponent(searchQuery)}`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error searching products:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    const searchForm = document.querySelector('main form');
    searchForm.addEventListener('submit', handleSearch);
});