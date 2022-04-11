import styles from "../styles/Login.module.css";
import Button from "@material-ui/core/Button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [key, setKey] = useState<string>("");

    const navigate = useNavigate();

    const returnHandler = () => {
        navigate("/");
    }
    const registerUser = async (e: any) => {
        e.preventDefault();
        const request = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                key,
                email,
            }),
        });

        const response = await request.json();

        if (response.success) {
            window.localStorage.setItem("token", response.data);
            navigate("/hub");
        } else {
            alert(response.message);
        }
    }

    return (
        <div>
            <h2>Create Account</h2>
            <div className={styles["form-style-2"]}>
                <form>
                    <div>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            className={styles["input-field"]}
                            placeholder="Password"
                        />
                    </div><br />
                    <div>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className={styles["input-field"]}
                            placeholder="Email"
                        />
                    </div><br />
                    <div>
                        <input
                            type="password"
                            id="key"
                            name="key"
                            value={key}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setKey(e.target.value)}
                            className={styles["input-field"]}
                            placeholder="Key"
                        />
                    </div><br />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={registerUser}>
                        Register User
                    </Button>
                    <hr />
                    <button onClick={returnHandler}>Return to Login</button>
                </form>
            </div>
        </div>
    )
}

export default CreateAccount;