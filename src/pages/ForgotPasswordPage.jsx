import { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { forgot } = authService;

  const handleSubmit = (e) => {
    e.peventDefault();
    forgot({ email })
      .then(() => navigate("create-password"))
      .catch(() => console.log("request is failed"));
  };

  return (
    <div className="forgot">
      <div className="forgot-text">Forgot password?</div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className="forgot-input style-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="forgot-send style-button">
          Send
        </button>
        <button type="reset" className="forgot-cancel">
          Cancel
        </button>
      </form>
    </div>
  );
};
