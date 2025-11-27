import React from 'react';

function Footer1() {

    // Helper Function: Render Icon Column
    const renderIconColumn = (title, description, icon) => (
        // คอลัมน์เดียว
        <div className="flex flex-col items-center text-center p-4">
            
            {/* วงกลมไอคอนสีน้ำเงิน */}
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
                {/* ไอคอน (ใช้ emoji แทน SVG) */}
                <span className="text-4xl text-white">{icon}</span>
            </div>
            
            {/* หัวข้อ */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            
            {/* คำอธิบาย */}
            <p className="text-sm text-gray-700 max-w-xs leading-relaxed">{description}</p>
        </div>
    );

    return ( 
        <div className="bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* โครงสร้างหลัก: 3 คอลัมน์, จัดกึ่งกลาง */}
                <div className="flex flex-col md:flex-row justify-around items-start">
                    
                    {/* 1. Product Support */}
                    {renderIconColumn(
                        "Product Support",
                        "Up to 3 years on-site warranty available for your peace of mind.",
                        "🎧" // Headphone icon
                    )}
                    
                    {/* 2. Personal Account */}
                    {renderIconColumn(
                        "Personal Account",
                        "With big discounts, free delivery and a dedicated support specialist.",
                        "👤" // User/Account icon
                    )}
                    
                    {/* 3. Amazing Savings */}
                    {renderIconColumn(
                        "Amazing Savings",
                        "Up to 70% off new Products, you can be sure of the best price.",
                        "🏷️" // Tag icon
                    )}

                </div>
            </div>
        </div>
     );
}

export default Footer1;