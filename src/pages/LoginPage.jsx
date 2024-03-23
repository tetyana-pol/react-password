import { useState } from "react";
import { authService } from "../services/authService";
import { validationService } from "../services/validation";
import { useNavigate } from "react-router-dom";
import { Overlays } from "../components/Overlays";
import { useSetAtom } from "jotai";
import { uiAtom } from "../state";

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

  const setUi = useSetAtom(uiAtom);

  const navigate = useNavigate();

  const { login } = authService;

  const { validateEmail, validatePassword } = validationService;

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
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("token_expire", res.data.token_expire);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          localStorage.setItem(
            "refresh_token_expire",
            res.data.refresh_token_expire
          );
          setFormData({ email: "", password: "" });
          setUi((prev) => ({
            ...prev,
            modal: true,
            message: "You are logged in",
          }));
        })

        .catch((err) => {
          setUi((prev) => ({
            ...prev,
            modal: true,
            message: `You are failed, detail: ${err.response.data.detail}`,
          }));
        });
    } else {
      setUi((prev) => ({ ...prev, modal: true, message: "Data invalid" }));
    }
  };

  return (
    <>
      <Overlays />
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
                      email: validatePassword(formData.password),
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
