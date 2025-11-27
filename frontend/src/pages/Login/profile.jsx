import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getOrders } from '../../data/orders';
import { logout } from '../../data/user';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // States for forms
    const [name, setName] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'Thailand'
    });

    // States for password change form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for user orders
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUser(userData);
            setName(userData.name || '');
            setOrders(getOrders()); // Fetch orders for the logged-in user
            if (userData.address) {
                setAddress(userData.address);
            }
        } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ ให้ redirect ไปหน้า login
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        logout();
        // นำทางไปหน้าหลักและรีโหลด
        navigate('/');
        window.location.reload();
    };

    const handleSettingsSave = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, name: name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert('Settings saved successfully!');
        window.location.reload(); // Reload to reflect changes in navbar if name is used there
    };

    const handleAddressSave = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, address: address };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert('Address saved successfully!');
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            alert("New password must be at least 6 characters long.");
            return;
        }

        // In a real app, you would call an API here to verify the current password
        // and save the new one. For this mock, we'll just show a success message.
        console.log("Changing password (mock)... Current:", currentPassword, "New:", newPassword);
        alert("Password changed successfully!");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


    if (!user) {
        return <div>Loading...</div>; // หรือแสดง loading spinner
    }

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Profile Header */}
                <div className="p-6 border-b border-gray-200 flex items-center space-x-6">
                    <img src={user.profileImageUrl} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                    <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Overview</button>
                    <button onClick={() => setActiveTab('settings')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Settings</button>
                    <button onClick={() => setActiveTab('address')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'address' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Address</button>
                    <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>My Orders</button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
                            <p className="text-gray-700 mb-6">Welcome to your profile page. Here you can manage your settings and address information.</p>

                            {/* Display Address Section */}
                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
                                {user.address && user.address.street ? (
                                    <div className="mt-2 text-gray-700 leading-relaxed">
                                        <p>{user.address.street}</p>
                                        <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                                        <p>{user.address.country}</p>
                                    </div>
                                ) : (
                                    <p className="mt-2 text-gray-500">No address on file. Please add one in the 'Address' tab.</p>
                                )}
                            </div>

                            <button onClick={handleLogout} className="mt-8 px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
                                Logout
                            </button>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Basic Settings</h2>
                            <form onSubmit={handleSettingsSave} className="space-y-4 max-w-md">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" value={user.email} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
                                    <p className="text-xs text-gray-500 mt-1">Email address cannot be changed.</p>
                                </div>
                                <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Save Changes</button>
                            </form>

                            <hr className="my-8" />

                            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                                    <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-900">Update Password</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'address' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                            <form onSubmit={handleAddressSave} className="space-y-4 max-w-lg">
                                <div>
                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
                                    <input type="text" name="street" id="street" value={address.street} onChange={handleAddressChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" name="city" id="city" value={address.city} onChange={handleAddressChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                                        <input type="text" name="state" id="state" value={address.state} onChange={handleAddressChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                                        <input type="text" name="zip" id="zip" value={address.zip} onChange={handleAddressChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                        <input type="text" name="country" id="country" value={address.country} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" />
                                    </div>
                                </div>
                                <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Save Address</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                            {orders.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {orders.map((order) => (
                                                <tr key={order.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total.toFixed(2)} ฿</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link to={`/order/${order.id}`} className="text-indigo-600 hover:text-indigo-900">View Details</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">You have no orders yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;