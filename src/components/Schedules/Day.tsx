import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { Game } from "../../interfaces/game";
import { User } from "../../interfaces/user";
import { CashGame } from "../../interfaces/cashGame";

import CompletedGame from "./CompletedGame";
import GameInfo from "./GameInfo";
import getUserData from "../../utils/getUserData";
import EmptyGame from "./EmptyGame";
import CreationMenu from "./CreationMenu";
import GameSelection from "./GameSelection";
import CashGameInfo from "./CashGameInfo";

interface DayProps {
    setGames: Dispatch<SetStateAction<Game[]>>;
    pokerDay: number;
    games: Game[];
    cashGames: CashGame[];
    date: Date;
    setShow: Dispatch<SetStateAction<boolean>>;
    username: string;
    cashDay: number;
}

const Day = ({
    pokerDay,
    setGames,
    games,
    date,
    cashGames,
    setShow,
    username,
    cashDay,
}: DayProps) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [gameTime, setGameTime] = useState<string>("");
    const [cost, setCost] = useState<string>("");
    const [gameTitle, setGameTitle] = useState<string>("");
    const [players, setPlayers] = useState<string[]>([]);
    const [showComplete, setShowComplete] = useState<boolean>(false);
    const [showSelection, setShowSelection] = useState<boolean>(false);
    const [gameType, setGameType] = useState<string>("");
    const [min, setMin] = useState<string>("");
    const [max, setMax] = useState<string>("");
    const [userData, setUserData] = useState<User>({
        username: "",
        password: "",
        firsts: 0,
        seconds: 0,
        gamesPlayed: 0,
        score: 0,
        earnings: 0,
        debts: [],
        uuid: "",
        gains: [],
        senior: false,
        timestamp: new Date(),
        email: "",
    });

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
    //console.log(cashDay, "HERE");

    const init = async () => {
        setUserData((await getUserData()) as User);
    };
    const closeWindow = () => {
        setShow(false);
    };

    useEffect(() => {
        init();
        // check if its a poker day
        // if it isn't pokerDay will be -1
        for (let i = 0; i < games.length; i++) {
            if (pokerDay === i) {
                setPlayers(games[i].players);
                setGameTime(games[i].time);
                setGameTitle(games[i].title);
                setCost(games[i].buyin);
                setGameType("tournament");
            }
        }
        for (let i = 0; i < cashGames.length; i++) {
            if (cashDay === i) {
                setPlayers(cashGames[i].players);
                setGameTime(cashGames[i].time);
                setGameTitle(cashGames[i].title);
                setMin(cashGames[i].minBuyin);
                setMax(cashGames[i].maxBuyin);
                setGameType("cash");
            }
        }
    }, []);

    return (
        <div>
            {(pokerDay !== -1 || cashDay !== -1) ?
                <div>
                    {(showComplete) ?
                        <CompletedGame
                            months={months}
                            date={date}
                            players={players}
                            cost={cost}
                            closeWindow={closeWindow}
                        />
                        :
                        <div>
                            {(gameType === "cash") ?
                                <CashGameInfo
                                    setShowComplete={setShowComplete}
                                    closeWindow={closeWindow}
                                    gameTitle={gameTitle}
                                /> :
                                <GameInfo
                                    setShowComplete={setShowComplete}
                                    closeWindow={closeWindow}
                                    gameTitle={gameTitle}
                                />
                            }
                        </div>
                    }
                </div>
                :

                <div>
                    {(showSelection) ?
                        <GameSelection
                            setShowSelection={setShowSelection}
                            setGameType={setGameType}
                        /> :
                        <div>
                            {(showMenu) ?
                                <CreationMenu
                                    closeWindow={closeWindow}
                                    months={months}
                                    setGames={setGames}
                                    setShowMenu={setShowMenu}
                                    username={username}
                                    date={date}
                                    userData={userData}
                                    gameTitle={gameTitle}
                                    gameTime={gameTime}
                                    cost={cost}
                                    setGameTime={setGameTime}
                                    setCost={setCost}
                                    setGameTitle={setGameTitle}
                                    min={min}
                                    max={max}
                                    setMax={setMax}
                                    setMin={setMin}
                                    gameType={gameType}
                                />

                                :
                                <EmptyGame
                                    months={months}
                                    date={date}
                                    closeWindow={closeWindow}
                                    setShowMenu={setShowMenu}
                                    setShowSelection={setShowSelection}
                                />
                            }
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Day;
