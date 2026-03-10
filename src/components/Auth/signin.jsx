import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/authSlice";
import AppAlert from "../AppAlert";
import {
  appleLogo,
  facebookLogo,
  googleLogo,
  logoPng,
  logoWhitePng,
} from "../../utils/imagepath";

const Signin = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const [appAlert, setAppAlert] = useState({
    type: "",
    message: "",
    show: false,
  });

  const [form, setForm] = useState({ username: "", password: ""});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, token, role } = useSelector((state) => state.auth);

  useEffect(() => {
  if (token && role) {
    if (role === "HR") {
      navigate("/dashboard");
    }
  }
}, [token, role, navigate]);

  useEffect(() => {
    if (location.state?.loggedOut) {
      setAppAlert({
        show: true,
        type: "success",
        message: "Logged out successfully",
      });
      // Clear location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      setAppAlert({
        show: true,
        type: "danger",
        message:
          typeof error === "string"
            ? error
            : error.detail || "Incorrect username or password",
      });
    }
  }, [error]);

  const Handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (appAlert.show) setAppAlert((prev) => ({ ...prev, show: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="account-content">
          <div className=" login-wrapper bg-img">
            <div className="login-left">
              <img
                src="/src/assets/img/authentication/loginbg.jpg"
                alt="left"
              />
            </div>
            <div className="login-content authent-content">
              <form onSubmit={handleSubmit}>
                <div className="login-userset">
                  <div className="login-logo logo-normal">
                    <img src="/src/assets/img/techssoftlogo.png" alt="img" />
                  </div>

                  <div className="login-userheading">
                    <h3>Sign In</h3>
                    <h4 className="fs-16">
                      Access the TexAi panel using your username and password.
                    </h4>
                  </div>

                  {appAlert.show && (
                    <AppAlert
                      type={appAlert.type}
                      message={appAlert.message}
                      solid
                      dismiss
                      onClose={() => setAppAlert({ ...appAlert, show: false })}
                    />
                  )}

                  {/* <div className="mb-3">
  <label className="form-label">
    Role <span className="text-danger ms-1">*</span>
  </label>

  <select
    name="role"
    value={form.role}
    onChange={Handlechange}
    className="form-control"
    required
  >
    <option value="">Select Role</option>
    <option value="HR">HR</option>
  </select>
</div> */}

                  <div className="mb-3">
                    <label className="form-label">
                      UserName <span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={Handlechange}
                        className="form-control border-end-0"
                        required
                      />
                      <span className="input-group-text border-start-0">
                        <i className="ti ti-mail" />
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Password <span className="text-danger ms-1">*</span>
                    </label>
                    <div className="pass-group">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={Handlechange}
                        className="pass-input form-control"
                        required
                      />
                      <span
                        className={`ti toggle-password text-gray-9 ${
                          isPasswordVisible ? "ti-eye" : "ti-eye-off"
                        }`}
                        onClick={togglePasswordVisibility}
                      ></span>
                    </div>
                  </div>
                  <div className="form-login authentication-check">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="custom-control custom-checkbox">
                          <label className="checkboxs ps-4 mb-0 pb-0 line-height-1 fs-16 text-gray-6">
                            <input type="checkbox" className="form-control" />
                            <span className="checkmarks" />
                            Remember me
                          </label>
                        </div>
                        <div className="text-end">
                          <Link className="text-orange fs-16 fw-medium" to="">
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                  <div className="form-setlogin or-text mt-1">
                    <h4>OR</h4>
                  </div>
                  <div className="mt-2">
                    <div className="d-flex align-items-center justify-content-center flex-wrap">
                      <div className="text-center me-2 flex-fill">
                        <Link
                          to="#"
                          className="br-10 p-2 btn btn-info d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="img-fluid m-1"
                            src={facebookLogo}
                            alt="Facebook"
                          />
                        </Link>
                      </div>
                      <div className="text-center me-2 flex-fill">
                        <Link
                          to="#"
                          className="btn btn-white br-10 p-2  border d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="img-fluid m-1"
                            src={googleLogo}
                            alt="google"
                          />
                        </Link>
                      </div>
                      <div className="text-center flex-fill">
                        <Link
                          to="#"
                          className="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center"
                        >
                          <img
                            className="img-fluid m-1"
                            src={appleLogo}
                            alt="Apple"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
