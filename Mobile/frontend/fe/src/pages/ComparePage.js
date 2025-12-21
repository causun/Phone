import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/page/PageHeader";
import "../css/page/ComparePage.css"

export default function ComparePage() {

  const navigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const id1 = params.get("p1");
  const id2 = params.get("p2");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);


  /** GET USER */
  useEffect(() => {
    const token = localStorage.getItem("trip-token");
    if (!token) return;

    axios.get("http://localhost:8080/api/auth/user/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUser(res.data.data))
      .catch(() => setUser(null));
  }, []);



  /** GET COMPARE DATA */
  useEffect(() => {
    if (!id1 || !id2) return;

    axios.get("http://localhost:8080/api/compare", {
      params: { p1: id1, p2: id2 }
    })
      .then(res => {
        console.log("COMPARE:", res.data);
        setResult(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [id1, id2]);


  /** LOADING / ERROR */
  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (!result) return <div className="error">Không lấy được dữ liệu!</div>;


  const p1 = result.p1;
  const p2 = result.p2;


  return (
    <div className="compare-page">

      {/* TRUYỀN USER */}
      <PageHeader user={user} />


      <div className="compare-wrapper">
        <h1 className="title">🔍 So sánh sản phẩm</h1>


        {/* HAI SẢN PHẨM */}
        <div className="compare-products">
          {[p1, p2].map((p, index) => (
            <div key={index} className="product-card">

              <img
                src={p.imageUrls?.[0] || "/no-image.png"}
                alt={p.name}
                className="product-img"
              />

              <h3 className="product-name">{p.name}</h3>
              <p className="product-price">
                {Number(p.price).toLocaleString()}₫
              </p>
            </div>
          ))}
        </div>



        {/* THÔNG SỐ */}
        <div className="spec-box">
          <h2 className="spec-title">📌 Thông số kỹ thuật</h2>

          <table className="spec-table">
            <tbody>
              {[
                ["Giá", p1.price, p2.price],
                ["RAM", p1.ram, p2.ram],
                ["Bộ nhớ", p1.storage, p2.storage],
                ["Chipset", p1.chipset, p2.chipset],
                ["Camera", p1.camera, p2.camera],
                ["Pin", p1.battery, p2.battery],
                ["Màn hình", p1.screenSize, p2.screenSize],
                ["Màu sắc", p1.color, p2.color],
              ].map(([label, v1, v2], i) => (
                <tr key={i}>
                  <td className="label">{label}</td>
                  <td className="value">{v1}</td>
                  <td className="value">{v2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {/* AI KẾT LUẬN */}
        <div className="ai-box">
          <h2>🤖 Kết luận của AI</h2>
          <p className="ai-text">{result.aiConclusion}</p>

          {/* QUAY TRỞ LẠI */}
          <button
            className="btn-back"
            onClick={() => navigate(-1)}
          >
            ← Quay lại
          </button>
        </div>

      </div>
    </div>
  );
}
