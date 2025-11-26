import { Link } from "react-router-dom";

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
        <div className="relative group inline-block pb-2">
          <Link
            className="mx-2 text-gray-700 hover:text-black transition-colors"
            to="/"
          >
            Laptops
          </Link>

          {/* Dropdown */}
          <div className="absolute left-0 hidden group-hover:flex flex-col bg-white text-black min-w-[180px] shadow-lg mt-2 rounded-md z-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <Link
              to="/laptops/gaming"
              className="px-4 py-2 hover:bg-gray-100"
            >
              Gaming Laptops
            </Link>
            <Link
              to="/laptops/work"
              className="px-4 py-2 hover:bg-gray-100"
            >
              Laptops for Work
            </Link>
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
