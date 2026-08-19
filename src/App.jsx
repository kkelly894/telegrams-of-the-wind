import { Route, Routes } from "react-router";

import Layout from "./layout/Layout";

import About from "./pages/About";
import AllTelegrams from "./pages/AllTelegrams";
import CreateTelegram from "./pages/CreateTelegram";
import EditTelegram from "./pages/EditTelegram";
import MyTelegrams from "./pages/MyTelegrams";
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

        <Route path="/telegrams/create" element={<CreateTelegram />} />

        <Route path="/telegrams/:id" element={<TelegramDetails />} />

        <Route path="/telegrams/:id/edit" element={<EditTelegram />} />

        <Route path="/account/telegrams" element={<MyTelegrams />} />
      </Route>
    </Routes>
  );
}
