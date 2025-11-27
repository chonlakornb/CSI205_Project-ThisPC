import React from 'react';

function Footer2() {

    // ข้อมูล Mock สำหรับคอลัมน์ลิงก์
    const footerColumns = [
        { 
            title: "Information", 
            links: ["About Us", "About Zip", "Privacy Policy", "Search", "Terms", "Orders and Returns", "Contact Us", "Advanced Search", "Newsletter Subscription"] 
        },
        { 
            title: "PC Parts", 
            links: ["CPUs", "Add On Cards", "Hard Drives (Internal)", "Graphic Cards", "Keyboards / Mice", "Cases / Power Supplies / Cooling", "RAM (Memory)", "Software", "Speakers / Headsets", "Motherboards"] 
        },
        { 
            title: "Desktop PCs", 
            links: ["Custom PCs", "Servers", "MSI All-in-One PCs", "HP / Compact PCs", "ASUS PCs", "Terra PCs"] 
        },
        { 
            title: "Laptops", 
            links: ["Everyday Use Notebooks", "MSI Workstation Series", "MSI Prestige Series", "Tablets and Pads", "Notebooks", "Infinity Gaming Notebooks"] 
        },
    ];

    // Helper Function: Render Link Column
    const renderLinkColumn = (title, links) => (
        <div className="w-1/2 sm:w-1/4 mb-8 sm:mb-0">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase">{title}</h3>
            <ul className="space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        {/* ใช้ Link หากคุณใช้ react-router-dom หรือใช้ <a> หากเป็นลิงก์ภายนอก */}
                        <a 
                            href={`/${link.toLowerCase().replace(/ /g, '-')}`} 
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );

    return ( 
        <div className="bg-black text-white pt-16 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* ส่วนคอลัมน์ลิงก์และที่อยู่ */}
                <div className="flex flex-wrap pb-10">
                    
                    {/* A. คอลัมน์ลิงก์ (4 คอลัมน์) */}
                    {footerColumns.map(col => renderLinkColumn(col.title, col.links))}

                    {/* B. คอลัมน์ที่อยู่ (Address) */}
                    <div className="w-full sm:w-1/4">
                        <h3 className="text-sm font-semibold text-white mb-4 uppercase">Address</h3>
                        <p className="text-xs text-gray-400 mb-4">
                            Address: 1234 Street Address City Address, 1234
                            <br />
                            Phones: <span className="text-red-500">(00) 1234 5678</span>
                        </p>
                        
                        <p className="text-xs text-gray-400 mb-4">
                            We are open Monday - Thursday: 9:00 AM - 5:00 PM
                            <br />
                            Friday: 9:00 AM - 6:00 PM
                            <br />
                            Saturday: 11:00 AM - 5:00 PM
                        </p>
                        
                        <p className="text-xs text-gray-400">
                            E-mail: <a href="mailto:shop@email.com" className="text-red-500 hover:underline">shop@email.com</a>
                        </p>
                    </div>
                </div>

                {/* เส้นแบ่ง */}
                <hr className="border-gray-800 my-4" />
                
                {/* Copyright/แถวล่างสุด */}
                <div className="py-4 text-center text-xs text-gray-600">
                    &copy; 2025 ThisPC . All rights reserved. (Layout inspired by image_dae79a.png)
                </div>
                <div className="text-center text-xs text-gray-500 pb-6 font-mono tracking-widest">
                    SPU - IT - CSI
                </div>
            </div>
        </div>
     );
}

export default Footer2;