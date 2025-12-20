// ================= USER PAGES =================
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ProfilePage from "../pages/ProfilePage";
import NewsUser from "../pages/NewsUser";
import NewsDetail from "../pages/NewsDetail";

import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import ComparePage from "../pages/ComparePage";

import ProductReviews from "../components/review/ProductReviews";
import ReviewModal from "../components/review/ReviewModal";

import AdminLoginPage from "../pages/AdminLoginPage";

import HomePageAdmin from "../admin/page/HomePageAdmin";

import ProductManagement from "../admin/product/ProductManagement";
import AddProduct from "../admin/product/AddProduct";
import EditProduct from "../admin/product/EditProduct";

import AdminOrdersPage from "../admin/page/AdminOrdersPage";
import AdminRevenuePage from "../admin/page/AdminRevenuePage";

import ReviewManagement from "../admin/review/ReviewManagement";

import NewsManagement from "../admin/news/NewsManagement";
import AddNews from "../admin/news/AddNews";
import EditNews from "../admin/news/EditNews";


export const publicRoutes = [
  { path: "/", element: <HomePage /> },

  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-register", element: <VerifyOtpPage /> },
  { path: "/verify-reset", element: <ResetPasswordPage /> },

  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/news", element: <NewsUser /> },
{ path: "/news/:id", element: <NewsDetail /> },


  { path: "/product-reviews/:productId", element: <ProductReviews /> },
  { path: "/review-modal", element: <ReviewModal /> },
  { path: "/compare", element: <ComparePage /> },

  // ADMIN LOGIN (PUBLIC)
  { path: "/admin/login", element: <AdminLoginPage /> },
];


// =================================================
// ================= PRIVATE USER =================
// =================================================

export const privateRoutes = [
  { path: "/profile", element: <ProfilePage /> },
  { path: "/change-pass", element: <ChangePasswordPage /> },
  { path: "/my-orders", element: <MyOrdersPage /> },
];


// =================================================
// ================= PRIVATE ADMIN =================
// =================================================

export const privateAdminRoutes = [
  { path: "/admin", element: <HomePageAdmin /> },

  // ===== PRODUCT =====
  { path: "/admin/products", element: <ProductManagement /> },
  { path: "/admin/products/add", element: <AddProduct /> },
  { path: "/admin/products/edit/:id", element: <EditProduct /> },

  // ===== ORDERS =====
  { path: "/admin/orders", element: <AdminOrdersPage /> },

  // ===== REVENUE =====
  { path: "/admin/revenue", element: <AdminRevenuePage /> },

  // ===== REVIEWS =====
  { path: "/admin/reviews", element: <ReviewManagement /> },

  // ===== NEWS =====
  { path: "/admin/news", element: <NewsManagement /> },
  { path: "/admin/news/add", element: <AddNews /> },
  { path: "/admin/news/edit/:id", element: <EditNews /> },
];
