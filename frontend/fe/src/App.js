import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { privateRoutes, publicRoutes, privateAdminRoutes } from "./configs/routeConfig";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import HomePage from "./pages/HomePage";

import AIChatBubble from "./components/chatAi/AIChatBubble";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { token } = useContext(DataContext);

  // quản lý token admin bằng state (quan trọng)
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));

  // cập nhật state nếu localStorage thay đổi
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    setAdminToken(storedToken);
  }, []);

  return (
    <>
    <AIChatBubble />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}

        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={token ? route.element : <Navigate to="/login" replace />}
          />
        ))}

        {/* ⭐ ADMIN PROTECT */}
        {privateAdminRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              adminToken ? route.element : <Navigate to="/admin/login" replace />
            }
          />
        ))}
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
