import { createContext, useContext, useState } from "react";

import { mockTelegrams } from "../data/mockTelegrams";
import { useAuth } from "../auth/AuthContext";

const TelegramContext = createContext();

export function TelegramProvider({ children }) {
  const [telegrams, setTelegrams] = useState(mockTelegrams);
  const [favorites, setFavorites] = useState([]);

  const { user } = useAuth();

  const createTelegram = (telegramData) => {
    if (!user) {
      throw Error("You must be logged in to create a telegram.");
    }

    const newTelegram = {
      id: Date.now(),
      user_id: user.id,
      recipient_name: telegramData.recipient_name,
      sender_name: telegramData.sender_name,
      message: telegramData.message,
      is_anonymous: telegramData.is_anonymous,
      status: "sent",
      created_at: new Date().toISOString(),
    };

    setTelegrams((currentTelegrams) => [newTelegram, ...currentTelegrams]);

    return newTelegram;
  };

  const saveDraft = (telegramData) => {
    if (!user) {
      throw Error("You must be logged in to save a draft.");
    }

    const newDraft = {
      id: Date.now(),
      user_id: user.id,
      recipient_name: telegramData.recipient_name,
      sender_name: telegramData.sender_name,
      message: telegramData.message,
      is_anonymous: telegramData.is_anonymous,
      status: "draft",
      created_at: new Date().toISOString(),
    };

    setTelegrams((currentTelegrams) => [newDraft, ...currentTelegrams]);

    return newDraft;
  };

  const updateTelegram = (id, telegramData) => {
    if (!user) {
      throw Error("You must be logged in to edit a telegram.");
    }

    const telegram = telegrams.find((telegram) => telegram.id === Number(id));

    if (!telegram) {
      throw Error("Telegram not found.");
    }

    if (telegram.user_id !== user.id) {
      throw Error("You can only edit your own telegrams.");
    }

    const updatedTelegram = {
      ...telegram,
      recipient_name: telegramData.recipient_name,
      message: telegramData.message,
      is_anonymous: telegramData.is_anonymous,
    };

    setTelegrams((currentTelegrams) =>
      currentTelegrams.map((telegram) =>
        telegram.id === Number(id) ? updatedTelegram : telegram,
      ),
    );

    return updatedTelegram;
  };

  const updateDraft = (id, draftData) => {
    if (!user) {
      throw Error("You must be logged in to edit a draft.");
    }

    const draft = telegrams.find((telegram) => telegram.id === Number(id));

    if (!draft) {
      throw Error("Draft not found.");
    }

    if (draft.user_id !== user.id) {
      throw Error("You can only edit your own drafts.");
    }

    const updatedDraft = {
      ...draft,
      recipient_name: draftData.recipient_name,
      sender_name: draftData.sender_name,
      message: draftData.message,
      is_anonymous: draftData.is_anonymous,
      status: "draft",
    };

    setTelegrams((currentTelegrams) =>
      currentTelegrams.map((telegram) =>
        telegram.id === Number(id) ? updatedDraft : telegram,
      ),
    );

    return updatedDraft;
  };

  const sendDraft = (id, draftData) => {
    if (!user) {
      throw Error("You must be logged in to send a draft.");
    }

    const draft = telegrams.find((telegram) => telegram.id === Number(id));

    if (!draft) {
      throw Error("Draft not found.");
    }

    if (draft.user_id !== user.id) {
      throw Error("You can only send your own drafts.");
    }

    const sentTelegram = {
      ...draft,
      recipient_name: draftData.recipient_name,
      sender_name: draftData.sender_name,
      message: draftData.message,
      is_anonymous: draftData.is_anonymous,
      status: "sent",
    };

    setTelegrams((currentTelegrams) =>
      currentTelegrams.map((telegram) =>
        telegram.id === Number(id) ? sentTelegram : telegram,
      ),
    );

    return sentTelegram;
  };

  const deleteTelegram = (id) => {
    if (!user) {
      throw Error("You must be logged in to delete a telegram.");
    }

    const telegram = telegrams.find((telegram) => telegram.id === Number(id));

    if (!telegram) {
      throw Error("Telegram not found.");
    }

    if (telegram.user_id !== user.id) {
      throw Error("You can only delete your own telegrams.");
    }

    setTelegrams((currentTelegrams) =>
      currentTelegrams.filter((telegram) => telegram.id !== Number(id)),
    );

    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (favorite) => favorite.telegram_id !== Number(id),
      ),
    );
  };

  const isFavorite = (telegramId) => {
    if (!user) {
      return false;
    }

    return favorites.some(
      (favorite) =>
        favorite.user_id === user.id &&
        favorite.telegram_id === Number(telegramId),
    );
  };

  const toggleFavorite = (telegramId) => {
    if (!user) {
      throw Error("You must be logged in to favorite a telegram.");
    }

    const favoriteExists = favorites.some(
      (favorite) =>
        favorite.user_id === user.id &&
        favorite.telegram_id === Number(telegramId),
    );

    if (favoriteExists) {
      setFavorites((currentFavorites) =>
        currentFavorites.filter(
          (favorite) =>
            !(
              favorite.user_id === user.id &&
              favorite.telegram_id === Number(telegramId)
            ),
        ),
      );

      return;
    }

    const newFavorite = {
      user_id: user.id,
      telegram_id: Number(telegramId),
    };

    setFavorites((currentFavorites) => [...currentFavorites, newFavorite]);
  };

  const value = {
    telegrams,
    favorites,
    createTelegram,
    saveDraft,
    updateTelegram,
    updateDraft,
    sendDraft,
    deleteTelegram,
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
