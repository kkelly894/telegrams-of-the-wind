import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token && !user) {
      getCurrentUser();
    }
  }, [token]);

  const register = async (credentials) => {
    try {
      const response = await fetch(API + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Registration failed.");
      }

      setToken(result.token);
      setUser(result.user);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(API + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Login failed.");
      }

      setToken(result.token);
      setUser(result.user);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await fetch(API + "/api/auth/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setToken(null);
        setUser(null);

        throw Error(result.message || "Unable to get current user.");
      }

      setUser(result);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  const value = {
    token,
    user,
    register,
    login,
    getCurrentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
