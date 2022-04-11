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

interface GameCreationProps {
    closeWindow: () => void;
    gameTitle: string;
    gameTime: string;
    cost: string;
    userData: User;
    username: string;
    date: Date;
    months: string[];
    setGameTime: Dispatch<SetStateAction<string>>;
    setGameTitle: Dispatch<SetStateAction<string>>;
    setCost: Dispatch<SetStateAction<string>>;
    setGames: Dispatch<SetStateAction<Game[]>>;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
}

const GameCreation = ({closeWindow, months, setGames, setShowMenu, username, date, userData, gameTitle, gameTime, cost, 
    setGameTime, setCost, setGameTitle}: GameCreationProps) => {

    const gameTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setGameTime(e.target.value);
    };
    const costHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCost(e.target.value);
    };
    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setGameTitle(e.target.value);
    };
    // creates a game on a specified day
    const createGame = async (e: any) => {
        // don't refresh
        console.log("senior", userData.senior);
        e.preventDefault();
        const request = await fetch(
            `${process.env.REACT_APP_API_URL}/createGame`,
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
                    buyin: cost,
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
                                onChange={titleHandler}
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
                                onChange={gameTimeHandler}
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
                                value={cost}
                                onChange={costHandler}
                                className="input-field"
                                placeholder="Buy-in"
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
                                    onClick={createGame}
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

export default GameCreation;