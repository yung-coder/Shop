import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, LoadUser } from "../../actions/useraction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";

const UpdatedProfile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(LoadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, user, isUpdated]);
  return (
    <div className="updateProfileContainer">
      <div className="updateProfileBox">
        <h2 className="updateProfileHeading">Update Profile</h2>

        <form
          className="updateProfileForm"
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
        >
          <div className="updateProfileName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="updateProfileEmail">
            <MailOutlineOutlinedIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div id="updateProfileImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateProfileDataChange}
            />
          </div>
          <input type="submit" value="Update" className="updateProfileBtn" />
        </form>
      </div>
    </div>
  );
};

export default UpdatedProfile;
