type calendar = {
  [date: string]: {
    isFeriado?: boolean;
    quests: quest[];
  };
};