import React, { useState, useEffect, useRef, useContext } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../DataContext"; // Import DataContext để lấy token nếu cần
import "./AIChatBubble.css";

const AIChatBubble = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(DataContext);
  
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Dạ, em chào Anh/Chị! Em là trợ lý ảo Mia của MobileStore. Em có thể giúp gì cho Anh/Chị ạ? ✨" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const suggestions = [
    "Điện thoại nào tầm 10 triệu?",
    "iPhone 15 giá bao nhiêu?",
    "Chính sách bảo hành như thế nào?",
    "Tư vấn máy chơi game tốt"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    // Hiển thị tin nhắn user
    const newUserMessage = { role: "user", text: messageText };
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    // Chuẩn bị lịch sử
    const chatHistory = [...messages, newUserMessage]
      .slice(-6)
      .map(m => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text
      }));

    try {
      // Dùng FETCH thay vì AXIOS để giống các trang khác của bạn
      const response = await fetch("http://localhost:8080/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Nếu API AI yêu cầu token thì dùng dòng dưới, không thì bỏ qua
          "Authorization": `Bearer ${localStorage.getItem("trip-token")}` 
        },
        body: JSON.stringify({ history: chatHistory }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Lỗi AI:", error);
      setMessages(prev => [...prev, { role: "bot", text: "Dạ, kết nối của em hơi yếu, Anh/Chị nhắn lại giúp em nhé!" }]);
    } finally {
      setLoading(false);
    }
  };

  // Logic hiển thị: Ẩn ở trang Admin
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="ai-chat-container">
      {!isOpen && (
        <button className="chat-bubble" onClick={() => setIsOpen(true)}>
          <MessageCircle size={32} />
          <div className="chat-notification">!</div>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="bot-info">
              <div className="bot-avatar"><Sparkles size={18} fill="currentColor" /></div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>Mia - Trợ lý ảo</div>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Đang trực tuyến</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={22} />
            </button>
          </div>

          <div className="chat-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`message-row ${m.role}`}>
                <div className="message-text">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="message-row bot">
                <div className="message-text" style={{ fontStyle: 'italic', color: '#94a3b8', display: 'flex', gap: '8px' }}>
                  <Loader2 className="animate-spin" size={16} /> Mia đang trả lời...
                </div>
              </div>
            )}
          </div>

          <div className="chat-suggestions">
            {suggestions.map((s, idx) => (
              <button key={idx} className="suggestion-pill" onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Hỏi Mia về sản phẩm..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-btn" onClick={() => handleSend()} disabled={loading || !input.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBubble;