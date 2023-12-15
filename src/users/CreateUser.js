import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
// import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

/** New brewery form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - creates new brewery for current user in the database
 * - redirects to /users/:userId/breweries route
 *
 
 */

function CreateUser() {
  const { auth } = useAuth();
  const NEW_USER_URL = "/users";
  const TOKEN = auth.token;
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    isAdmin: false,
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

  console.debug(
    "CreateUser",
    "new user form=",
    typeof signup,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  /** Handle form submit:
   
   */
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(evt.target);
    try {
      const response = await axios.post(NEW_USER_URL, formData, config);
      const user = response.data.user;
      console.log(JSON.stringify(response.status));
      console.log(user);
      setFormData(initialState);
      navigate("/users");
    } catch (err) {
      //   if (!err?.response) {
      //     console.log("No Server Response");
      //   }
      //   console.log(err);
      setFormErrors(err);
      return;
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
    console.log(evt.target);
  }

  return (
    <div className="CreateUser">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Create new user</h2>
        <div className="card">
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
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="row mt-3">
                <div className="col-sm-4 offset-sm-2">
                  <div className="form-check">
                    <label
                      className="form-check-label"
                      htmlFor="is-admin-switch"
                    >
                      Is Admin
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="is-admin-switch"
                        checked={formData.isAdmin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isAdmin: e.target.checked,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary float-right mt-5"
                onSubmit={handleSubmit}
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
