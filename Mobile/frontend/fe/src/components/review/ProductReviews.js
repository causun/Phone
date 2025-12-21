import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductReviews.css";

export default function ProductReviews({ user }) {

  // ⭐ lấy productId từ URL
  const { productId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    if (!productId) return;

    const token = localStorage.getItem("trip-token");

    const res = await axios.get(
      `http://localhost:8080/api/reviews/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const submit = async () => {
    const token = localStorage.getItem("trip-token");

    await axios.post(
      `http://localhost:8080/api/reviews/${productId}`,
      { rating, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setComment("");
    setRating(5);
    fetchReviews();
  };

  return (
    <div className="review-box">
      <h3>Đánh giá sản phẩm</h3>

      {/* form chỉ hiện khi user login */}
      {user && (
        <div className="write-review">

          {/* chọn sao */}
          <div className="stars">
            {[1,2,3,4,5].map((s)=>(
              <span
                key={s}
                className={s <= rating ? "active" : ""}
                onClick={()=>setRating(s)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Viết cảm nhận của bạn..."
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
          />

          <button onClick={submit}>Gửi đánh giá</button>
        </div>
      )}

      {/* danh sách đánh giá */}
      <div className="list-review">
        {reviews.map(r => (
          <div key={r.id} className="review-item">
            <div className="name">{r.userName}</div>

            <div className="stars small">
              {[1,2,3,4,5].map((s)=>(
                <span
                  key={s}
                  className={s<=r.rating ? "active" : ""}
                >
                  ★
                </span>
              ))}
            </div>

            <span className="time">
              {new Date(r.createdAt).toLocaleString()}
            </span>

            <div className="comment">{r.comment}</div>

            {r.adminReply && (
              <div className="admin-reply">
                <b>Phản hồi từ shop: </b>{r.adminReply}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
