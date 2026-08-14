import { createContext, useContext, useState } from "react";

import { mockTelegrams } from "../data/mockTelegrams";

const TelegramContext = createContext();

export function TelegramProvider({ children }) {
  const [telegrams, setTelegrams] = useState(mockTelegrams);

  const createTelegram = (telegramData) => {
    const newTelegram = {
      id: Date.now(),
      user_id: 1,
      recipient_name: telegramData.recipient_name,
      sender_name: telegramData.sender_name,
      message: telegramData.message,
      is_anonymous: telegramData.is_anonymous,
      created_at: new Date().toISOString(),
    };

    setTelegrams((currentTelegrams) => [newTelegram, ...currentTelegrams]);

    return newTelegram;
  };

  const value = {
    telegrams,
    createTelegram,
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
