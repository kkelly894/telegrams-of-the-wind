import { Route, Routes } from "react-router";

import Layout from "./layout/Layout";

import About from "./pages/About";
import AllTelegrams from "./pages/AllTelegrams";
import CreateTelegram from "./pages/CreateTelegram";
import Drafts from "./pages/Drafts";
import EditDraft from "./pages/EditDraft";
import EditTelegram from "./pages/EditTelegram";
import Favorites from "./pages/Favorites";
import MyTelegrams from "./pages/MyTelegrams";
import TelegramDetails from "./pages/TelegramDetails";

import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
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

        <Route
          path="/telegrams/create"
          element={
            <ProtectedRoute>
              <CreateTelegram />
            </ProtectedRoute>
          }
        />

        <Route
          path="/telegrams/:id/edit"
          element={
            <ProtectedRoute>
              <EditTelegram />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/telegrams"
          element={
            <ProtectedRoute>
              <MyTelegrams />
            </ProtectedRoute>
          }
        />

        <Route
          path="/drafts"
          element={
            <ProtectedRoute>
              <Drafts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/drafts/:id/edit"
          element={
            <ProtectedRoute>
              <EditDraft />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
