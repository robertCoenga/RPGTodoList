import axios from "./axios";

export const questService ={
    
    async getCalendarQuestsByMonth (playerId: String, month: String, year: String): Promise<calendar> {
        const res = await axios.get("/quest/month", {params: {playerId,month, year}});
        return res.data;
    },

    async getQuestsByWeek(playerId: string, dateWeek: string): Promise<calendar> {
        const res = await axios.get("/quest/week",  {params: {playerId,dateWeek}})
        return res.data;
    }
}