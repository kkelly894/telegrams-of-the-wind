import { Route, Routes } from "react-router";

import Layout from "./layout/Layout";
import About from "./pages/About";
import AllTelegrams from "./pages/AllTelegrams";
import TelegramDetails from "./pages/TelegramDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<About />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/telegrams" element={<AllTelegrams />} />

        <Route path="/telegrams/:id" element={<TelegramDetails />} />
      </Route>
    </Routes>
  );
}
