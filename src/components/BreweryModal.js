import React from "react";
import "../CSS/BreweryModal.css";

function BreweryModal({ closeModal, brewery }) {
  return (
    <div className="BreweryModal-background">
      <div className="BrweryModal-container">
        <div className="BreweryModal-title-closeBtn">
          <button onClick={() => closeModal(false)}>
            <i className="fa fa-close"></i>
          </button>
        </div>
        <div className="BreweryModal-title">
          <h4>Brewery Details</h4>
        </div>
        <div className="BreweryModal-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{brewery.name}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{brewery.street}</td>
              </tr>
              <tr>
                <th scope="row">State</th>
                <td>{brewery.state}</td>
              </tr>
              <tr>
                <th scope="row">Zip code</th>
                <td>{brewery.postal_code}</td>
              </tr>
              <tr>
                <th scope="row">Phone</th>

                <td>{brewery.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="BreweryModal-footer">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => closeModal(false)}
          >
            Close
          </button>
        </div>
      </div>

      {/* <h1>BREWERY MODAL</h1>
      <p>{brewery.name}</p>
      <p>{brewery.address_1}</p>
      <p>{brewery.city}</p> */}
    </div>
  );
}

export default BreweryModal;
