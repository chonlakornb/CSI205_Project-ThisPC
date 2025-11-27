import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../../data/orders';

function OrderDetailsPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const foundOrder = getOrderById(orderId);
        setOrder(foundOrder);
    }, [orderId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!order) {
        return (
            <div className="text-center py-20 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">Order Not Found</h1>
                <p className="text-gray-600 mt-2">Sorry, we couldn't find the order you're looking for.</p>
                <Link to="/profile" className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                    Back to My Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <Link to="/profile" className="text-sm text-blue-600 hover:underline">← Back to My Profile</Link>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                            <p className="text-sm text-gray-500">Date: {order.date}</p>
                        </div>
                        <div>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Shipping Address */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Shipping Address</h2>
                        <div className="text-gray-700">
                            <p className="font-bold">{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Items</h2>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                    <div className="flex items-center">
                                        <img src={`https://picsum.photos/60/60?random=${item.id}`} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} ฿</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Total */}
                    <div className="flex justify-end">
                        <div className="w-full max-w-xs space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">{(order.total - 50).toFixed(2)} ฿</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">50.00 ฿</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl border-t pt-2 mt-2">
                                <span>Total</span>
                                <span>{order.total.toFixed(2)} ฿</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsPage;