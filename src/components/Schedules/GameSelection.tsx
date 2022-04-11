import {
    Dispatch,
    SetStateAction,
} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface GameSelectionProps {
    setShowSelection: Dispatch<SetStateAction<boolean>>;
    setGameType: Dispatch<SetStateAction<string>>;
}


const GameSelection = ({ setShowSelection, setGameType }: GameSelectionProps) => {

    return (
        <Card sx={{ maxWidth: 450, minHeight: 250, border: 2 }}>
            <CardContent>
                <Typography style={{
                    marginBottom: "3rem",
                }}>Select Game Type:</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setGameType("cash");
                        setShowSelection(false);
                    }}
                    style={{
                        margin: "auto",
                        marginBottom: "1rem",
                        display: "block",
                    }}>
                    Cash
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                   
                    onClick={() => {
                        setGameType("tournament");
                        setShowSelection(false);
                    }}>
                    Tournament
                </Button>
            </CardContent >
        </Card >
    )
}

export default GameSelection;