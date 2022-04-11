import styles from "../styles/Stats.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, createTheme, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";

interface StatsProps {
    username: string,
    firsts: number,
    seconds: number,
    earnings: number,
    score: number,
    games_played: number,
    uuid: string;
}

const theme = createTheme({
    typography: {
        subtitle1: {
            fontSize: 20,
        },
        body1: {
            fontWeight: 500,
            color: "grey",
        },
        body2: {
            fontWeight: 500,
            color: "grey",
            fontSize: 14,
        },
    },
});

const Stats = ({ username, firsts, seconds, earnings, score, games_played, uuid }: StatsProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (uuid !== "") {
            setIsLoading(false);
        }
    }, [uuid])

    return (
        <div className={styles.main}>
            <Card sx={{ minWidth: 275, border: 1, minHeight: 500 }}>
                {(isLoading) ? <div className={styles.loading}><Typography variant="h5">Loading...</Typography></div>
                    :
                    <CardContent>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h4" style={{
                                marginBottom: "1rem",
                            }}>{username}</Typography>
                            <Box>
                                <Typography variant="body1" style={{
                                    marginBottom: "1rem",
                                }}> First place finishes: {firsts}</Typography>
                                <Typography variant="body1" style={{
                                    marginBottom: "1rem",
                                }}>Second place finishes: {seconds}</Typography>
                                <Typography variant="body1" style={{
                                    marginBottom: "1rem",
                                }}>Games played: {games_played}</Typography>
                                <Typography variant="body1" style={{
                                    marginBottom: "1rem",
                                }}>Score: {score}</Typography>
                                <Typography variant="body1" style={{
                                    marginBottom: "1rem",
                                }}>Net earnings: ${earnings}</Typography>

                            </Box>
                        </ThemeProvider>
                    </CardContent>
                }
            </Card>
        </div >
    )
}

export default Stats;