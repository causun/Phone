import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("trip-token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cart, setCart] = useState([]);

  // Quản lý lưu/xóa Token
  useEffect(() => {
    if (token) {
      localStorage.setItem("trip-token", token);
    } else {
      localStorage.removeItem("trip-token");
      setUser(null);
      setCart([]);
    }
  }, [token]);

  // Hàm lấy giỏ hàng từ API
const fetchCart = useCallback(async () => {
  if (!token) return;
  try {
    const res = await axios.get("http://localhost:8080/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const actualData = res.data.data || res.data;
    // Chỉ cập nhật nếu dữ liệu thực sự khác để tránh render thừa
    setCart(actualData); 
  } catch (err) {
    console.error("Fetch cart failed:", err);
  }
}, [token]);
const updateUser = (updatedUser) => {
  setUser(updatedUser);
};


  // Load thông tin User khi có token
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoadingUser(false);
        return;
      }
      try {
        const res = await axios.get("http://localhost:8080/api/auth/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data.data || res.data;
        setUser(userData);
      } catch (err) {
        console.error("Load user failed:", err);
        setToken(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [token]);

  // Tự động tải giỏ hàng khi user đã log in thành công
  useEffect(() => {
    if (user && token) {
      fetchCart();
    }
  }, [user, token, fetchCart]);

  const logout = () => {
    setToken(null);
    setUser(null);
    setCart([]);
    localStorage.removeItem("trip-token");
  };

  return (
    <DataContext.Provider 
      value={{ 
        token, setToken, 
        user, setUser, 
        updateUser,
        logout, loadingUser, 
        cart, setCart, 
        fetchCart 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};