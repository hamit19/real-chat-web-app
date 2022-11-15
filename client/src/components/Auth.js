import React, { useState } from "react";
import axios from "axios";
import signupVideo from "../assets/signupVideo.mp4";
import Cookies from "universal-cookie";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

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
  const [isLoading, setIsLoading] = useState(false);

  const switchMode = () => {
    setIsSignup((preventProp) => !preventProp);
  };

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;

    if (isSignup) {
      if (!username || !password || !phoneNumber || !avatarURL) {
        toast.warn("Please fill in all the fields and try again!");
        return;
      }
    }

    if (!isSignup) {
      if (!username || !password) {
        toast.warn("Please fill in all the fields and try again!");
        return;
      }
    }

    const URL = "https://react-developers.herokuapp.com/auth";
    // const URL = "http://localhost:5000/auth";

    try {
      setIsLoading(true);
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

      toast.success(
        isSignup
          ? "Greate, you have registered successfully!"
          : "Greate, your in!"
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      err &&
        toast.error(
          err?.response?.data?.message
            ? err.response.data.message
            : "Something went wrong please try again"
        );

      setIsLoading(false);
    }
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
              <button type="submit">
                {isSignup && !isLoading
                  ? "Sign Up"
                  : !isSignup && !isLoading
                  ? "Sign In"
                  : isLoading && (
                      <ThreeDots color="#fff" height="14" width="30" />
                    )}
              </button>
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
        <video loop muted autoPlay>
          <source src={signupVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Auth;
