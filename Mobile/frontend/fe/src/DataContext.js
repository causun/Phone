// DataContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("trip-token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  /* ===== LƯU TOKEN ===== */
  useEffect(() => {
    if (token) {
      localStorage.setItem("trip-token", token);
    } else {
      localStorage.removeItem("trip-token");
      setUser(null);
    }
  }, [token]);

  /* ===== LOAD USER TỪ TOKEN ===== */
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:8080/api/auth/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.data || res.data);
      } catch (err) {
        console.error("Load user failed:", err);
        setToken(null);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [token]);

  /* ===== LOGOUT ===== */
  const logout = () => {
    localStorage.removeItem("trip-token");
    setToken(null);
    setUser(null);
  };

  return (
    <DataContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        logout,
        loadingUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
