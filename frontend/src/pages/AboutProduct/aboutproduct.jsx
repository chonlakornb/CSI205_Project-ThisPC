import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts } from '../../data/products';
import { getImage } from '../../data/imageStore';
import { addToCart } from '../../data/cart';

function AboutProduct() {

    const { productId } = useParams();
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const products = getProducts();
        const product = products.find(p => p.id.toString() === productId);
        setProductData(product);
    }, [productId]);

    const colorOptions = ['#333', '#1e40af', '#d97706']; // สีดำ, น้ำเงิน, ส้ม
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (productData) {
            addToCart(productData, quantity);
            alert(`${quantity} x ${productData.name} added to cart!`);
        }
    };


    // -----------------------------------------------------
    // 2. ส่วนแสดงผลหลัก (Return Block)
    // -----------------------------------------------------
    return (
        <div className="font-sans min-h-screen bg-white">
            
            {/* 1. ส่วน Header/Navbar ด้านบน */}
            <header className="w-full bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
                    
                    {/* เมนูนำทางย่อย */}
                    <nav className="flex space-x-6 text-sm">
                        <span className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">About Product</span>
                        <Link to="#details" className="text-gray-700 hover:text-blue-600">Details</Link>
                        <Link to="#specs" className="text-gray-700 hover:text-blue-600">Specs</Link>
                    </nav>

                    {/* ตะกร้าสินค้าและราคา */}
                    <div className="flex items-center space-x-4">
                        {productData && (
                            <>
                                <span className="text-sm text-gray-700">On Sale from</span>
                                <span className="text-xl font-bold text-gray-900">{productData.price.toFixed(2)} ฿</span>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-16 text-center border border-gray-300 rounded-md py-1 text-sm" />
                                <button onClick={handleAddToCart} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150 shadow-md">
                                    Add to Cart
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* 2. ส่วนรายละเอียดสินค้าหลัก (Main Product Content) */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
                
                {/* Breadcrumbs */}
                <div className="text-xs text-gray-500 mb-6">
                    <Link to="/" className="hover:text-blue-600">Home</Link> 
                    <span className="mx-1">/</span> 
                    <Link to="/laptop" className="hover:text-blue-600">Laptops</Link> 
                    <span className="mx-1">/</span> 
                    <span>{productData ? productData.name : 'Product'}</span>
                </div>

                {/* จัดการกรณีไม่พบสินค้า */}
                {!productData ? (
                    <div className="text-center py-20">
                        <h1 className="text-2xl font-bold">ไม่พบสินค้า</h1>
                        <p className="text-gray-600 mt-2">ขออภัย ไม่พบสินค้าที่คุณกำลังค้นหา</p>
                        <Link to="/laptop" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                            กลับไปหน้าสินค้า
                        </Link>
                    </div>
                ) : (
                <>
                    {/* รายละเอียดสินค้าและรูปภาพ */}
                    <div className="flex flex-col lg:flex-row bg-white p-8 shadow-sm">
                        
                        {/* A. ข้อมูลสินค้าด้านซ้าย */}
                        <div className="lg:w-3/5 pr-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{productData.name}</h1>
                            <p className="text-sm text-blue-600 mb-8 cursor-pointer hover:underline">Be the first to review this product</p>
                            
                            <p className="text-base text-gray-700 mb-6 leading-relaxed">
                                {productData.description}
                            </p>

                            {/* ตัวเลือกสี */}
                            <div className="flex space-x-3 mb-6">
                                {colorOptions.map((color, index) => (
                                    <div 
                                        key={index}
                                        className={`w-6 h-6 rounded-full border-2 ${index === 0 ? 'border-gray-800' : 'border-transparent'} cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-400`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>

                            <span className="text-xs text-gray-400">SKU: MSI-PRO-{productData.id}</span>
                        </div>

                        {/* B. รูปภาพสินค้าด้านขวา */}
                        <div className="lg:w-2/5 flex flex-col items-center justify-center relative mt-8 lg:mt-0">
                            <img 
                                src={getImage(productData.id) || `https://picsum.photos/300/400?random=${productData.id}`}
                                alt={productData.name} 
                                className="max-h-96 object-contain"
                            />
                            {/* จุดนำทางรูปภาพ */}
                            <div className="absolute bottom-0 right-0 flex space-x-2 mr-10 mb-4">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </>
                )}
            </main>

            {/* 3. ส่วนโปรโมชั่น/รายละเอียดเพิ่มเติม (Outplay the Competition) */}
            {productData && (
                <section className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
                        
                        {/* A. ข้อความโปรโมชั่น */}
                        <div className="lg:w-1/2 pr-10 mb-8 lg:mb-0">
                            <h2 className="text-5xl font-extrabold mb-6">Outplay the Competition</h2>
                            <p className="text-lg mb-4 leading-relaxed">
                                Experience a **40% boost in computing** from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.
                            </p>
                            <p className="text-xs text-gray-400">
                                *Performance compared to i7-9700. Specs varies by model.
                            </p>
                        </div>

                        {/* B. รูปภาพ Intel Core i7 */}
                        <div className="lg:w-1/2 flex justify-center relative">
                            <img 
                                src="https://www.intel.com/content/dam/www/public/us/en/images/products/processors/core-i7-10th-gen-boxed.png" 
                                alt="Intel Core i7 10th Gen" 
                                className="max-w-xs object-contain"
                            />
                            {/* จุดนำทางสไลด์ (ล่างซ้าย) */}
                            <div className="absolute bottom-0 left-0 flex space-x-2 ml-4">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}

export default AboutProduct;