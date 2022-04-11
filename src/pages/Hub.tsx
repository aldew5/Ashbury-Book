import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Leaderboard from "../components/Leaderboard";
import styles from "../styles/Hub.module.css";
import Schedule from "../components/Schedule";
import Day from "../components/Schedules/Day";
import Annoucements from "../components/Announcements";

import { Game } from "../interfaces/game";
import { CashGame } from "../interfaces/cashGame";

interface HubProps {
    games: Game[];
    username: string;
    cashGames: CashGame[];
    setGames: Dispatch<SetStateAction<Game[]>>;
}

const Hub = ({ setGames, games, username, cashGames }: HubProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [pokerDay, setPokerDay] = useState<number>(-1);
    const [cashDay, setCashDay] = useState<number>(-1);

    // insure the user token is still valid
    const checkAuth = async () => {
        const request = await fetch(
            `${process.env.REACT_APP_API_URL}/auth/status`,
            {
                method: "GET",
                headers: {
                    authorization: localStorage.getItem("token") as string,
                },
            }
        );

        const response: {
            success: boolean;
        } = await request.json();

        if (!response.success) {
            window.location.href = "/";
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.sched}>
                    <Schedule
                        show={show}
                        date={date}
                        setDate={setDate}
                        setShow={setShow}
                        games={games}
                        cashGames={cashGames}
                        setPokerDay={setPokerDay}
                        setCashDay={setCashDay}
                    />
                </div>
                <div className={styles.leaderboard}>
                    <Leaderboard />
                </div>
                {show && (
                    <div className={styles.day}>
                        <Day
                            date={date}
                            setShow={setShow}
                            games={games}
                            cashGames={cashGames}
                            setGames={setGames}
                            username={username}
                            pokerDay={pokerDay}
                            cashDay={cashDay}
                        />
                    </div>
                )}
            </div>
            <div>
                <Annoucements />
            </div>
        </div>
    );
};

export default Hub;
