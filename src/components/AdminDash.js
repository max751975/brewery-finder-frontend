import React from "react";
import { Link } from "react-router-dom";

import "../CSS/AdminDash.css";

const AdminDash = () => {
  return (
    <>
      <div className="AdminDash-container">
        <h1>Admin Dashboard</h1>
        <div className="AdminDash-card">
          <h2>Links</h2>
          <ul className="AdminDash-list-group list-group">
            <li className="list-group-item">
              <Link to="/users">Users page</Link>
            </li>
            <li className="list-group-item">
              <Link to="/breweries">Breweries page</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
