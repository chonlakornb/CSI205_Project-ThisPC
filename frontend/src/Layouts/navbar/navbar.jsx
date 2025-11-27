import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../../data/cart";

function Navbar() {
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(count);
  };

  useEffect(() => {
    // ตรวจสอบข้อมูลผู้ใช้จาก localStorage เมื่อ component โหลด
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    }

    // อัปเดตจำนวนสินค้าในตะกร้า
    updateCartCount();

    // Listen for custom storage event to update cart count
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <div className="border border-solid border-gray-300 h-20 flex items-center px-4">
      <div className="flex-1">
        <Link className="text-2xl font-bold text-black" to="/">
          ThisPC
        </Link>
      </div>
      <div className="relative group inline-block pb-2">
        <Link
          className="mx-2 text-gray-700 font-medium hover:text-black transition-colors"
          to="/laptop"
        >
          Laptops
        </Link>

        {/* --- Start Mega Menu Dropdown --- */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block pt-2 z-20">
            {/* กล่องสีขาวหลัก มีเงา และขอบมน */}
            <div className="bg-white text-black shadow-xl rounded-sm border border-gray-200 w-[1100px] overflow-hidden">
                
                {/* ส่วนเนื้อหาแบ่ง 4 คอลัมน์ */}
                <div className="flex items-stretch min-h-[400px]">
                    
                    {/* Column 1: Main Categories */}
                    <div className="w-1/5 bg-gray-50 py-4">
                        <ul className="space-y-1">
                            {['Everyday Use Notebooks', 'MSI Workstation Series', 'MSI Prestige Series', 'Gaming Notebooks', 'Tablets And Pads', 'Netbooks', 'Infinity Gaming Notebooks'].map((item, idx) => (
                                <li key={idx} className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:bg-white hover:font-bold ${item === 'MSI Workstation Series' ? 'font-bold bg-white' : 'text-gray-700'}`}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Sub Categories */}
                    <div className="w-1/5 border-r border-gray-100 py-4">
                        <ul className="space-y-1">
                            {['MSI Workstation Series', 'MSI Prestige Series'].map((item, idx) => (
                                <li key={idx} className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:bg-gray-50 ${idx === 0 ? 'font-bold' : 'text-gray-700'}`}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Series List */}
                    <div className="w-1/5 border-r border-gray-100 py-4">
                         <ul className="space-y-1">
                            {[
                                { name: 'MSI WS Series', count: 12 },
                                { name: 'MSI WT Series', count: 31 },
                                { name: 'MSI WE Series', count: 7 }
                            ].map((item, idx) => (
                                <li key={idx} className="px-4 py-2 text-sm text-gray-700 hover:text-black cursor-pointer hover:font-bold">
                                    <span className="font-medium">{item.name}</span> 
                                    <span className="text-gray-400 text-xs ml-1">({item.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Product Showcase (กว้างกว่าส่วนอื่น) */}
                    <div className="w-2/5 p-6 bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Product Card 1 */}
                            {[1, 2].map((product) => (
                                <div key={product} className="flex flex-col items-center text-center">
                                    <div className="mb-2 text-xs text-green-500 flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div> in stock
                                    </div>
                                    <img 
                                        src="https://placehold.co/150x100/222/white?text=Laptop" 
                                        alt="Laptop" 
                                        className="mb-3 object-contain h-24"
                                    />
                                    <div className="flex text-yellow-400 mb-1 text-xs">
                                        <span className="text-gray-400 ml-1">Reviews (4)</span>
                                    </div>
                                    <h4 className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">
                                        EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH
                                    </h4>
                                    <div className="text-gray-400 line-through text-xs">$499.00</div>
                                    <div className="font-bold text-lg">$499.00</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Brand Logos Footer */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center bg-white">
                    {/* จำลอง Logo ด้วย Text หรือ Placeholder */}
                    <span className="text-gray-400 font-bold italic text-sm">ROCCAT</span>
                    <span className="text-black font-bold text-xl border-2 border-purple-500 px-2 py-1">msi</span>
                    <span className="text-gray-400 font-light text-sm">RAZER</span>
                    <span className="text-gray-500 font-bold text-sm">thermaltake</span>
                    <span className="text-gray-500 font-bold text-sm">ADATA</span>
                    <span className="text-gray-600 font-bold text-sm">HP</span>
                    <span className="text-black font-extrabold text-sm">GIGABYTE</span>
                </div>

            </div>
        </div>
        {/* --- End Mega Menu Dropdown --- */}

        <Link className="mx-2" to="/about">
          Desktop&nbsp;PCs
        </Link>
        <Link className="mx-2" to="/services">
          Networking Devices
        </Link>
        <Link className="mx-2" to="/contact">
          PC&nbsp;Parts
        </Link>
        <Link className="mx-2" to="/it-news">
          IT&nbsp;News
        </Link>
        <Link className="mx-2" to="/contact">
          All Other Products
        </Link>
      </div>
      <div className="flex flex-1 justify-end mr-4 items-center">
        {/* Search Icon Button */}
        <button onClick={() => setIsSearchVisible(true)} className="mx-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <Link className="mx-2 relative flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 transition-colors" to="/cart">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="hidden md:inline">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </Link>

        {/* แสดงลิงก์ Admin Dashboard ถ้า user เป็น admin */}
        {user && user.role === 'admin' && (
          <Link className="mx-2 text-sm font-semibold text-red-600 hover:text-red-700" to="/admin/dashboard">
            Dashboard
          </Link>
        )}

        {/* แสดงลิงก์ POS ถ้า user เป็น admin หรือ staff */}
        {user && (user.role === 'admin' || user.role === 'staff') && (
          <Link className="mx-2 text-sm font-semibold text-green-600 hover:text-green-700" to="/staff/pos">
            POS
          </Link>
        )}

        {user ? (
          // ถ้า login แล้ว: แสดงรูปโปรไฟล์
          <Link to="/profile" className="mx-2 flex items-center">
            <img src={user.profileImageUrl || 'https://via.placeholder.com/40'} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
          </Link>
        ) : (
          // ถ้ายังไม่ login: แสดงปุ่ม Login
          <Link className="mx-2 px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors" to="/login">
            Login
          </Link>
        )}
      </div>

      {/* Hidden Search Overlay */}
      {isSearchVisible && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex justify-center items-start pt-20 transition-opacity duration-300">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-blue-600 outline-none bg-transparent"
              autoFocus
            />
            <button onClick={() => setIsSearchVisible(false)} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
