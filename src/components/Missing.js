import { Link } from "react-router-dom";
import "../CSS/Missing.css";

const Missing = () => {
  return (
    <article className="Missing-card card" style={{ padding: "100px" }}>
      <h2>Oops!</h2>
      <p>Page Not Found</p>
      <div>
        <Link to="/" className="Missing-link">
          Visit Our Homepage
        </Link>
      </div>
    </article>
  );
};

export default Missing;
