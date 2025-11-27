import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateCartItemQuantity, removeFromCart, clearCart } from '../../data/cart';
import { addOrder } from '../../data/orders';
import { getImage } from '../../data/imageStore';
import { addTransaction } from '../../data/finance';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null); // Add state for user
    const [guestInfo, setGuestInfo] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(getCart());
        // Get user data from localStorage
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            setUser(JSON.parse(userDataString));
        }
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity, 10);
        if (quantity >= 0) {
            updateCartItemQuantity(productId, quantity);
            setCartItems(getCart()); // Refresh cart from localStorage
        }
    };

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
        setCartItems(getCart()); // Refresh cart from localStorage
    };

    const handleGuestInfoChange = (e) => {
        const { name, value } = e.target;
        setGuestInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = () => {
        if (!canCheckout) return;

        const isGuest = !user;

        const orderDetails = {
            items: cartItems,
            total: total,
            shippingAddress: isGuest ? guestInfo : user.address,
            status: 'Processing' // Initial status
        };

        // Add order to history (if user is logged in)
        const newOrder = addOrder(orderDetails);

        // Record the transaction to update financial stats
        addTransaction(total);

        if (isGuest) {
            alert(`Thank you for your order! A confirmation email has been sent to ${guestInfo.email}.`);
        } else {
            alert('Thank you for your order! Your order has been placed.');
        }

        // Clear the cart
        clearCart();

        // Navigate to the new receipt page with order data
        navigate('/receipt', { state: { order: newOrder } });
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 50.00 : 0; // Example shipping cost
    const total = subtotal + shipping;

    // Checkout is possible if:
    // 1. User is logged in and has a complete address.
    // 2. User is a guest and has filled out the essential address fields.
    const loggedInCanCheckout = user && user.address && user.address.street;
    const guestCanCheckout = !user && guestInfo.name && guestInfo.email && guestInfo.street && guestInfo.city && guestInfo.zip;
    const canCheckout = loggedInCanCheckout || guestCanCheckout;

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h1>
                <p className="text-gray-600 mt-2">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/laptop" className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <img src={getImage(item.id) || `https://picsum.photos/100/100?random=${item.id}`} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                            <div className="flex-grow ml-4">
                                <h2 className="font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-sm text-gray-500">SKU: MSI-PRO-{item.id}</p>
                                <button onClick={() => handleRemoveItem(item.id)} className="text-xs text-red-500 hover:text-red-700 font-semibold mt-1">Remove</button>
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    min="0"
                                    className="w-16 text-center border border-gray-300 rounded-md py-1"
                                />
                                <p className="w-24 text-right font-semibold text-gray-900">{(item.price * item.quantity).toFixed(2)} ฿</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{subtotal.toFixed(2)} ฿</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{shipping.toFixed(2)} ฿</span>
                            </div>
                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{total.toFixed(2)} ฿</span>
                            </div>
                        </div>

                        {/* Shipping Address Section */}
                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping to</h3>
                            {user ? ( // --- กรณีผู้ใช้ Login แล้ว ---
                                loggedInCanCheckout ? (
                                    <div className="text-sm text-gray-600 leading-snug">
                                        <p className="font-semibold">{user.name}</p>
                                        <p>{user.address.street}</p>
                                        <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-md">Please <Link to="/profile" className="font-bold underline">add a shipping address</Link> to your profile.</p>
                                )
                            ) : ( // --- กรณีผู้ใช้เป็น Guest (ยังไม่ Login) ---
                                <form className="space-y-3">
                                    <div>
                                        <label htmlFor="guestName" className="text-xs font-medium text-gray-600">Full Name</label>
                                        <input type="text" name="name" id="guestName" value={guestInfo.name} onChange={handleGuestInfoChange} className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                                    </div>
                                <div>
                                    <label htmlFor="guestEmail" className="text-xs font-medium text-gray-600">Email Address</label>
                                    <input type="email" name="email" id="guestEmail" value={guestInfo.email} onChange={handleGuestInfoChange} className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                                </div>
                                    <div>
                                        <label htmlFor="guestStreet" className="text-xs font-medium text-gray-600">Street Address</label>
                                        <input type="text" name="street" id="guestStreet" value={guestInfo.street} onChange={handleGuestInfoChange} className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label htmlFor="guestCity" className="text-xs font-medium text-gray-600">City</label>
                                            <input type="text" name="city" id="guestCity" value={guestInfo.city} onChange={handleGuestInfoChange} className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="guestZip" className="text-xs font-medium text-gray-600">ZIP Code</label>
                                            <input type="text" name="zip" id="guestZip" value={guestInfo.zip} onChange={handleGuestInfoChange} className="w-full mt-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm" />
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        <button 
                            onClick={handleCheckout}
                            disabled={!canCheckout}
                            className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
