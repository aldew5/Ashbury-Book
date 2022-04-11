import Debts from "../components/Debts";
import Gains from "../components/Gains";
import styles from "../styles/Profile.module.css";
import NavBar from "../components/NavBar";
import Stats from "../components/Stats";
import { User } from "../interfaces/user";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import getUserData from "../utils/getUserData";

const Profile = () => {

    const [showGains, setShowGains] = useState<boolean>(false);
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

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        setUserData((await getUserData()) as User);
    };
    const updateDisplay = () => {
        setShowGains(!showGains);
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.stats}>
                    <Stats
                        username={userData.username}
                        games_played={userData.gamesPlayed}
                        firsts={userData.firsts}
                        seconds={userData.seconds}
                        score={userData.score}
                        earnings={userData.earnings}
                        uuid={userData.uuid}
                    />
                </div>
                <div className={styles.debts}>
                    {(!showGains) ?
                        <div>
                            <Debts />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={updateDisplay}>
                                View Gains
                            </Button>
                        </div> :
                        <div>
                            <Gains username={userData.username} />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={updateDisplay}>
                                View Debts
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Profile;
