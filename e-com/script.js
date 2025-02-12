let cart = JSON.parse(localStorage.getItem('cart')) || [];


function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}


function addToCart(productId) {
    let productElement = document.getElementById(`product-${productId}`);
    let productName = productElement.querySelector('h4').textContent;
    let productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));
    let productImage = productElement.querySelector('img').src;

    let product = { id: productId, name: productName, price: productPrice, image: productImage };
    cart.push(product);

  
    localStorage.setItem('cart', JSON.stringify(cart));

   
    updateCartCount();
}


function viewCart() {
    let cartModal = document.getElementById('cart-modal');
    let cartDetails = document.querySelector('.cart-details');
    cartDetails.innerHTML = ''; 

    cart.forEach(product => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="50">
            <span>${product.name}</span>
            <span>$${product.price}</span>
        `;
        cartDetails.appendChild(cartItem);
    });

  
    cartModal.style.display = 'flex';
}


function removeFromCart(productIndex) {
    cart.splice(productIndex, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartCount();
    viewCart(); 
}


function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function searchProducts() {
    let searchQuery = document.getElementById('searchProduct').value.toLowerCase();
    let productElements = document.querySelectorAll('.product');

    productElements.forEach(product => {
        let productName = product.querySelector('h4').textContent.toLowerCase();
        if (productName.includes(searchQuery)) {
            product.style.display = "block"; 
        } else {
            product.style.display = "none"; 
        }
    });
}


window.onclick = function(event) {
    if (event.target === document.getElementById('cart-modal')) {
        closeCart();
    }
}


window.onload = function() {
    updateCartCount(); 
};
