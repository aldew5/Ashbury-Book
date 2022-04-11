import {
    Dispatch,
    SetStateAction,
} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@material-ui/core";
import styles from "../../styles/Day.module.css";

interface EmptyGameProps {
    months: string[];
    date: Date;
    closeWindow: () => void;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
    setShowSelection: Dispatch<SetStateAction<boolean>>;
}

const EmptyGame = ({ months, date, closeWindow, setShowMenu, setShowSelection }: EmptyGameProps) => {

    const handleCreateGame = () => {
        setShowMenu(true);
        setShowSelection(true);
    };
    return (
        <Card sx={{ minWidth: 275, border: 2 }}>
            <div style={{ alignContent: "center" }}>
                <CardContent>
                    <Box style={{ float: "right" }}>
                        <ClearIcon onClick={closeWindow} />
                    </Box>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        {months[date.getMonth()]} {date.getDate()},
                        2022
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        style={{ margin: "auto" }}
                    >
                        No Games
                    </Typography>

                </CardContent>
                    <Button size="small" onClick={handleCreateGame}>
                        Create Game
                    </Button>
            </div>
        </Card >
    )
}

export default EmptyGame;