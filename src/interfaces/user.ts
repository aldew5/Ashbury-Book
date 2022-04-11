import { Debt } from "../interfaces/debt";
import { Gain } from "../interfaces/gain";

export interface User {
    username: string,
    password: string,
    email: string,
    score: number,
    gamesPlayed: number,
    firsts: number,
    seconds: number,
    earnings: number,
    senior: boolean,
    debts: Debt[],
    gains: Gain[],
    uuid: string,
    timestamp: Date;
}