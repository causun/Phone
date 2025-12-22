import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import PageHeader from "../components/page/PageHeader";
import { DataContext } from "../DataContext";
import "../css/page/EditProfile.css";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function EditProfile({ user, onSave, onCancel }) {
  const { updateUser } = useContext(DataContext);

  const [formData, setFormData] = useState({
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    address: user.address,
    gender: user.gender,
    file: null,
    avatarPreview: user.avatar ? user.avatar : DEFAULT_AVATAR,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        file,
        avatarPreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("email", formData.email);
      data.append("fullName", formData.fullName);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      data.append("gender", formData.gender);

      if (formData.file) data.append("file", formData.file);

      const token = localStorage.getItem("trip-token");

      const res = await axios.put(
        "http://localhost:8080/api/auth/profile",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast.success("Cập nhật hồ sơ thành công!");

        updateUser({
          ...user,
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          avatar: formData.avatarPreview,
        });

        onSave({
          ...formData,
          avatar: formData.avatarPreview,
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  return (
    <>
      <PageHeader />

      <div className="edit-profile-page">
        <div className="edit-profile-card">
          <h3 className="edit-profile-title">Edit Profile</h3>

          <form onSubmit={handleSubmit}>
            <div className="edit-avatar-wrapper">
              <img
                src={formData.avatarPreview}
                alt="avatar"
                className="edit-avatar"
              />
            </div>

            <div className="row g-3">
              <div className="col-md-6 edit-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 edit-group">
                <label>Email</label>
                <input type="email" value={formData.email} readOnly />
              </div>

              <div className="col-md-6 edit-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 edit-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 edit-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              <div className="col-md-6 edit-group">
                <label>Avatar</label>
                <input type="file" name="file" onChange={handleChange} />
              </div>
            </div>

            <div className="edit-actions">
              <button className="btn-save-profile">
                Save Changes
              </button>

              <button
                type="button"
                className="btn-cancel-profile"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default EditProfile;
