import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

function ReceiptPage() {
    const location = useLocation();
    const { order } = location.state || {};

    // ถ้าไม่มีข้อมูล order (เช่น เข้ามาที่ URL นี้โดยตรง) ให้ redirect กลับไปหน้าแรก
    if (!order) {
        return <Navigate to="/" replace />;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const shippingCost = 50.00;
    const subtotal = order.total - shippingCost;

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Thank You For Your Order!</h1>
                    <p className="text-gray-500">Your receipt is below.</p>
                </div>

                {/* Order Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold">{order.id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold">{order.date}</p>
                    </div>
                    <div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Shipping To</h2>
                    <div className="text-gray-700 text-sm">
                        <p className="font-bold">{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state || ''} {order.shippingAddress.zip}</p>
                    </div>
                </div>

                {/* Items List */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Items Ordered</h2>
                    <div className="space-y-3">
                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">{(item.price * item.quantity).toFixed(2)} ฿</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Total */}
                <div className="border-t pt-4">
                    <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>{subtotal.toFixed(2)} ฿</span></div>
                    <div className="flex justify-between text-sm text-gray-600"><span>Shipping</span><span>{shippingCost.toFixed(2)} ฿</span></div>
                    <div className="flex justify-between font-bold text-xl mt-2 pt-2 border-t"><span>Total</span><span>{order.total.toFixed(2)} ฿</span></div>
                </div>

                <div className="text-center mt-10">
                    <Link to="/" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ReceiptPage;