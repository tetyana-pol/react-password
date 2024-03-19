import { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

function validateEmail(value) {
  if (!value) {
    return "Email is required";
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return "Email is not valid";
  }

  return "";
}

function validatePassword(value) {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 8) {
    return "At least 8 characters";
  }

  return "";
}

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const { login } = authService;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateEmail(formData.email) &&
      !validatePassword(formData.password)
    ) {
      login(formData)
        .then((res) => {
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("token_expire", res.token_expire);
          localStorage.setItem("refresh_token", res.refresh_token);
          localStorage.setItem(
            "refresh_token_expire",
            res.refresh_token_expire
          );
        })
        .then(() => setFormData({ email: "", password: "" }))
        .then(() => console.log("you are logged"))
        .catch(() => console.log("you are failed"));
    } else {
      window.alert("Data is invalid");
    }
  };

  return (
    <>
      <div className="title">Log in to your account</div>
      <div className="login">
        <div className="login-third">
          <button className="login-third-sso">
            <div className="login-third-sso-img">
              <img src="/icons/google.svg" alt="logo" />
            </div>
            <div className="login-third-sso-text">Google</div>
          </button>
          <button className="login-third-sso">
            <div className="login-third-sso-img">
              <img src="/icons/github.svg" alt="logo" />
            </div>
            <div className="login-third-sso-text">Github</div>
          </button>
        </div>
        <div className="login-divider">
          <hr />
          <span>OR</span>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="login-input-email style-input"
            name="email"
            type="email"
            placeholder="work email"
            value={formData.email}
            onChange={(e) => {
              handleInputChange(e);
              setIsEmail(!Boolean(validateEmail(e.target.value)));
            }}
            onFocus={() => {
              setIsEmailFocused(true);
            }}
            onBlur={() => {
              setIsEmailFocused(false);
              setError((prev) => ({
                ...prev,
                email: validateEmail(formData.email),
              }));
            }}
          />
          {error.email && !isEmailFocused && (
            <p className="warning">{error.email}</p>
          )}
          {isEmail && (
            <div>
              <div className="login-input-box">
                <input
                  className="login-input-password style-input"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  onFocus={() => {
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                    setError((prev) => ({
                      ...prev,
                      email: validateEmail(formData.password),
                    }));
                  }}
                />
                <button
                  type="button"
                  className="login-input-visibility"
                  onClick={(e) => e.preventDefault}
                >
                  <img src="/icons/hide.svg" alt="logo" />
                </button>
              </div>

              {error.password && isPasswordFocused && (
                <p className="warning">{error.password}</p>
              )}

              <div className="login-input-wrapper">
                <button
                  className="login-input-forgot"
                  type="button"
                  onClick={() => navigate("forgot-password")}
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          )}

          <button className="login-button style-button" type="submit">
            Log in Qencode
          </button>
        </form>
      </div>

      <div className="login-signup">
        Is your company new to Qencode?
        <button type="button" className="login-signup-button">
          Signup
        </button>
      </div>
    </>
  );
};
