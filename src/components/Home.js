import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../CSS/Home.css";

import axios from "axios";
import BreweryModal from "./BreweryModal";

const Home = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [data, setData] = useState(null);
  const [zip, setZip] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentBrewery, setCurrentBrewery] = useState(null);
  const [didFind, setDidFind] = useState(false);

  // const user = JSON.parse(localStorage.getItem("user"));
  // const token = JSON.parse(localStorage.getItem("token"));

  // useEffect(() => {
  //   setAuth({ user, token });
  // }, []);
  // console.log("Home::::::::::: auth:", auth);

  useEffect(() => {
    if (auth?.user) {
      navigate("/user");
    }
  }, []);

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries?by_postal=${zip}&per_page=10`
      );
      console.log(response.data);
      setData(response.data);
      setDidFind(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="header mt-3">Welcome to Brewery Finder</h1>
      <div className="Home-finder-container container">
        <h4>Looking for breweries in your area?</h4>
        <form onSubmit={handleSubmit}>
          <div className="Home-form-group form-group">
            <label htmlFor="zip">5-digit zip-code:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              className="Home-form-control form-control"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <button className="btn btn-success mb-1" onSubmit={handleSubmit}>
            Find Breweries
          </button>
        </form>
        <div className="Home-table-container">
          {data?.length ? (
            <table className="Home-find-table table table-striped table-hover ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.address_1}</td>

                    <td>
                      <button
                        className="Home-modal-link badge bg-info"
                        onClick={() => {
                          setOpenModal(true);
                          setCurrentBrewery(d);
                        }}
                      >
                        View
                      </button>
                      {openModal && (
                        <BreweryModal
                          closeModal={setOpenModal}
                          brewery={currentBrewery}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            didFind && (
              <h5>Cannot find brewery in the area. Try another zip-code</h5>
            )
          )}
        </div>
        <div className="Home-links container mt-5">
          <h5>Need more?.. </h5>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
