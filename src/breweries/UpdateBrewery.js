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

function UpdateBrewery() {
  const { auth } = useAuth();
  const { breweryId } = useParams();

  const [breweryData, setBreweryData] = useState(null);
  const [formData, setFormData] = useState();
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();
  const nameRef = useRef();

  const END_POINT = `breweries/${breweryId}`;
  const TOKEN = auth.token;

  console.log("Update brewery----------------------");
  console.log("Brewery id:", breweryId);
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
        setBreweryData(response.data);
        setFormData(response.data[0]);
        console.log("Get brewery by id response.data", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserById();
  }, [auth.token]);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  //   console.debug(
  //     "UpdateBrewery",
  //     "new user form=",
  //     typeof signup,
  //     "formData=",
  //     formData,
  //     "formErrors=",
  //     formErrors
  //   );

  /** Handle form submit: */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const response = await axios.patch(END_POINT, formData, config);

      navigate(`/breweries/${breweryId}`);
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
  }

  return (
    <>
      <div className="UpdateBrewery">
        <div className="UpdateBrewery-container container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h1 className="mb-3">Update brewery</h1>
          <div className="UpdateBrewery-card card">
            <div className="card-body">
              <div className="d-flex justify-content-end m-2">
                <Link
                  to={
                    auth.user.is_admin
                      ? "/breweries"
                      : `/users/${auth.user.id}/breweries`
                  }
                  className="btn btn-secondary btn-sm mt-2"
                >
                  Cancel
                </Link>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    ref={nameRef}
                    value={formData?.name}
                    onChange={handleChange}
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

export default UpdateBrewery;
