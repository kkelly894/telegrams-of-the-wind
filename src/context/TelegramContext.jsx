import { createContext, useContext, useState } from "react";

import { mockTelegrams } from "../data/mockTelegrams";
import { useAuth } from "../auth/AuthContext";

const TelegramContext = createContext();

export function TelegramProvider({ children }) {
  const [telegrams, setTelegrams] = useState(mockTelegrams);

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
  };

  const value = {
    telegrams,
    createTelegram,
    saveDraft,
    updateTelegram,
    deleteTelegram,
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
