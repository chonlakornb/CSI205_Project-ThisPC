import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../../data/products";
import { getImage } from '../../data/imageStore';

function Home() {
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('GS');

    useEffect(() => {
        // ดึงข้อมูลสินค้าล่าสุดจาก localStorage เมื่อ component โหลด
        setProducts(getProducts());
    }, []);

    const SERIES_TABS = [
        { id: 'GS', name: 'MSI GS Series' },
        { id: 'GT', name: 'MSI GT Series' },
        { id: 'GL', name: 'MSI GL Series' },
        { id: 'GE', name: 'MSI GE Series' },
    ];

    // Helper Function: Product Card (สำหรับการ Map สินค้า)
    const renderProductCard = (product) => {
        const customImage = getImage(product.id);
        return (
            <Link to={`/product/${product.id}`} key={product.id} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden">
                <img src={customImage || `https://picsum.photos/600/400?random=${product.id}`} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-lg font-bold text-red-600">{product.price.toFixed(2)} ฿</p>
                        {product.inStock ? (
                            <span className="text-xs text-green-600 font-semibold">In Stock</span>
                        ) : (
                            <span className="text-xs text-red-500 font-semibold">Out of Stock</span>
                        )}
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="home-container p-4 md:p-10">
            <div className="home-image-container flex justify-center">
                <img src="../src/assets/home.png" alt="Home" className="scale-75" />
            </div>

            {/* New Products Section */}
            <div className="new-products-section mt-10">
                <h2 className="text-2xl font-bold text-left mb-4">
                    New Products
                </h2>
                <div className="flex gap-6 overflow-x-auto pb-4">
                    {products.slice(0, 12).map(renderProductCard)}
                </div>
            </div>

            {/* Custom Builds Section */}
            <div className="custom-builds-section grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-20">
                <div className="col-span-1 md:col-span-3 lg:col-span-1 max-h-[450px]">
                    <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                        <img src="https://picsum.photos/600/400?random=6" alt="Custom Builds" className="w-full h-full object-cover brightness-50" />
                        <div className="absolute inset-0 flex flex-col items-start justify-center p-6 text-white">
                            <h2 className="text-3xl font-bold mb-4">Custom Builds</h2>
                            <Link to="/laptop" className="px-4 py-2 bg-purple-600 text-sm font-semibold rounded-lg">
                                See All Products
                            </Link>
                        </div>
                    </div>
                </div>
                {/* แสดงสินค้า 4 ชิ้นถัดไป */}
                {products.slice(1, 5).map((product) => (
                    <div key={product.id} className="col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-4 text-center h-full flex flex-col justify-between">
                            <div>
                                <p className="text-green-600 text-xs font-semibold mb-2">🟢 In stock</p>
                                <div className="relative mb-4">
                                    <img src={getImage(product.id) || `https://picsum.photos/300/400?random=${product.id}`} alt={product.name} className="w-full h-auto object-cover rounded-lg max-h-[250px]" />
                                </div>
                                <div className="flex justify-center text-yellow-500 mb-2">
                                    <span className="text-sm">{'★'.repeat(product.rating || 4)}</span>
                                    <span className="text-gray-400 ml-2 text-xs">(4)</span>
                                </div>
                                <p className="text-sm font-medium mb-3 h-10 overflow-hidden">{product.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 line-through text-sm mt-2">{product.oldPrice.toFixed(2)} ฿</p>
                                <p className="text-lg font-bold text-black">{product.price.toFixed(2)} ฿</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 1. Tab Navigation Bar --- */}
            <div className="flex border-b border-gray-200 mb-6 mt-20">
                {SERIES_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)} // ใช้ setActiveTab ตรงๆ
                        className={`
                            px-4 py-2 text-sm font-medium transition duration-150 ease-in-out
                            ${activeTab === tab.id 
                                ? 'text-black border-b-2 border-red-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }
                        `}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* --- 2. Product Grid Content --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="col-span-1 min-h-[350px]">
                    <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                        <img src="https://picsum.photos/600/400?random=7" alt="MSI Laptops" className="w-full h-full object-cover brightness-50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                            <h2 className="text-4xl font-bold mb-4">MSI Laptops</h2>
                            <Link to="/laptop" className="px-4 py-2 bg-black bg-opacity-70 text-sm font-semibold rounded-md border border-white">
                                See All Products
                            </Link>
                        </div>
                    </div>
                </div>
                {/* แสดงสินค้า 4 ชิ้นถัดไป */}
                {products.slice(5, 9).map((product) => (
                    <div key={product.id} className="col-span-1">
                        <div className="bg-white rounded-lg p-4 text-center h-full flex flex-col justify-between">
                            <div>
                                <p className="text-green-600 text-xs font-semibold mb-2">🟢 In stock</p>
                                <div className="relative mb-4">
                                    <img src={getImage(product.id) || `https://picsum.photos/300/200?random=${product.id}`} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
                                </div>
                                <div className="flex justify-center text-yellow-500 mb-2">
                                    <span className="text-sm">{'★'.repeat(product.rating || 5)}</span>
                                    <span className="text-gray-500 ml-2 text-xs">(4)</span>
                                </div>
                                <p className="text-sm font-medium mb-3 h-10 overflow-hidden">{product.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 line-through text-sm">{product.oldPrice.toFixed(2)} ฿</p>
                                <p className="text-lg font-bold text-black">{product.price.toFixed(2)} ฿</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
