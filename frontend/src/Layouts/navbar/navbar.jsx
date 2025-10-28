import { Link } from "react-router";

function Navbar() {
  return (
    <div className="border border-solid border-gray-300 h-20 flex items-center px-4">
      <div className="flex-1">
        <Link className="text-2xl font-bold text-black" to="/">
          ThisPC
        </Link>
      </div>
      <div className="flex-5 text-center">
        {/* Laptops + Dropdown */}
        <div className="relative group inline-block">
          <Link
            className="mx-2 text-gray-700 hover:text-black transition-colors"
            to="/"
          >
            Laptops
          </Link>

          {/* Dropdown */}
          <div className="absolute left-0 hidden group-hover:flex flex-col bg-white text-black min-w-[180px] shadow-lg mt-2 rounded-md z-10 opacity-0 group-hover:opacity-100 transition-all duration-200">
            {/* ข้างใน dropdown คุณใส่เองได้ */}
            <div className="px-4 py-2">Dropdown Item 1</div>
            <div className="px-4 py-2">Dropdown Item 2</div>

          </div>
        </div>
        <Link className="mx-2" to="/about">
          Desktop&nbsp;PCs
        </Link>
        <Link className="mx-2" to="/services">
          Networking Devices
        </Link>
        <Link className="mx-2" to="/contact">
          PC&nbsp;Parts
        </Link>
        <Link className="mx-2" to="/contact">
          All Other Products
        </Link>
      </div>
      <div className="flex-1">
        <Link className="mx-2" to="/about">
          search
        </Link>
        <Link className="mx-2" to="/services">
          cart
        </Link>
        <Link className="mx-2" to="/contact">
          profile
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
