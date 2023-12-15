import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import Alert from "../common/Alert";

/** Update user form.
 * updates only: 
 * - first name
 * - last name
 * - email
 * - location
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - updates user in the database
 * - redirects to /users/:id route
 *
 
 */

function UpdateUser() {
  const { auth } = useAuth();
  const { userId } = useParams();

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState();
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();
  const userRef = useRef();

  const END_POINT = `users/${userId}`;
  const TOKEN = auth.token;

  console.log("Update user----------------------");
  console.log("User id:", userId);
  console.log("URL", END_POINT);
  console.log("Update user----------------------");

  //   Get user from DB
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(END_POINT, config);
        setUserData(response.data);
        setFormData(response.data);
        console.log("Get user by id response.data", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserById();
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  /** Handle form submit: */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const response = await axios.patch(END_POINT, formData, config);
      // const user = response.data.user;
      console.debug(response.data);
      navigate(`/users/${userId}`);
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
    console.log(evt.target.name);
    console.log(evt.target.value);
  }

  return (
    <>
      <div className="UpdateUser">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h1 className="mb-3">Update user</h1>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-end m-2">
                <Link
                  to={`/users/${userId}`}
                  className="btn btn-secondary btn-sm mt-2"
                >
                  Cancel
                </Link>
              </div>
              <form onSubmit={handleSubmit}>
                {/* <div
                  className={
                    auth?.user?.is_admin ? `form-group` : "form-group hidden"
                  }
                >
                  <label>Username*</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    ref={userRef}
                    className="form-control"
                    value={formData?.username}
                    onChange={handleChange}
                    autoComplete="off"
                    
                  />
                </div>
                <div
                  className={
                    auth?.user?.is_admin ? `form-group` : "form-group hidden"
                  }
                >
                  <label>Password*</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData?.password}
                    onChange={handleChange}
                    autoComplete="off"
                    
                  />
                </div> */}

                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    ref={userRef}
                    value={formData?.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData?.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData?.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData?.location}
                    onChange={handleChange}
                  />
                </div>

                {/* <div className="row mt-3">
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
                </div> */}

                {formErrors.length ? (
                  <Alert type="danger" messages={formErrors} />
                ) : null}

                <button
                  type="submit"
                  className="btn btn-success float-right mt-5"
                  onSubmit={handleSubmit}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
