let cart = [];
let registeredUser = null;

/* Add Item To Cart */
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
    alert(`${name} added to cart 🛒`);
}

/* Display Cart */
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p class=\"empty-cart\">Your cart is empty — go grab something good.</p>";
        cartTotal.textContent = "Total: ₹0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>

            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>

            <p>Item Total: ₹${itemTotal}</p>

            <button onclick="removeItem(${index})">
                Remove ❌
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: ₹${total}`;
}

/* Increase Quantity */
function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}

/* Decrease Quantity */
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    displayCart();
}

/* Remove Item */
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

/* Open Checkout */
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some food first! 🍽️");
        return;
    }

    const checkoutSection = document.getElementById("checkout");

    if (checkoutSection) {
        checkoutSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

/* Place Order */
function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const customerName = document.getElementById("customer-name").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const customerAddress = document.getElementById("customer-address").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (
        customerName.trim() === "" ||
        customerPhone.trim() === "" ||
        customerAddress.trim() === "" ||
        paymentMethod === ""
    ) {
        alert("Please fill all checkout details.");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert(
        `🎉 Order placed successfully!\n\n` +
        `Name: ${customerName}\n` +
        `Phone: ${customerPhone}\n` +
        `Address: ${customerAddress}\n` +
        `Payment: ${paymentMethod}\n` +
        `Total Amount: ₹${total}`
    );

    cart = [];
    displayCart();

    document.getElementById("checkout-form").reset();
}

/* Scroll To Menu */
function showMessage() {
    const menuSection = document.getElementById("menu");

    if (menuSection) {
        menuSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

/* Contact Form */
function submitContact(event) {
    event.preventDefault();

    const contactName = document.getElementById("contact-name").value;
    const contactEmail = document.getElementById("contact-email").value;
    const contactMessage = document.getElementById("contact-message").value;

    if (
        contactName.trim() === "" ||
        contactEmail.trim() === "" ||
        contactMessage.trim() === ""
    ) {
        alert("Please fill all contact details.");
        return;
    }

    alert("Thank you for contacting FreshBite! We will reply soon. 😊");

    document.getElementById("contact-form").reset();
}

/* Register User */
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
    ) {
        alert("Please fill all registration details.");
        return;
    }

    registeredUser = {
        name: name,
        email: email,
        password: password
    };

    alert("Registration successful! 🎉 You can now login.");

    document.getElementById("register-form").reset();
}

/* Login User */
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!registeredUser) {
        alert("Please register first.");
        return;
    }

    if (
        email === registeredUser.email &&
        password === registeredUser.password
    ) {
        alert(`Welcome back, ${registeredUser.name}! 😊`);
        document.getElementById("login-form").reset();
    } else {
        alert("Invalid email or password.");
    }
}

/* Initial Cart Display */
displayCart();