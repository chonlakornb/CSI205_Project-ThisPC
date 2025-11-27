import {HashRouter, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react'

import Layouts from "./Layouts/layout/layout.jsx";
import Home from './pages/home/home.jsx';
import LaptopPage from './pages/Laptop/laptop.jsx';
import AboutProduct from './pages/AboutProduct/aboutproduct.jsx';
import LoginPage from './pages/Login/login.jsx';
import ProfilePage from './pages/login/profile.jsx';
import RegisterPage from './pages/Register/register.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import CartPage from './pages/Cart/CartPage.jsx';
import NewsPage from './pages/News/NewsPage.jsx';
import OrderDetailsPage from './pages/OrderDetails/OrderDetailsPage.jsx';
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx';
import StaffProtectedRoute from './components/StaffProtectedRoute.jsx';
import PosPage from './pages/Staff/PosPage.jsx';
import ReceiptPage from './pages/Receipt/ReceiptPage.jsx';
import OrderSearchPage from './pages/Staff/OrderSearchPage.jsx';
import AllOrdersPage from './pages/Admin/AllOrdersPage.jsx';
import NewsDetailsPage from './pages/NewsDetails/NewsDetailsPage.jsx';

import './App.css'

const intTab = 'home';

function App() {
  const [tab, setTab] = useState('')

  useEffect(() => {
    setTab(intTab)
  },[])

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route element={<Layouts/>}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/laptop" element={<LaptopPage />} />
            <Route path="/product/:productId" element={<AboutProduct />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/all-orders" element={<AllOrdersPage />} />
            </Route>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/it-news" element={<NewsPage />} />
            <Route path="/news/:newsId" element={<NewsDetailsPage />} />
            <Route path="/order/:orderId" element={<OrderDetailsPage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route element={<StaffProtectedRoute />}>
              <Route path="/staff/pos" element={<PosPage />} />
              <Route path="/staff/order-search" element={<OrderSearchPage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}


export default App
