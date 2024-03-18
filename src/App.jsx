import { Routes, Route } from "react-router-dom";

import "./styles.scss";

import { LoginPage } from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { CreatePasswordPage } from "./pages/CreatePasswordPage";

import { Header } from "./components/Header.jsx";

function App() {
  return (
    <main className="container">
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="create-password" element={<CreatePasswordPage />} />
      </Routes>
    </main>
  );
}

export default App;
