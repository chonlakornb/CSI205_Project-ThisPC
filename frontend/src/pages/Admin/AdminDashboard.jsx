import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, addProduct, deleteProduct } from '../../data/products';
import { getNews, addNews, deleteNews } from '../../data/news';
import { getAllOrders } from '../../data/orders';
import { getFinanceStats } from '../../data/finance';
function AdminDashboard() {

    // --- ข้อมูลจำลอง (Mock Data) ---
    const [dashboardStats, setDashboardStats] = useState({ revenue: 0, expenses: 0, profit: 0, totalOrders: 0 });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [productStock, setProductStock] = useState(() => getProducts());

    // State for the new product form
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductStock, setNewProductStock] = useState('');
    const [newProductImage, setNewProductImage] = useState(null);
    const [newProductDescription, setNewProductDescription] = useState('');
    
    // State for the new news form
    const [newNewsTitle, setNewNewsTitle] = useState('');
    const [newNewsSummary, setNewNewsSummary] = useState('');
    const [newNewsImage, setNewNewsImage] = useState(null);

    // State for news articles list
    const [newsArticles, setNewsArticles] = useState([]);

    // State for receipt search
    const [receiptSearchTerm, setReceiptSearchTerm] = useState('');

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            setUser(JSON.parse(userDataString));
        }
        const allOrders = getAllOrders();
        const financeStats = getFinanceStats();

        setNewsArticles(getNews());
        setDashboardStats({ ...financeStats, totalOrders: allOrders.length });
    }, []);


    const compressImage = (file, callback) => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Get the data-URL with JPEG format and a quality level (e.g., 0.7 for 70% quality)
                callback(canvas.toDataURL('image/jpeg', 0.7));
            };
        };
        reader.readAsDataURL(file);
    };

    const handleAddNewProduct = (e) => {
        e.preventDefault();

        if (newProductImage) {
            compressImage(newProductImage, (compressedBase64) => {
                const newProduct = addProduct(newProductName, parseFloat(newProductPrice), parseInt(newProductStock, 10), newProductDescription, compressedBase64);
                setProductStock(prev => [newProduct, ...prev]);
                resetProductForm();
            });
        } else {
            // Add product without a custom image
            const newProduct = addProduct(newProductName, parseFloat(newProductPrice), parseInt(newProductStock, 10), newProductDescription, null);
            setProductStock(prev => [newProduct, ...prev]);
            resetProductForm();
        }
    };

    const resetProductForm = () => {
        setNewProductName(''); setNewProductPrice(''); setNewProductStock(''); setNewProductDescription(''); setNewProductImage(null);
        document.getElementById('productImage').value = null; // Clear file input
    }

    const handleAddNewNews = (e) => {
        e.preventDefault();
        if (!user) {
            alert('Could not identify admin user.');
            return;
        }

        if (newNewsImage) {
            compressImage(newNewsImage, (compressedBase64) => {
                addNews(newNewsTitle, newNewsSummary, user.name, compressedBase64);
                alert('News article added successfully!');
                resetNewsForm();
            });
        } else {
            addNews(newNewsTitle, newNewsSummary, user.name, null);
            alert('News article added successfully!');
            resetNewsForm();
        }
    };

    const resetNewsForm = () => {
        setNewNewsTitle('');
        setNewNewsSummary('');
        setNewNewsImage(null);
        document.getElementById('newsImage').value = null; // Clear file input
    };

    const handleDeleteNews = (newsId) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            deleteNews(newsId);
            setNewsArticles(currentArticles => currentArticles.filter(a => a.id !== newsId));
            alert('News article deleted successfully!');
        }
    };

    const handleReceiptSearch = (e) => {
        e.preventDefault();
        if (!receiptSearchTerm.trim()) return;

        const allOrders = getAllOrders();
        const foundOrder = allOrders.find(order => order.id.toLowerCase() === receiptSearchTerm.trim().toLowerCase());

        if (foundOrder) {
            navigate(`/order/${foundOrder.id}`);
        } else {
            alert(`Receipt with ID "${receiptSearchTerm}" not found.`);
        }
    };

    const handleDeleteProduct = (productId) => {
        // แสดงกล่องข้อความยืนยันก่อนลบ
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            deleteProduct(productId);
            setProductStock(currentStock => currentStock.filter(p => p.id !== productId));
        }
    };

    const handleOrderStock = (productId, quantity) => {
        const amount = parseInt(quantity, 10);
        if (!amount || amount <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        if (window.confirm(`Are you sure you want to order ${amount} more units for this product?`)) {
            setProductStock(currentStock =>
                currentStock.map(product => {
                    if (product.id === productId) {
                        const newStock = product.stock + amount;
                        let newStatus = 'In Stock';
                        if (newStock > 0 && newStock <= 5) {
                            newStatus = 'Low Stock';
                        }
                        return { ...product, stock: newStock, status: newStatus };
                    }
                    return product;
                })
            );
        }
    };

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock': return 'bg-green-100 text-green-800';
            case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
            case 'Out of Stock': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <Link to="/" className="text-sm text-blue-600 hover:underline">← Back to Site</Link>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(dashboardStats.revenue)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(dashboardStats.expenses)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">Net Profit</h3>
                        <p className="mt-2 text-3xl font-bold text-green-600">{formatCurrency(dashboardStats.profit)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                        <Link to="/admin/all-orders" className="mt-2 text-3xl font-bold text-gray-900 hover:underline">
                            {dashboardStats.totalOrders}
                        </Link>
                    </div>
                </div>

                {/* Find Receipt Form */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Find Customer Receipt</h2>
                    <form onSubmit={handleReceiptSearch} className="flex items-center space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="receiptId" className="sr-only">Receipt ID</label>
                            <input type="text" id="receiptId" value={receiptSearchTerm} onChange={(e) => setReceiptSearchTerm(e.target.value)} placeholder="Enter Receipt No. (e.g., THPC-2023-001)" required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <button type="submit" className="py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900">
                            Search
                        </button>
                    </form>
                </div>

                {/* Add New Product Form */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Product</h2>
                    <form onSubmit={handleAddNewProduct} className="space-y-4">
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" id="productName" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input type="number" id="productPrice" step="0.01" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input type="number" id="productStock" value={newProductStock} onChange={(e) => setNewProductStock(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="productDescription" rows="3" value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        </div>
                        <div>
                            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Image</label>
                            <input type="file" id="productImage" onChange={(e) => setNewProductImage(e.target.files[0])} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="w-full md:w-auto justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>

                {/* Add New News Form */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Add IT News Article</h2>
                    <form onSubmit={handleAddNewNews} className="space-y-4">
                        <div>
                            <label htmlFor="newsTitle" className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" id="newsTitle" value={newNewsTitle} onChange={(e) => setNewNewsTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="newsImage" className="block text-sm font-medium text-gray-700">Featured Image</label>
                            <input type="file" id="newsImage" onChange={(e) => setNewNewsImage(e.target.files[0])} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                        </div>
                        <div>
                            <label htmlFor="newsSummary" className="block text-sm font-medium text-gray-700">Summary</label>
                            <textarea id="newsSummary" rows="3" value={newNewsSummary} onChange={(e) => setNewNewsSummary(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="w-full md:w-auto justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Publish Article</button>
                        </div>
                    </form>
                </div>

                {/* News Management Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">News Article Management</h2>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {newsArticles.map((article) => (
                                <tr key={article.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{article.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleDeleteNews(article.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Product Stock Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Product Stock Management</h2>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order Stock
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {productStock.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.price)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                min="1"
                                                defaultValue="10"
                                                className="w-16 text-center border border-gray-300 rounded-md py-1 text-xs"
                                                id={`order-qty-${product.id}`}
                                            />
                                            <button onClick={() => handleOrderStock(product.id, document.getElementById(`order-qty-${product.id}`).value)} className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700">Order</button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
