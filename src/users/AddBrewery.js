import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import Alert from "../common/Alert";

/** New user form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - creates new user in the database
 * - redirects to /users route
 *
 
 */

function AddBrewery() {
  // const history = useHistory();

  const { auth } = useAuth();

  const { userId } = useParams();
  const NEW_BREWERY_URL = `/users/${userId}/breweries`;
  const TOKEN = auth.token;
  const initialState = {
    name: "",
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

  console.debug(
    "AddBrewery",
    "new brewery form=",
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

    try {
      const response = await axios.post(NEW_BREWERY_URL, formData, config);
      console.log(response);
      setFormData(initialState);
      navigate(`/users/${userId}/breweries`);
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
        <h1 className="mb-3">Create new brewery</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Brewery name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={userRef}
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  required
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
                  autoComplete="off"
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}
            </form>
            <button
              type="submit"
              className="btn btn-primary float-right mt-5"
              onClick={handleSubmit}
            >
              Add Brewery
            </button>
            <button
              className="btn btn-secondary float-right mt-5 ms-2"
              onClick={(e) => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBrewery;
