import React, { useState, useEffect } from 'react';
import { getProducts } from '../../data/products';
import { getImage } from '../../data/imageStore';
import { addTransaction } from '../../data/finance';
import { Link } from 'react-router-dom';

function PosPage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    const addToCart = (product) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id);
            if (existingItem) {
                return currentCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity, 10);
        setCart(currentCart => {
            if (quantity <= 0) {
                return currentCart.filter(item => item.id !== productId);
            }
            return currentCart.map(item =>
                item.id === productId ? { ...item, quantity: quantity } : item
            );
        });
    };

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.07; // Example 7% tax
    const total = subtotal + tax;

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProcessPayment = () => {
        if (cart.length === 0) {
            alert("Cart is empty.");
            return;
        }
        // In a real app, this would connect to a payment terminal/API
        // Record the transaction
        addTransaction(total);

        alert(`Payment Processed!\nTotal: $${total.toFixed(2)}\nThank you!`);
        setCart([]); // Clear cart after payment
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Product Selection Area */}
            <div className="w-3/5 p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Point of Sale</h1>
                    <Link to="/staff/order-search" className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-black">
                        Find Order/Warranty
                    </Link>
                </div>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                        <div key={product.id} onClick={() => addToCart(product)} className="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                            <img src={getImage(product.id) || `https://picsum.photos/150/150?random=${product.id}`} alt={product.name} className="w-full h-24 object-cover rounded-md mb-2" />
                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                            <p className="text-sm font-bold text-blue-600">{product.price.toFixed(2)} ฿</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart & Payment Area */}
            <div className="w-2/5 bg-white p-6 shadow-lg flex flex-col">
                <h2 className="text-xl font-bold border-b pb-4 mb-4">Current Order</h2>
                <div className="flex-grow overflow-y-auto">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">No items in order.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center mb-3">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.price.toFixed(2)} ฿</p>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                                        className="w-14 text-center border rounded-md mx-2"
                                    />
                                    <p className="w-20 text-right font-semibold">{(item.price * item.quantity).toFixed(2)} ฿</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span>{subtotal.toFixed(2)} ฿</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <span>Tax (7%)</span>
                        <span>{tax.toFixed(2)} ฿</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-gray-900">
                        <span>Total</span>
                        <span>{total.toFixed(2)} ฿</span>
                    </div>
                    <button
                        onClick={handleProcessPayment}
                        disabled={cart.length === 0}
                        className="w-full mt-4 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    >
                        Process Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PosPage;