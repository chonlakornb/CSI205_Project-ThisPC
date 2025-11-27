// This file will be the single source of truth for cart data.

/**
 * Determines the correct localStorage key for the cart.
 * It will be user-specific if logged in, otherwise a generic guest cart.
 * @returns {string} The localStorage key for the cart.
 */
const getCartStorageKey = () => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
        const user = JSON.parse(userDataString);
        // Use email as a unique identifier for the user's cart
        return `cart_${user.email}`;
    }
    // Default key for guests
    return 'cart_guest';
};

/**
 * Retrieves the cart from localStorage.
 * @returns {Array} The array of cart items.
 */
export const getCart = () => {
    const cartKey = getCartStorageKey();
    const cartJSON = localStorage.getItem(cartKey);
    return cartJSON ? JSON.parse(cartJSON) : [];
};

/**
 * Saves the cart to localStorage.
 * @param {Array} cart - The cart array to save.
 */
const saveCart = (cart) => {
    const cartKey = getCartStorageKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
    // Dispatch a custom event so other components (like the navbar) can update
    window.dispatchEvent(new Event('storage'));
};

/**
 * Adds a product to the cart. If the product is already in the cart, it increases the quantity.
 * @param {Object} product - The product object to add.
 * @param {number} quantity - The quantity to add.
 */
export const addToCart = (product, quantity) => {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        // Product already in cart, update quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
};

/**
 * Updates the quantity of a specific item in the cart.
 * @param {number} productId - The ID of the product to update.
 * @param {number} quantity - The new quantity.
 */
export const updateCartItemQuantity = (productId, quantity) => {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (quantity > 0) {
            cart[itemIndex].quantity = quantity;
        } else {
            // If quantity is 0 or less, remove the item
            cart = cart.filter(item => item.id !== productId);
        }
    }
    saveCart(cart);
};

/**
 * Removes an item completely from the cart.
 * @param {number} productId - The ID of the product to remove.
 */
export const removeFromCart = (productId) => {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
};

/**
 * Clears the entire cart.
 */
export const clearCart = () => {
    const cartKey = getCartStorageKey();
    localStorage.removeItem(cartKey);
    saveCart([]); // Dispatch event
};

/**
 * Merges the guest cart into the user's cart upon login.
 * @param {string} userEmail - The email of the user who just logged in.
 */
export const mergeGuestCart = (userEmail) => {
    const guestCartKey = 'cart_guest';
    const guestCart = JSON.parse(localStorage.getItem(guestCartKey) || '[]');

    if (guestCart.length === 0) {
        return; // No items to merge
    }

    const userCartKey = `cart_${userEmail}`;
    const userCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');

    guestCart.forEach(guestItem => {
        addToCart(guestItem, guestItem.quantity); // addToCart will handle merging logic
    });

    // Clear the guest cart after merging
    localStorage.removeItem(guestCartKey);
};