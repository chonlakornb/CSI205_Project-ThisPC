import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../data/products';
import { getImage } from '../../data/imageStore';

function LaptopPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลสินค้าล่าสุดจาก localStorage เมื่อ component โหลด
        setProducts(getProducts());
    }, []);

    const FILTERS_DATA = {
        Category: [
            { name: 'Custom PCs', count: 15 }, 
            { name: 'PC Cases', count: 40 }, 
            { name: 'HP/Compact PCS', count: 1 }
        ],
        Price: [
            { name: '$0.00 - $1,000.00', count: 19 },
            { name: '$1,000.00 - $2,000.00', count: 21 },
            { name: '$2,000.00 - $3,000.00', count: 9 },
            { name: '$3,000.00 - $4,000.00', count: 6 },
            { name: '$4,000.00 - $5,000.00', count: 5 },
            { name: '$5,000.00 - $6,000.00', count: 1 },
            { name: '$7,000.00 And Above', count: 1 },
        ],
    };

    const BRANDS_LOGOS = [
        { name: 'MSI', url: 'https://via.placeholder.com/60x20/000.png?text=MSI' },
        { name: 'Corsair', url: 'https://via.placeholder.com/60x20/000.png?text=Corsair' },
        { name: 'Thermaltake', url: 'https://via.placeholder.com/60x20/000.png?text=TT' },
        { name: 'ADATA', url: 'https://via.placeholder.com/60x20/000.png?text=ADATA' },
        { name: 'GIGABYTE', url: 'https://via.placeholder.com/60x20/000.png?text=GIGABYTE' },
    ];

    // State สำหรับการจัดการหน้า (Pagination)
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFiltersCount, setActiveFiltersCount] = useState(2); // Mock: 2 filters applied
    
    // Helper Function: สร้าง URL รูปภาพสุ่มและจัดรูปแบบราคา
    const getItemProps = (id, price) => ({
      imageUrl: `https://picsum.photos/180/100?random=${id}`, 
      priceFormatted: `${price.toFixed(2)} ฿`,
    });

    // Helper Function: แสดงดาว
    const renderRating = (score) => {
      const fullStars = '★'.repeat(score);
      const emptyStars = '☆'.repeat(5 - score);
      return (
        <div className="flex items-center justify-center space-x-1 text-[10px] my-0.5">
          {/* Reviews Text */}
          <span className="text-gray-500 mr-1">[Reviews (4)]</span>
          {/* Stars */}
          <span className="text-yellow-500">{fullStars}</span>
          <span className="text-gray-400">{emptyStars}</span>
        </div>
      );
    };

    // Helper Function: Product Card (สำหรับการ Map สินค้า)
    const renderProductCard = (product) => {
        const productProps = getItemProps(product.id, product.price);
        
        return (
            <Link to={`/product/${product.id}`} key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-2 text-center flex-shrink-0">
            {/* Card Container: w-1/6 (6 คอลัมน์) */}
            <div 
                className="h-full"
                style={{ width: '100%' }} 
            >
                <div className="bg-white p-3 border border-gray-100 h-full relative group">
                    
                    {/* Badge */}
                    {product.inStock ? (
                        <span className="absolute top-0 left-0 bg-white text-green-500 text-xs px-1 py-0.5 font-semibold">In stock</span>
                    ) : (
                        <span className="absolute top-0 left-0 bg-white text-red-500 text-xs px-1 py-0.5 font-semibold">Out of stock</span>
                    )}

                    {/* Image */}
                    <img src={getImage(product.id) || productProps.imageUrl} alt={product.name} className="w-full h-28 object-contain mb-2 mx-auto" />
                    
                    {/* Details */}
                    {renderRating(product.rating)}
                    <p className="text-[11px] text-gray-800 font-semibold my-0.5 leading-tight">{product.name}</p>
                    <p className="text-[10px] text-gray-500 h-6 overflow-hidden leading-tight">{product.description}</p>
                    
                    {/* Price */}
                    <p className="mt-1 text-sm text-red-600 font-extrabold">{productProps.priceFormatted}</p>
                    <p className="text-[10px] text-gray-500 line-through mt-0.5">{`${product.oldPrice.toFixed(2)} ฿`}</p>
                </div>
            </div>
            </Link>
        );
    };

    // Helper Function: Render Filter Section
    const renderFilterSection = (title, data) => (
        <div className="py-2 border-b border-gray-300">
            <h3 className="text-xs font-bold mb-2">{title}</h3>
            {data.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-[11px] py-1 cursor-pointer text-gray-700 hover:text-red-600">
                    <span>{item.name}</span>
                    <span className="text-gray-500">{item.count}</span>
                </div>
            ))}
        </div>
    );
    
    // -----------------------------------------------------
    // ส่วนแสดงผลหลัก (Return Block)
    // -----------------------------------------------------
    return (
        <div className="font-sans min-h-screen bg-white">
            
            {/* 1. ASUS TUF Banner ด้านบนสุด */}
            <div className="bg-black h-16 flex items-center justify-center mb-4 relative" style={{ backgroundImage: `url('https://picsum.photos/1200/100?random=12')`, backgroundSize: 'cover' }}>
                 <div className="absolute inset-0 bg-black opacity-80"></div>
                 <p className="relative z-10 text-lg text-white font-bold tracking-widest">ASUS TUF GAMING FX505</p>
                 <button className="relative z-10 ml-8 px-4 py-1 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700">SHOP NOW</button>
            </div>

            {/* 2. Main Content Container */}
            <div className="max-w-7xl mx-auto p-4 bg-white">
                
                {/* Header (MSI PS Series & Items found) */}
                <div className="flex justify-between items-center pb-2 mb-4">
                    <h1 className="text-lg font-bold text-gray-800">MSI PS Series (20)</h1>
                    {/* Sort By & Items Count */}
                    <div className="flex items-center text-sm space-x-2">
                         <p className="text-xs text-gray-600">Items 1-20 of 125</p>
                        <label className="text-gray-600 text-xs ml-4">Sort By:</label>
                        <select className="border border-gray-300 p-1 text-xs rounded text-gray-700">
                            <option>Position</option>
                            <option>Price</option>
                            <option>Name</option>
                        </select>
                    </div>
                </div>
                
                {/* Content: Filters (ซ้าย) & Products (ขวา) */}
                <div className="flex flex-col lg:flex-row">
                    
                    {/* A. Filters Panel (ซ้าย) */}
                    <div className="w-full lg:w-[220px] pr-6 mb-6 lg:mb-0 flex-shrink-0">
                        
                        {/* Back & Clear Filters */}
                        <div className="flex justify-between text-sm mb-4 border-b border-gray-300 pb-2">
                            <Link to="/back" className="text-gray-700 font-medium text-xs hover:text-red-600">&lt; Back</Link>
                            <button className="text-gray-700 font-medium text-xs hover:text-red-600">Clear Filter</button>
                        </div>
                        
                        {/* Title Filters */}
                        <p className="text-xs font-bold mb-3">Filters</p>

                        {/* Filter Section: Category */}
                        {renderFilterSection("Category", FILTERS_DATA.Category)}

                        {/* Filter Section: Price */}
                        {renderFilterSection("Price", FILTERS_DATA.Price)}

                        {/* Filter Name */}
                        <div className="py-2 border-b border-gray-300">
                            <h3 className="text-xs font-bold mb-2">Filter name</h3>
                            <input type="text" className="w-full text-xs p-1 border border-gray-300 rounded" />
                        </div>
                        
                        {/* Apply Filters Button */}
                        <button className="mt-4 w-full bg-blue-600 text-white py-2 text-xs font-semibold rounded hover:bg-blue-700">
                            Apply Filters ({activeFiltersCount})
                        </button>
                        
                        {/* Brands Section */}
                        <div className="py-4 mt-2">
                            <h3 className="text-xs font-bold mb-3">Brands</h3>
                            <div className="space-y-1">
                                {/* Brand Filter Buttons (All Brands) */}
                                <button className="w-full py-1 border border-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-100">
                                    All Brands
                                </button>
                                {/* Logos (ตามรูป) */}
                                {BRANDS_LOGOS.map((brand) => (
                                    <div key={brand.name} className="flex items-center space-x-2 py-1 cursor-pointer">
                                        {/* ใช้ Link แทนรูปภาพโลโก้จริง */}
                                        <div className="w-12 h-4 border border-gray-200 bg-gray-50 flex items-center justify-center">
                                            <span className="text-[8px] font-bold text-gray-700">{brand.name}</span>
                                        </div>
                                        <span className="text-xs font-medium text-gray-700">{brand.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* B. Products Listing (ขวา) */}
                    <div className="w-full lg:w-4/5">
                        
                        {/* Product Grid (Row-wise) */}
                        <div className="flex flex-wrap -m-2">
                            {products.map(renderProductCard)}
                        </div>
                        
                        {/* Pagination (ล่างสุด) */}
                        <div className="mt-8 flex justify-center space-x-1">
                            {/* Previous */}
                            <button className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100">&lt;</button>
                            {/* Page Numbers */}
                            <button className="px-3 py-1 text-sm bg-red-600 text-white font-bold border border-red-600 rounded-lg">1</button>
                            <button className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100" onClick={() => setCurrentPage(2)}>2</button>
                            <button className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100" onClick={() => setCurrentPage(3)}>3</button>
                            <span className="px-3 py-1 text-sm text-gray-700">...</span>
                            <button className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">16</button>
                            {/* Next */}
                            <button className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100">&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LaptopPage;