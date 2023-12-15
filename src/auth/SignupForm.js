import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../CSS/SignupForm.css";

// import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - adds new user to the database
 * - redirects to /login page
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm() {
  const REGISTER_URL = "/auth/register";
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    location: "",
  };
  const [formData, setFormData] = useState({
    initialState,
  });
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  console.debug("SignupForm::::", "formData=", formData);

  /** Handle form submit:
   
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const response = await axios.post(REGISTER_URL, formData);
      const user = response.data.user;
      console.log("SignUp Form response::::::::::::", response);
      console.log(user);

      navigate("/login");
      setFormData(initialState);
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      }
      console.log(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="SignupForm-container container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="SignupForm-title mb-3">Sign Up</h2>
        <div className="SignupForm-card card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username*</label>
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
                <label>Password*</label>
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

              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="location"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              {/* {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null} */}

              <button
                // disabled={true}
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
  );
}

export default SignupForm;
