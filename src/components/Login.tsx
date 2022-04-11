import styles from "../styles/Login.module.css";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { KeyboardEvent } from "react";

interface LoginProps {
    username: string,
    password: string,
    setPassword: Function,
    setUsername: Function;
}

const Login = ({ username, setUsername, password, setPassword }: LoginProps) => {

    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/createAccount");
    }
    const forgotPass = () => {
        navigate("/retrieval");
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            loginUser();
        }
    }

    const loginUser = async () => {
        const request = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const response = await request.json();

        if (response.success) {
            window.localStorage.setItem("token", response.data);
            navigate("/hub");
        } else {
            alert(response.message);
        }
    };

    return (
        <div className={styles["form-style-2"]} onKeyDown={handleKeyDown}>
            <form>
                <div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        className={styles["input-field"]}
                        placeholder="Username"
                    />
                </div><br />
                <div>
                    <input
                        type="password"
                        id="pass"
                        name="pass"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        className={styles["input-field"]}
                        placeholder="Password"
                    />
                </div><br />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={loginUser}>
                    Log In
                </Button>
                <p onClick={forgotPass}>Forgot password?</p>
                <hr />
                <Button
                    variant="contained"
                    color="default"
                    onClick={handleCreate}>
                    Create New Account
                </Button>
            </form>
        </div>
    );
};

export default Login;
