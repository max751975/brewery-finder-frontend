import React, { useState, useRef, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/LoginForm.css";

const LOGIN_URL = "/auth/login";

const LoginForm = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const { setAuth } = useAuth();

  const [formData, setFormData] = useState(initialState);
  // const [formErrors, setFormErrors] = useState([]);
  const [errMsg, setErrMsg] = useState();

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formData.username, formData.password]);

  // console.debug("formData=", formData, "formErrors:", formErrors);
  console.debug("formData=", formData);

  /** Handle form submit  */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, formData);

      const token = response.data.token;
      const user = response.data.user;

      delete user.password;

      setAuth({ user, token });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));

      navigate(from, { replace: true });
      setFormData(initialState);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Wrong Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      return;
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  return (
    <>
      <div className="LoginForm">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>
        <div className="LoginForm-container container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="LoginForm-title mb-3">Log In</h2>

          <div className="LoginForm-card card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    ref={userRef}
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                {/* {formErrors?.length ? (
                <Alert type="danger" messages={formErrors.message} />
              ) : null} */}

                <button
                  type="submit"
                  className="btn btn-primary float-right mt-3"
                  onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
