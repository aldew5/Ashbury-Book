import Login from "../components/Login";
import styles from "../styles/Landing.module.css";

interface LandingProps {
    username: string,
    password: string,
    setPassword: Function,
    setUsername: Function;
}

const Landing = ({ username, setUsername, password, setPassword }: LandingProps) => {

    return (
        <div>
            <h1 className={styles.title}>The Ashbury Book</h1>
            <Login
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />
            <br />
            <div className={styles.explanation}>
                {/* Ashbury Book was made by students for students. It is a central hub for everything Ashbury.
                Post and read about classes, parties, events and everything else that goes on at the school.
                No teachers allowed. */}
                Ashbury Book is the official app of the Matthews House Poker Association.
            </div>
            <div className={styles.explanation}>
                Made by Alec (with emotional support from Maggie).
            </div>
        </div>
    );
}

export default Landing;