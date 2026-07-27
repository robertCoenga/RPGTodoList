type quest = {
    id: string;
    title: String;
    time: String;
    endTime: String;
    completed: boolean;
    type: questType;
    act?: act;
    buff?: buff;
    skill?: skill;
};

type quests = {
    tasks: quest[];
}
type questType = {
    id: String;
    description: String;
    created_at: String;
    updated_at?: String;
};