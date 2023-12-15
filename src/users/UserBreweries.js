/**
 * List of user's breweries
 * url: /user/:userId/breweries
 *
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import "../CSS/UserBreweries.css";
import LoadingSpinner from "../common/LoadingSpinner";

const UserBreweries = () => {
  const [data, setData] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(
    "From UserBreweries---------------------------------------------"
  );
  console.log("userId::::::::::::::::::::::::::: ", userId);
  console.log("-------------------------------------------------------------");

  const END_POINT = `/users/${userId}/breweries`;
  const TOKEN = auth.token;
  console.log(END_POINT);

  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(END_POINT, config);
        setData(response.data.breweries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("Data:::::::::::::::::::------------------", data);

  return (
    <>
      <h3 className="UserBreweries-title title mt-2">Breweries</h3>

      <div className="UserBreweries-container container" id="table-container">
        <div className="d-flex justify-content-end m-2">
          <Link
            to={`/users/${userId}/breweries/new`}
            className="btn btn-success btn-sm mt-2"
          >
            + Add Brewery
          </Link>
          <button
            onClick={() => navigate(`/user`)}
            className="btn btn-secondary btn-sm mt-2 ms-2"
          >
            Home
          </button>
        </div>
        {data ? (
          <table className="UserBreweries-list-group table table-sm table-striped table-hover ">
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th data-align="left">Brewery Name</th>
                <th data-align="left">Location</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.brewery_id}>
                  {/* <td>{d.brewery_id}</td> */}
                  <td>{d.brewery_name}</td>
                  <td>{d.location}</td>

                  <td>
                    <button
                      className="badge bg-secondary"
                      onClick={() => navigate(`/breweries/${d.brewery_id}`)}
                    >
                      View
                    </button>
                    <button
                      className="badge bg-success "
                      onClick={() =>
                        navigate(`/breweries/${d.brewery_id}/update`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          //   "Loading..."
          <LoadingSpinner />
        )}
      </div>
    </>
  );
};

export default UserBreweries;
