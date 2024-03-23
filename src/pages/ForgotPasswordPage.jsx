import { useState } from "react";
import { authService } from "../services/authService";
import { validationService } from "../services/validation";
import { useSetAtom } from "jotai";
import { uiAtom } from "../state";
import { Overlays } from "../components/Overlays";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const setUi = useSetAtom(uiAtom);

  const { forgotPassword } = authService;

  const { validateEmail } = validationService;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      forgotPassword({ email })
        .then(() => {
          setEmail("");
        })
        .catch((err) =>
          setUi((prev) => ({
            ...prev,
            modal: true,
            message: `Request is failed, detail: ${err.response.data.detail} `,
          }))
        );
    } else {
      setUi((prev) => ({
        ...prev,
        modal: true,
        message: "Email invalid",
      }));
    }
  };

  return (
    <>
      <Overlays />
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
          <button
            type="reset"
            className="forgot-cancel"
            onClick={() => {
              setEmail("");
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};
