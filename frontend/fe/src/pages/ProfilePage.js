import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import EditProfile from "./EditProfile";
import ProfileHeader from "../components/page/PageHeader";
import { DataContext } from "../DataContext";

import "../css/page/ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfile, setShowProfile] = useState(true);

  const { token } = useContext(DataContext);

  // decode token
  let email = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.sub;
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/login");
    }
  } else {
    navigate("/login");
  }

  // GET profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/api/auth/user/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [email, token]);

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("trip-token");
    navigate("/login");
  };

  if (isEditing && user) {
    return (
      <EditProfile
        user={user}
        onSave={handleSaveProfile}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid profile-container">

      <ProfileHeader
        user={user}
        onLogout={handleLogout}
        onToggleProfile={() => setShowProfile(!showProfile)}
      />

      {showProfile && (
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

              <div className="p-4 text-center text-white profile-banner">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="rounded-circle border border-4 border-white shadow mb-3 profile-avatar"
                />
                <h3 className="fw-bold mb-0">{user.fullName}</h3>
                <p className="mb-0">{user.email}</p>
              </div>

              <div className="card-body p-4">
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item px-0">
                    <strong>📞 Phone:</strong> {user.phone}
                  </li>
                  <li className="list-group-item px-0">
                    <strong>📍 Address:</strong> {user.address}
                  </li>
                  <li className="list-group-item px-0">
                    <strong>⚧ Gender:</strong> {user.gender === "MALE" ? "Male" : "Female"}
                  </li>
                  <li className="list-group-item px-0">
                    <strong>✅ Status:</strong>{" "}
                    <span className={`badge ${user.status ? "bg-success" : "bg-danger"}`}>
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </li>
                </ul>

                <div className="d-flex gap-3">
                  <button className="btn flex-fill rounded-pill shadow btn-edit-profile"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>

                  <button className="btn flex-fill rounded-pill shadow btn-change-password"
                    onClick={() => navigate("/change-pass")}
                  >
                    Change Password
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProfilePage;
