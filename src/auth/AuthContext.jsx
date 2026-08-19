import { createContext, useContext, useEffect, useState } from "react";

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

  const register = async (credentials) => {
    try {
      const mockUser = {
        id: 1,
        username: credentials.username,
        email: credentials.email,
      };

      const mockToken = "mock-token";

      setUser(mockUser);
      setToken(mockToken);

      return {
        token: mockToken,
        user: mockUser,
      };
    } catch (e) {
      throw e;
    }
  };

  const login = async (credentials) => {
    try {
      const mockUser = {
        id: 1,
        username: "exampleUser",
        email: credentials.email,
      };

      const mockToken = "mock-token";

      setUser(mockUser);
      setToken(mockToken);

      return {
        token: mockToken,
        user: mockUser,
      };
    } catch (e) {
      throw e;
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
