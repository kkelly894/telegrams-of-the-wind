import { Route, Routes } from "react-router";

import Layout from "./layout/Layout";
import About from "./pages/About";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<About />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
