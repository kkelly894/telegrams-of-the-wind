import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "../auth/AuthContext";

const API = import.meta.env.VITE_API;

const TelegramContext = createContext();

export function TelegramProvider({ children }) {
  const { token, user } = useAuth();

  const [telegrams, setTelegrams] = useState([]);
  const [myTelegrams, setMyTelegrams] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTelegrams();
  }, []);

  useEffect(() => {
    if (token && user) {
      getMyTelegrams();
      getDrafts();
      getFavorites();
    } else {
      setMyTelegrams([]);
      setDrafts([]);
      setFavorites([]);
    }
  }, [token, user]);

  const getAllTelegrams = async (sort = "newest") => {
    try {
      setLoading(true);

      const response = await fetch(API + `/api/telegrams?sort=${sort}`);

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to get telegrams.");
      }

      setTelegrams(result);

      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMyTelegrams = async () => {
    if (!token) {
      return [];
    }

    try {
      const response = await fetch(API + "/api/account/telegrams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to get your telegrams.");
      }

      setMyTelegrams(result);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const createTelegram = async (telegramData) => {
    if (!token) {
      throw Error("You must be logged in to create a telegram.");
    }

    try {
      const response = await fetch(API + "/api/telegrams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(telegramData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to create telegram.");
      }

      setTelegrams((currentTelegrams) => [result, ...currentTelegrams]);

      setMyTelegrams((currentTelegrams) => [result, ...currentTelegrams]);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateTelegram = async (id, telegramData) => {
    if (!token) {
      throw Error("You must be logged in to edit a telegram.");
    }

    try {
      const response = await fetch(API + `/api/telegrams/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(telegramData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to update telegram.");
      }

      setTelegrams((currentTelegrams) =>
        currentTelegrams.map((telegram) =>
          telegram.id === Number(id) ? result : telegram,
        ),
      );

      setMyTelegrams((currentTelegrams) =>
        currentTelegrams.map((telegram) =>
          telegram.id === Number(id) ? result : telegram,
        ),
      );

      return result;
    } catch (error) {
      throw error;
    }
  };

  const deleteTelegram = async (id) => {
    if (!token) {
      throw Error("You must be logged in to delete a telegram.");
    }

    try {
      const response = await fetch(API + `/api/telegrams/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to delete telegram.");
      }

      setTelegrams((currentTelegrams) =>
        currentTelegrams.filter((telegram) => telegram.id !== Number(id)),
      );

      setMyTelegrams((currentTelegrams) =>
        currentTelegrams.filter((telegram) => telegram.id !== Number(id)),
      );

      setFavorites((currentFavorites) =>
        currentFavorites.filter((telegram) => telegram.id !== Number(id)),
      );

      return result;
    } catch (error) {
      throw error;
    }
  };

  const getDrafts = async () => {
    if (!token) {
      return [];
    }

    try {
      const response = await fetch(API + "/api/drafts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to get drafts.");
      }

      setDrafts(result);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const saveDraft = async (draftData) => {
    if (!token) {
      throw Error("You must be logged in to save a draft.");
    }

    try {
      const response = await fetch(API + "/api/drafts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(draftData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to save draft.");
      }

      setDrafts((currentDrafts) => [result, ...currentDrafts]);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateDraft = async (id, draftData) => {
    if (!token) {
      throw Error("You must be logged in to edit a draft.");
    }

    try {
      const response = await fetch(API + `/api/drafts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(draftData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to update draft.");
      }

      setDrafts((currentDrafts) =>
        currentDrafts.map((draft) =>
          draft.id === Number(id) ? result : draft,
        ),
      );

      return result;
    } catch (error) {
      throw error;
    }
  };

  const sendDraft = async (id, draftData) => {
    if (!token) {
      throw Error("You must be logged in to send a draft.");
    }

    try {
      const response = await fetch(API + `/api/drafts/${id}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(draftData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to send draft.");
      }

      setDrafts((currentDrafts) =>
        currentDrafts.filter((draft) => draft.id !== Number(id)),
      );

      setTelegrams((currentTelegrams) => [result, ...currentTelegrams]);

      setMyTelegrams((currentTelegrams) => [result, ...currentTelegrams]);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const deleteDraft = async (id) => {
    if (!token) {
      throw Error("You must be logged in to delete a draft.");
    }

    try {
      const response = await fetch(API + `/api/drafts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to delete draft.");
      }

      setDrafts((currentDrafts) =>
        currentDrafts.filter((draft) => draft.id !== Number(id)),
      );

      return result;
    } catch (error) {
      throw error;
    }
  };

  const getFavorites = async () => {
    if (!token) {
      return [];
    }

    try {
      const response = await fetch(API + "/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to get favorites.");
      }

      setFavorites(result);

      return result;
    } catch (error) {
      throw error;
    }
  };

  const isFavorite = (telegramId) => {
    return favorites.some((telegram) => telegram.id === Number(telegramId));
  };

  const toggleFavorite = async (telegramId) => {
    if (!token) {
      throw Error("You must be logged in to favorite a telegram.");
    }

    const favorite = isFavorite(telegramId);

    try {
      const response = await fetch(API + `/api/favorites/${telegramId}`, {
        method: favorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message || "Unable to update favorite.");
      }

      await getFavorites();

      return result;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    telegrams,
    myTelegrams,
    drafts,
    favorites,
    loading,
    getAllTelegrams,
    getMyTelegrams,
    createTelegram,
    updateTelegram,
    deleteTelegram,
    getDrafts,
    saveDraft,
    updateDraft,
    sendDraft,
    deleteDraft,
    getFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegrams() {
  const context = useContext(TelegramContext);

  if (!context) {
    throw Error("useTelegrams must be used within a TelegramProvider");
  }

  return context;
}
