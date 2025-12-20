import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeUser from "./pages/user/HomeUser";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/products/ProductManagement";
import AddProduct from "./pages/admin/products/AddProduct";
import EditProduct from "./pages/admin/products/EditProduct";

import CategoryManagement from "./pages/admin/categorys/CategoryManagement";
import CategoryForm from "./pages/admin/categorys/CategoryForm";

import NewsManagement from "./pages/admin/news/NewsManagement";
import AddNews from "./pages/admin/news/AddNews";
import EditNews from "./pages/admin/news/EditNews";

import OrderManagement from "./pages/admin/OrderManagement";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


import ProductsPage from "./pages/user/ProductsPage";
import ProductDetailPage from "./pages/user/ProductDetailPage";

import NewsUser from "./pages/user/NewsUser";
import NewsDetail from "./pages/user/NewsDetail";

import ContactPage from "./pages/user/ContactPage";

import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Orders from "./pages/user/Orders";

import OrderAdmin from "./pages/admin/orders/OrderAdmin";
import OrderDetailPage from "./pages/admin/orders/OrderDetailPage";

import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Profile from "./pages/user/Profile";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN PRODUCTS */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <ProductManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <AddProduct />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <EditProduct />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN CATEGORIES */}
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <CategoryManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories/add"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <CategoryForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories/edit/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <CategoryForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN NEWS */}
        <Route
          path="/admin/news"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <NewsManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/news/add"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <AddNews />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/news/edit/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <EditNews />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ORDERS */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <OrderManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* USER HOME */}
        <Route
          path="/user/home"
          element={
            <ProtectedRoute role="USER">
              <HomeUser />
            </ProtectedRoute>
          }
        />


        {/* USER PRODUCTS */}
        <Route
          path="/user/products"
          element={
            <ProtectedRoute role="USER">
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/product/:id"
          element={
            <ProtectedRoute role="USER">
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />


        {/* USER NEWS */}
        <Route
          path="/user/news"
          element={
            <ProtectedRoute role="USER">
              <NewsUser />
            </ProtectedRoute>
          }
        />

        {/* USER NEWS DETAIL */}
        <Route
          path="/user/news/:id"
          element={
            <ProtectedRoute role="USER">
              <NewsDetail />
            </ProtectedRoute>
          }
        />

        {/* trang <Routes> */}
        <Route
          path="/user/contact"
          element={
            <ProtectedRoute role="USER">
              <ContactPage />
            </ProtectedRoute>
          }
        />


        {/* Giỏ hàng */}
        <Route
          path="/user/cart"
          element={
            <ProtectedRoute role="USER">
              <Cart />
            </ProtectedRoute>
          }
        />    

        {/* Thanh toán (Checkout) */}
        <Route
          path="/user/checkout"
          element={
            <ProtectedRoute role="USER">
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* Lịch sử đơn hàng */}
        <Route
          path="/user/orders"
          element={
            <ProtectedRoute role="USER">
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Quản lý đơn hàng Admin */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <OrderManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />


        {/* Chi tiết đơn hàng Admin */}
        <Route
          path="/admin/orders/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout>
                <OrderDetailPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />


        {/* OTP */}
        <Route path="/verify-otp" element={<VerifyOtp />} />


        {/* ForgotPassword */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* USER PROFILE */}
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="USER">
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
