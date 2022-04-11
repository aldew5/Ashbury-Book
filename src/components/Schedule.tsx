import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Schedule.css";
import { Game } from "../interfaces/game";
import { CashGame } from "src/interfaces/cashGame";
import { Dispatch, SetStateAction } from "react";

interface ScheduleProps {
    date: Date;
    games: Game[];
    cashGames: CashGame[];
    setDate: Dispatch<SetStateAction<Date>>;
    setShow: Dispatch<SetStateAction<boolean>>;
    setPokerDay: Dispatch<SetStateAction<number>>;
    setCashDay: Dispatch<SetStateAction<number>>;
    show: boolean;
}

const Schedule = ({
    date,
    games,
    cashGames,
    setDate,
    show,
    setShow,
    setPokerDay,
    setCashDay,
}: ScheduleProps) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "Semptember",
        "October",
        "November",
        "December",
    ];

    // checks if there is a game on a given date
    // returns the index of the poker day in the list of games
    // or -1 if it doesn't exist
    function isPokerDay(date: Date) {
        let index: number = -1;

        for (let i = 0; i < games.length; i++) {
            if (
                games[i].month === months[date.getMonth()] &&
                games[i].day === date.getDate().toString()
            )
                index = i;
        }
        
        return index;
    }

    function isCashDay(date: Date) {
        let index: number = -1;

        for (let i = 0; i  < cashGames.length; i++) {
            if (cashGames[i].month === months[date.getMonth()] &&
                cashGames[i].day === date.getDate().toString()
                )
                index = i;
        }
        return index;
    }

    // handles a click of the schedule
    const onChange = (date: Date) => {
        setDate(date);

        // show is true when a day should be displayed
        // (a user clicked on the schedule)
        // flip its value
        setShow(!show);

        // check if there is a game scheduled for date
        setPokerDay(isPokerDay(date));
        setCashDay(isCashDay(date));
    };

    return (
        <div>
            <Calendar onChange={onChange} value={date} />
        </div>
    );
};

export default Schedule;
