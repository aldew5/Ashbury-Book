import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@material-ui/core";
import { Game } from "../../interfaces/game";
import { User } from "../../interfaces/user";
import styles from "../../styles/Day.module.css";
import getGames from "../../utils/getGames";

interface CashGameCreationProps {
    gameTitle: string;
    gameTime: string;
    min: string;
    max: string;
    userData: User;
    username: string;
    date: Date;
    months: string[];
    closeWindow: () => void;
    setGameTime: Dispatch<SetStateAction<string>>;
    setGameTitle: Dispatch<SetStateAction<string>>;
    setMin: Dispatch<SetStateAction<string>>;
    setMax: Dispatch<SetStateAction<string>>;
    setGames: Dispatch<SetStateAction<Game[]>>;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
}

const CashGameCreation = ({closeWindow, months, setGames, setShowMenu, username, date, userData, gameTitle, gameTime, 
    min, max, setGameTime, setMin, setMax, setGameTitle}: CashGameCreationProps) => {

    // creates a game on a specified day
    const createCashGame = async (e: any) => {
        // don't refresh
        e.preventDefault();
        const request = await fetch(
            `${process.env.REACT_APP_API_URL}/createCashGame`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") as string,
                },
                body: JSON.stringify({
                    players: [],
                    username,
                    month: months[date.getMonth()],
                    day: date.getDate().toString(),
                    time: gameTime,
                    minBuyin: min,
                    maxBuyin: max,
                    title: gameTitle,
                    senior: userData.senior,
                    status: "upcoming",
                }),
            }
        );
        const response = await request.json();

        if (response.success) {
            alert("Game created");
            setGames(await getGames());
            setShowMenu(false);
        } else {
            alert(response.message);
        }
        window.location.reload();
    };

    return (
        <Card sx={{ minWidth: 275, border: 2 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <CardContent>
                    <Box className={styles.button}>
                        <ClearIcon onClick={closeWindow} />
                    </Box>
                    <Typography style={{
                        marginBottom: "1rem",
                    }}>
                        Enter Game Data: <br></br>
                    </Typography>
                    <Box>
                        <form
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={gameTitle}
                                onChange={(e: ChangeEvent<HTMLInputElement>)=> {
                                    setGameTitle(e.target.value);
                                }}
                                className="input-field"
                                placeholder="Title"
                                style={{
                                    marginBottom: "2rem",
                                }}
                            />
                            <input
                                type="text"
                                id="time"
                                name="time"
                                value={gameTime}
                                onChange={(e: ChangeEvent<HTMLInputElement>)=> {
                                    setGameTime(e.target.value);
                                }}
                                className="input-field"
                                placeholder="Game Time"
                                style={{
                                    marginBottom: "2rem",
                                }}

                            />
                            <input
                                type="text"
                                id="cost"
                                name="cost"
                                value={min}
                                onChange={(e: ChangeEvent<HTMLInputElement>)=> {
                                    setMin(e.target.value);
                                }}
                                className="input-field"
                                placeholder="Min buy-in"
                                style={{
                                    marginBottom: "2rem",
                                }}
                            />
                            <input
                                type="text"
                                id="cost"
                                name="cost"
                                value={max}
                                onChange={(e: ChangeEvent<HTMLInputElement>)=> {
                                    setMax(e.target.value);
                                }}
                                className="input-field"
                                placeholder="Max buy-in"
                                style={{
                                    marginBottom: "2rem",
                                }}

                            />

                            <CardActions
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    size="small"
                                    onClick={createCashGame}
                                >
                                    Confirm Game
                                </Button>
                            </CardActions>
                        </form>
                    </Box>
                </CardContent>
            </div>
        </Card>
    )
}

export default CashGameCreation;