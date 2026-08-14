import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({
        username,
        email,
        password,
      });

      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-paper">
        <h1>REGISTER</h1>

        <form className="auth-form" action={onRegister}>
          <label>
            USERNAME
            <input type="text" name="username" required />
          </label>

          <label>
            EMAIL
            <input type="email" name="email" required />
          </label>

          <label>
            PASSWORD
            <input type="password" name="password" required />
          </label>

          <label>
            CONFIRM PASSWORD
            <input type="password" name="confirmPassword" required />
          </label>

          {error && <output className="auth-error">{error}</output>}

          <button className="auth-button" type="submit">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
