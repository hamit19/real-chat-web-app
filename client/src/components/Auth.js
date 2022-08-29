import React, { useState } from "react";
import axios from "axios";
import SignInImage from "../assets/signup.jpg";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  avatarURL: "",
  phoneNumber: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const switchMode = () => {
    setIsSignup((preventProp) => !preventProp);
  };

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;

    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      fullName: form.fullName,
      username,
      password,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("avatarURL", avatarURL);
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p> {isSignup ? "Sign Up" : "Sign In"} </p>
          <form onSubmit={handelSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  onChange={handelChange}
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                onChange={handelChange}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  onChange={handelChange}
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  onChange={handelChange}
                  type="text"
                  name="avatarURL"
                  id="avatarURL"
                  placeholder="Avatar URL"
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                onChange={handelChange}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  onChange={handelChange}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            )}
            <div
              type="submit"
              className="auth__form-container_fields-content_button"
            >
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? " Already have an account?"
                : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? " Sign In " : " Sign Up "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={SignInImage} alt="Sign In" />
      </div>
    </div>
  );
};

export default Auth;
