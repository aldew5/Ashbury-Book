import {
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

import styles from "../../styles/Day.module.css";
import getUserData from "../../utils/getUserData";
import getGameData from "../../utils/getGameData";

const GameInfo = ({
    closeWindow,
    setShowComplete,
    gameTitle,
}: {
    closeWindow: () => void;
    setShowComplete: Dispatch<SetStateAction<boolean>>;
    gameTitle: string;
}) => {
    const [userIsJoined, setUserIsJoined] = useState<boolean>();
    const [gameTime, setGameTime] = useState<string>("");
    const [cost, setCost] = useState<string>("");
    const [players, setPlayers] = useState<string[]>([]);
    const [status, setStatus] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [day, setDay] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const checkIfJoined = async () => {
        const request = await fetch(
            `${process.env.REACT_APP_API_URL}/amijoined/${gameTitle}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") as string,
                },
            }
        );
        const response: {
            success: boolean;
            data: boolean;
        } = await request.json();

        setUserIsJoined(response.data);
    };


    const init = async () => {
        const userData = await getUserData();
        setUsername(userData.username);

        const gameData = await getGameData(gameTitle);

        setGameTime(gameData.time);
        setCost(gameData.buyin);
        setPlayers(gameData.players);
        setStatus(gameData.status);
        setMonth(gameData.month);
        setDay(gameData.day);

        await checkIfJoined();
    };

    // removes a player from the roster
    const removePlayer = async () => {
        const request = await fetch(
            `${process.env.REACT_APP_API_URL}/removeUser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") as string,
                },
                body: JSON.stringify({
                    game_day: day
                }),
            }
        );
        const response = await request.json();

        let player_list: string[] = [];
        for (var i = 0; i < players.length; i++) {
            if (players[i] !== username) {
                player_list.push(players[i]);
            }
        }
        setPlayers(player_list);

        if (response.success) {
            console.log("Player removed");
            setUserIsJoined(false);
        } else {
            alert("Failed");
        }
    };

    // adds a player to the list of players registered for the game
    const addPlayer = async () => {
        const request = await fetch(
            `${process.env.REACT_APP_API_URL}/addUser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token") as string,
                },
                body: JSON.stringify({
                    game_day: day
                }),
            }
        );
        const response = await request.json();

        let player_list: string[] = players;
        player_list.push(username);
        setPlayers(player_list);

        if (response.success) {
            console.log("Player added");
            setUserIsJoined(true);
        } else {
            alert("Failed");
        }
    };

    // when the complete button is clicked
    const completeGame = () => {
        setShowComplete(true);
        setStatus("complete");
    };
    const leaveGameHandler = async () => {
        await removePlayer();
    };
    const joinGameHandler = async () => {
        addPlayer();
    };

    useEffect(() => {
        if (day !== ""){
            setIsLoading(false);
        }
    }, [userIsJoined]);

    useEffect(() => {
        init();
    }, [gameTitle]);

    return (
        <>
            <Card sx={{ minWidth: 275, minHeight: 250, border: 2 }}>
                {(isLoading) ? <div className={styles.loading}><Typography variant="h5">Loading...</Typography></div> :
                <div>
                    <CardContent>
                        <Box style={{ float: "right" }}>
                            <ClearIcon onClick={closeWindow} />
                        </Box>
                        <Typography
                            className={styles.date}
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {month} {day}, 2022
                        </Typography>
                        <Typography
                            variant="h5"
                            component="div"
                            className={styles.title}
                        >
                            {gameTitle}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Game Time: {gameTime}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Buy-in: ${cost}
                        </Typography>
                        <Typography variant="body2">
                            Current Players: {players.join(", ")}
                        </Typography>
                    </CardContent> 
                        {status === "upcoming" ? (
                        <CardActions style={{ justifyContent: "center" }}>
                            {!userIsJoined ? (
                                <Button size="small" onClick={joinGameHandler}>
                                    Join Game
                                </Button>
                            ) : (
                                <Button size="small" onClick={leaveGameHandler}>
                                    Leave Game
                                </Button>
                            )}
                            <Button size="small" onClick={completeGame}>
                                Complete
                            </Button>
                        </CardActions>
                    ) : (
                        <Typography
                            variant="body1"
                            style={{ justifyContent: "center" }}
                        >
                            Game is complete
                        </Typography>
                    )}
                </div>
                }
            </Card>
        </>
    );
};

export default GameInfo;
