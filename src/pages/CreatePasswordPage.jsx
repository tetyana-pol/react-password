import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authService } from "../services/authService";
import { validationService } from "../services/validation";
import { useSetAtom } from "jotai";
import { uiAtom } from "../state";
import { Overlays } from "../components/Overlays";

export const CreatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const secret = searchParams.get("secret");

  const setUi = useSetAtom(uiAtom);

  const { newPassword } = authService;

  const { validatePassword } = validationService;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword(password)) {
      setUi((prev) => ({
        ...prev,
        modal: true,
        message: "Password invalid",
      }));
      return;
    }

    if (password === passwordConfirm) {
      newPassword({ password, token, secret })
        .then(
          () => () =>
            setUi((prev) => ({
              ...prev,
              modal: true,
              message: "Password is changed",
            }))
        )
        .catch(() =>
          setUi((prev) => ({
            ...prev,
            modal: true,
            message: "Error",
          }))
        );
    } else {
      setUi((prev) => ({
        ...prev,
        modal: true,
        message: "Passwords dont match",
      }));
    }
  };

  return (
    <>
      <Overlays />
      <div className="create">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="create-text">Create new Password?</p>
          <div className="create-password">
            <label htmlFor="password">
              <div className="create-password-label">Password</div>
            </label>
            <div className="create-box">
              <input
                className="create-password-input style-input"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="create-visibility"
                onClick={(e) => e.preventDefault}
              >
                <img src="/icons/hide.svg" alt="logo" />
              </button>
            </div>
          </div>
          <div className="create-confirm ">
            <label htmlFor="confirm">
              <div className="create-password-label">Confirm Password</div>
            </label>
            <div className="create-box-confirm">
              <input
                className="create-password-input style-input"
                type="password"
                name="confirm"
                id="confirm"
                placeholder="Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                type="button"
                className="create-visibility"
                onClick={(e) => e.preventDefault}
              >
                <img src="/icons/hide.svg" alt="logo" />
              </button>
            </div>
          </div>
          <button className="create-button style-button">Reset password</button>
        </form>
      </div>
    </>
  );
};
