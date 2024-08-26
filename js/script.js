let cart = [];

function addToCart(productName, price) {
    // Check if the item is already in the cart
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const product = { name: productName, price: price, quantity: 1 };
        cart.push(product);
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-container');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    // Update cart item count
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    // Clear previous cart items
    cartItems.innerHTML = '';

    // Add current items to cart display
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.name} - R${(item.price * item.quantity).toFixed(2)} (x${item.quantity})
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    // Show cart container if there are items
    cartContainer.style.display = cart.length > 0 ? 'block' : 'none';
}

function removeFromCart(index) {
    // Reduce the quantity if more than 1, otherwise remove the item
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

function cashOut() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // Proceed to checkout
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Total amount: R${total.toFixed(2)}. Proceeding to checkout...`);
    // Clear the cart after cashing out
    cart = [];
    updateCartDisplay();
}

function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
}
