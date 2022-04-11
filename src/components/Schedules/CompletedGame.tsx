import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@material-ui/core";
import { ChangeEvent, useState } from "react";

const CompletedGame = ({
    closeWindow,
    players,
    cost,
    date,
    months,
}: {
    closeWindow: () => void;
    players: string[];
    cost: string;
    date: Date;
    months: string[];
}) => {
    const [first, setFirst] = useState<string>("");
    const [second, setSecond] = useState<string>("");
    const [firstValue, setFirstValue] = useState<number>();
    const [secondValue, setSecondValue] = useState<number>();

    // udpates player stats after a game has been completed
    const updatePlayers = async () => {
        const request = await fetch(
            `${process.env.REACT_APP_API_URL}/updateWinners`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first,
                    second,
                    firstValue,
                    secondValue,
                    users: players,
                    buyin: cost,
                    date: months[date.getMonth()] + date.getDate() + " " + ", " + "2022",
                }),
            }
        );

        const response = await request.json();

        if (response.success) {
            console.log("Values updated");
        } else {
            console.log("Error in updating values");
        }
    };

    const updateStatus = async (e: any) => {
        // don't refresh
        e.preventDefault();
        const request = await fetch(
            `${process.env.REACT_PUBLIC_API_URL}/completeGame`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    day: date.getDate(),
                    month: months[date.getMonth()],
                }),
            }
        );

        const response = await request.json();

        if (response.success) {
            alert("Game status updated");
        } else {
            alert("Error in updating game status");
        }
    };

    const secondHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecond(e.target.value);
    };
    const firstValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstValue(parseInt(e.target.value));
    };
    const secondValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondValue(parseInt(e.target.value));
    };
    // when the complete game form is submitted
    const finishGameHandler = (e: any) => {
        // update player stats
        updatePlayers();
        updateStatus(e);
        window.location.reload();
    };

    return (
        <>
            <Card sx={{ minWidth: 275, border: 2 }}>
                <CardContent>
                    <Box style={{ float: "right" }}>
                        <ClearIcon onClick={closeWindow} />
                    </Box>
                    <Box>
                        <Typography style={{ marginBottom: "1rem" }}>
                            Enter Game Results:
                        </Typography>
                    </Box>
                    <div style={{ margin: "auto"}}>
                        <br />
                        <form
                            style={{
                               
                                marginRight: "2rem"
                            }}>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={first}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setFirst(e.target.value)
                                }
                                className="input-field"
                                placeholder="First place"
                                style={{
                                    marginBottom: "2rem",
                                    width: "200px",
                                }}
                            /><br/>
                            <input
                                type="text"
                                id="time"
                                name="time"
                                value={second}
                                onChange={secondHandler}
                                className="input-field"
                                placeholder="Second place"
                                style={{
                                    marginBottom: "2rem",
                                    width: "200px"
                                }}
                            /><br/>
                            <input
                                type="text"
                                id="cost"
                                name="cost"
                                value={firstValue}
                                onChange={firstValueHandler}
                                className="input-field"
                                placeholder="Money to winner"
                                style={{
                                    marginBottom: "2rem",
                                    width: "200px"
                                }}
                            /><br/>
                            <input
                                type="text"
                                id="cost"
                                name="cost"
                                value={secondValue}
                                onChange={secondValueHandler}
                                className="input-field"
                                placeholder="Money to second place"
                                style={{
                                    marginBottom: "2rem",
                                    width: "200px"
                                }}
                            />
                            <CardActions style={{ justifyContent: "center" }}>
                                <Button
                                    size="small"
                                    onClick={finishGameHandler}
                                >
                                    Submit
                                </Button>
                            </CardActions>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default CompletedGame;
