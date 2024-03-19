import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authService } from "../services/authService";

export const CreatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const secret = searchParams.get("secret");

  const { newPassword } = authService;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === passwordConfirm) {
      newPassword({ password, token, secret })
        .then(() => console.log("password is changed"))
        .catch(() => console.log("request is failed"));
    }
  };

  return (
    <div className="create">
      <form onSubmit={(e) => handleSubmit(e)}>
        <p className="create-text">Create new Password?</p>
        <div className="create-password">
          <label htmlFor="password">
            <div className="create-password-label">Password</div>
          </label>
          <input
            className="create-password-input style-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="create-confirm ">
          <label htmlFor="confirm">
            <div className="create-password-label">Confirm Password</div>
          </label>
          <input
            className="create-password-input style-input"
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className="create-button style-button">Reset password</button>
      </form>
    </div>
  );
};
