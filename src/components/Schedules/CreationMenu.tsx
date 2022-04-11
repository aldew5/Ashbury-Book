import GameCreation from "./GameCreation";
import CashGameCreation from "./CashGameCreation";
import { Dispatch, SetStateAction } from "react";
import { User } from "src/interfaces/user";
import { Game } from "src/interfaces/game";

interface CreationMenuProps {
    gameType: string;
    closeWindow: () => void;
    gameTitle: string;
    gameTime: string;
    cost: string;
    userData: User;
    username: string;
    date: Date;
    months: string[];
    min: string;
    max: string;
    setGameTime: Dispatch<SetStateAction<string>>;
    setGameTitle: Dispatch<SetStateAction<string>>;
    setCost: Dispatch<SetStateAction<string>>;
    setGames: Dispatch<SetStateAction<Game[]>>;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
    setMin: Dispatch<SetStateAction<string>>;
    setMax: Dispatch<SetStateAction<string>>;
}

const CreationMenu = ({ gameType, closeWindow, months, setGames, setShowMenu, username, date, userData, gameTitle, gameTime, cost,
    setGameTime, setCost, setGameTitle, setMax, setMin, min, max }: CreationMenuProps) => {
    
    return (
        <div>
            {(gameType !== "cash") ?
                <GameCreation
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
                /> :
                <CashGameCreation
                    closeWindow={closeWindow}
                    months={months}
                    setGames={setGames}
                    setShowMenu={setShowMenu}
                    username={username}
                    date={date}
                    userData={userData}
                    gameTitle={gameTitle}
                    gameTime={gameTime}
                    min={min}
                    max={max}
                    setMin={setMin}
                    setMax={setMax}
                    setGameTime={setGameTime}
                    setGameTitle={setGameTitle}
                />
            }
        </div>
    )

}

export default CreationMenu;