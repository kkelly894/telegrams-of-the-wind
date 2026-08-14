import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    setError(null);

    try {
      await login({
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
        <h1>LOGIN</h1>

        <form className="auth-form" action={onLogin}>
          <label>
            EMAIL
            <input type="email" name="email" required />
          </label>

          <label>
            PASSWORD
            <input type="password" name="password" required />
          </label>

          {error && <output className="auth-error">{error}</output>}

          <button className="auth-button" type="submit">
            LOGIN
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}
