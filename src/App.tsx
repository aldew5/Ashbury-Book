import "./App.css";
import Landing from "./pages/Landing";
import Hub from "./pages/Hub";
import Profile from "./pages/Profile";
import Retreival from "./pages/Retrieval";
import CreateAccount from "./pages/CreateAccount";

import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Game } from "./interfaces/game";
import { CashGame } from "./interfaces/cashGame";

function App() {
    const [cashGames, setCashGames] = useState<CashGame[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const getGames = async () => {
        const request = await fetch(`getGames`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const response = await request.json();
        setGames(response.data);

        if (response.success) {
            console.log("Games retrieved");
        }
        else {
            alert("Failed");
        }
    }

    const getCashGames = async () => {
        const request = await fetch(`getCashGames`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const response = await request.json();
        setCashGames(response.data);

        if (response.success) {
            console.log("Cash games retrieved");
        }
        else {
            alert("Failed");
        }
    }

    useEffect(() => {
        getGames();
        getCashGames();
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <Landing
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                        />}
                    />
                    <Route path="/hub" element={
                        <Hub
                            cashGames={cashGames}
                            games={games}
                            setGames={setGames}
                            username={username}
                        />} />
                    <Route path="/profile" element={
                        <Profile />
                    } />
                    <Route path="/retrieval" element={
                        <Retreival />
                    } />
                    <Route path="/createAccount" element={<CreateAccount />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
