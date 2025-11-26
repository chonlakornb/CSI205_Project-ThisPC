import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {

  const products = [
        { name: "CHARLIE V6", color: "bg-red-600", imageUrl: "https://picsum.photos/300/400?random=1" },
        { name: "BRAVO V6", color: "bg-red-600", imageUrl: "https://picsum.photos/300/400?random=2" },
        { name: "ALPHA V6", color: "bg-purple-700", imageUrl: "https://picsum.photos/300/400?random=3" },
        { name: "ZULU V6", color: "bg-purple-700", imageUrl: "https://picsum.photos/300/400?random=4" },
    ];

  const productcard = [
    { name: "CHARLIE V6", imageUrl: "https://picsum.photos/600/400?random=1", price: "$999.00" },
    { name: "BRAVO V6", imageUrl: "https://picsum.photos/600/400?random=2", price: "$899.00" },
    { name: "ALPHA V6", imageUrl: "https://picsum.photos/600/400?random=3", price: "$799.00" },
    { name: "ZULU V6", imageUrl: "https://picsum.photos/600/400?random=4", price: "$699.00" },
    { name: "DELTA V6", imageUrl: "https://picsum.photos/600/400?random=5", price: "$599.00" },
    { name: "ECHO V6", imageUrl: "https://picsum.photos/600/400?random=6", price: "$499.00" } 
  ]

  const SERIES_TABS = [
        { id: 'GS', name: 'MSI GS Series' },
        { id: 'GT', name: 'MSI GT Series' },
        { id: 'GL', name: 'MSI GL Series' },
        { id: 'GE', name: 'MSI GE Series' },
    ];

    // ข้อมูลสินค้าจำลอง (4 ชิ้น)
    const MOCK_PRODUCTS = [
        { name: "Product A", imageUrl: "https://picsum.photos/300/200?random=1" },
        { name: "Product B", imageUrl: "https://picsum.photos/300/200?random=2" },
        { name: "Product C", imageUrl: "https://picsum.photos/300/200?random=3" },
        { name: "Product D", imageUrl: "https://picsum.photos/300/200?random=4" },
    ];

    // 1. กำหนด State สำหรับ Tab ที่เลือก
    const [activeTab, setActiveTab] = useState('GS');

  return (
    <div className="home-container p-10">
      <div className="home-image-container flex justify-center">
        <img src="../src/assets/home.png" alt="Home" className="scale-75" />
      </div>
      <div className="new-products-section w-300px">
        <h2 className="text-2xl font-bold text-left mt-1 ml-20">
          New Products
        </h2>
        <div className="flex gap-6 overflow-x-auto p-4 m-5">
          {/* Card 1 */}
          {/* <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://picsum.photos/600/400?random=1" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Product Name</h3>
              <p className="mt-1 text-gray-600">$99.99</p>
            </div>
          </div> */}
          {productcard.map((product) => (
            <div key={product.name} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="mt-1 text-gray-600">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid หลัก: 5 คอลัมน์บนจอใหญ่, 1 คอลัมน์บนจอมือถือ */}
            <div className="custom-builds-section grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-20 ">

                {/* 1. Custom Builds Section */}
                <div className="col-span-1 max-h-[450px]">
                    <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                        <img 
                            src="https://picsum.photos/600/400?random=6" 
                            alt="Custom Builds" 
                            className="w-full h-full object-cover brightness-50"
                        />
                        <div className="absolute inset-0 flex flex-col items-start justify-center p-6 text-white">
                            <h2 className="text-3xl font-bold mb-4">Custom Builds</h2>
                            <Link href="#" className="px-4 py-2 bg-purple-600 text-sm font-semibold rounded-lg">
                                See All Products
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Product Listings (วนลูปแสดงสินค้า) */}
                {products.map((product) => (
                    <div key={product.name} className="col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-4 text-center h-full">
                            <p className="text-green-600 text-xs font-semibold mb-2">🟢 In stock</p>
                            
                            {/* รูปภาพและป้ายชื่อ */}
                            <div className="relative mb-4">
                                <img 
                                    src={product.imageUrl} 
                                    alt={`${product.name} PC`} 
                                    className="w-full h-auto object-cover rounded-lg max-h-[250px]"
                                />
                                <span className={`absolute top-0 right-0 ${product.color} text-white text-sm font-bold px-3 py-1 rounded-bl-lg`}>
                                    {product.name}
                                </span>
                            </div>

                            {/* รายละเอียด */}
                            <div className="flex justify-center text-yellow-500 mb-2">
                                <span className="text-sm">★★★★</span>
                                <span className="text-gray-500 ml-2 text-xs">(4)</span>
                            </div>
                            <p className="text-sm font-medium mb-3">EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On..</p>
                            
                            {/* ราคา */}
                            <p className="text-gray-500 line-through text-sm mt-2">$499.00</p>
                            <p className="text-lg font-bold text-black">$499.00</p>
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

                {/* 2.1. Laptop Series Banner (คอลัมน์แรก) */}
                <div className="col-span-1 min-h-[350px]">
                    <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                        <img 
                            src="https://picsum.photos/600/400?random=7" 
                            alt="MSI Laptops" 
                            className="w-full h-full object-cover brightness-50"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                            <h2 className="text-4xl font-bold mb-4">MSI Laptops</h2>
                            <a href="#" className="px-4 py-2 bg-black bg-opacity-70 text-sm font-semibold rounded-md border border-white">
                                See All Products
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2.2. Product Listings (วนลูปแสดงสินค้า) */}
                {MOCK_PRODUCTS.map((product) => (
                    <div key={product.name} className="col-span-1">
                        <div className="bg-white rounded-lg p-4 text-center h-full">
                            <p className="text-green-600 text-xs font-semibold mb-2">🟢 In stock</p>
                            
                            {/* รูปภาพ */}
                            <div className="relative mb-4">
                                <img 
                                    src={product.imageUrl} 
                                    alt={`${product.name} Laptop`} 
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            </div>

                            {/* รายละเอียด */}
                            <div className="flex justify-center text-yellow-500 mb-2">
                                <span className="text-sm">★★★★★</span>
                                <span className="text-gray-500 ml-2 text-xs">(4)</span>
                            </div>
                            <p className="text-sm font-medium mb-3">EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On..</p>
                            
                            {/* ราคา */}
                            <p className="text-gray-500 line-through text-sm">$499.00</p>
                            <p className="text-lg font-bold text-black">$499.00</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 ">

                {/* 2.1. Laptop Series Banner (คอลัมน์แรก) */}
                <div className="col-span-1 min-h-[350px]">
                    <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                        <img 
                            src="https://picsum.photos/600/400?random=7" 
                            alt="MSI Laptops" 
                            className="w-full h-full object-cover brightness-50"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                            <h2 className="text-4xl font-bold mb-4">MSI Laptops</h2>
                            <a href="#" className="px-4 py-2 bg-black bg-opacity-70 text-sm font-semibold rounded-md border border-white">
                                See All Products
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2.2. Product Listings (วนลูปแสดงสินค้า) */}
                {MOCK_PRODUCTS.map((product) => (
                    <div key={product.name} className="col-span-1">
                        <div className="bg-white rounded-lg p-4 text-center h-full">
                            <p className="text-green-600 text-xs font-semibold mb-2">🟢 In stock</p>
                            
                            {/* รูปภาพ */}
                            <div className="relative mb-4">
                                <img 
                                    src={product.imageUrl} 
                                    alt={`${product.name} Laptop`} 
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            </div>

                            {/* รายละเอียด */}
                            <div className="flex justify-center text-yellow-500 mb-2">
                                <span className="text-sm">★★★★★</span>
                                <span className="text-gray-500 ml-2 text-xs">(4)</span>
                            </div>
                            <p className="text-sm font-medium mb-3">EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On..</p>
                            
                            {/* ราคา */}
                            <p className="text-gray-500 line-through text-sm">$499.00</p>
                            <p className="text-lg font-bold text-black">$499.00</p>
                        </div>
                    </div>
                ))}

            </div>

            {/* Grid หลัก: 5 คอลัมน์บนจอใหญ่, 1 คอลัมน์บนจอมือถือ */}
            <div className="custom-builds-section grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-20 ">

                {/* 1. Custom Builds Section */}
                <div className="col-span-1 max-h-[450px]">
                    <div className="relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                        <img 
                            src="https://picsum.photos/600/400?random=6" 
                            alt="Custom Builds" 
                            className="w-full h-full object-cover brightness-50"
                        />
                        <div className="absolute inset-0 flex flex-col items-start justify-center p-6 text-white">
                            <h2 className="text-3xl font-bold mb-4">Custom Builds</h2>
                            <Link href="#" className="px-4 py-2 bg-purple-600 text-sm font-semibold rounded-lg">
                                See All Products
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Product Listings (วนลูปแสดงสินค้า) */}
                {products.map((product) => (
                    <div key={product.name} className="col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-4 text-center h-full">
                            <p className="text-green-600 text-xs font-semibold mb-2">🟢 In stock</p>
                            
                            {/* รูปภาพและป้ายชื่อ */}
                            <div className="relative mb-4">
                                <img 
                                    src={product.imageUrl} 
                                    alt={`${product.name} PC`} 
                                    className="w-full h-auto object-cover rounded-lg max-h-[250px]"
                                />
                                <span className={`absolute top-0 right-0 ${product.color} text-white text-sm font-bold px-3 py-1 rounded-bl-lg`}>
                                    {product.name}
                                </span>
                            </div>

                            {/* รายละเอียด */}
                            <div className="flex justify-center text-yellow-500 mb-2">
                                <span className="text-sm">★★★★</span>
                                <span className="text-gray-500 ml-2 text-xs">(4)</span>
                            </div>
                            <p className="text-sm font-medium mb-3">EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On..</p>
                            
                            {/* ราคา */}
                            <p className="text-gray-500 line-through text-sm mt-2">$499.00</p>
                            <p className="text-lg font-bold text-black">$499.00</p>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  );
}

export default Home;
