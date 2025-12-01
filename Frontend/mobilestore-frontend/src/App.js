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


        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
