import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import "../CSS/RegisterForm.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const RegisterForm = () => {
  const usernameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const REGISTER_URL = "/auth/register";
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //   const [valiFirstName, setValidFirstName] = useState(false);
  //   const [firstNameFocus, setFirstNameFocus] = useState(false);

  //   const [validLastName, setValidLastName] = useState(false);
  //   const [lastNameFocus, setLastNameFocus] = useState(false);

  //   const [validLocation, setValidLocation] = useState(false);
  //   const [locationFocus, setLocationFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  // console.debug("formData=", formData, "formErrors:", formErrors);
  console.debug("RegisterForm > formData=", formData);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(formData.username));
  }, [formData.username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(formData.password));
    setValidMatch(formData.password === matchPwd);
  }, [formData.password, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  useEffect(() => {
    setErrMsg("");
  }, [formData.username, formData.password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(formData.username);
    const v2 = PWD_REGEX.test(formData.password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      console.log("form data::::::::::::", formData);
      console.log("URL::::::::", REGISTER_URL);
      const response = await axios.post(REGISTER_URL, formData);
      const user = response.data.user;
      console.log("Register Form response::::::::::::", response);
      console.log(user);

      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <div className="RegisterForm">
        <div className="RegisterForm-container container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="RegisterForm-title mb-3">Sign Up</h2>
          <div className="RegisterForm-card card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">
                    Username:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validUsername ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validUsername || !formData.username ? "hide" : "invalid"
                      }
                    />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    ref={usernameRef}
                    autoComplete="off"
                    onChange={handleChange}
                    value={formData.username}
                    name="username"
                    required
                    aria-invalid={validUsername ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={
                      usernameFocus && formData.username && !validUsername
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validPwd || !formData.password ? "hide" : "invalid"
                      }
                    />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    // onChange={(e) => setPwd(e.target.value)}
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validMatch && matchPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validMatch || !matchPwd ? "hide" : "invalid"}
                    />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
                </div>
                <div className="form-group">
                  <label>
                    Email:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validEmail ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validEmail || !formData.email ? "hide" : "invalid"
                      }
                    />
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={handleChange}
                    value={formData.email}
                    required
                    autoComplete="off"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={
                      emailFocus && formData.email && !validEmail
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must be a valid email address.
                  </p>
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    // onChange={(e) => setFirstName(e.target.value)}
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    // onChange={(e) => setLastName(e.target.value)}
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="location"
                    name="location"
                    className="form-control"
                    // onChange={(e) => setLocation(e.target.value)}
                    onChange={handleChange}
                    value={formData.location}
                  />
                </div>
                <button
                  disabled={
                    !validUsername || !validPwd || !validMatch ? true : false
                  }
                  className="btn btn-primary mt-2"
                >
                  Sign Up
                </button>
              </form>
            </div>

            {/* <p>
              Already registered?
              <br />
              <span className="line">
                <Link to={"/login"} className="RegisterForm-link">
                  Log In
                </Link>
              </span>
            </p> */}
          </div>
        </div>
      </div>
      {/* </section> */}
    </>
  );
};

export default RegisterForm;
