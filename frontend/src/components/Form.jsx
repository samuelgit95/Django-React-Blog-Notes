import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import Loadingindicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterRedirect = () => {
        navigate("/register");
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <Loadingindicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
            {method === "login" && (
                <button
                    type="button"
                    className="form-button register-button"
                    onClick={handleRegisterRedirect}
                >
                    Don't have an account? Register here
                </button>
            )}
            {method === "register" && (
                <button
                    type="button"
                    className="form-button register-button"
                    onClick={handleLoginRedirect}
                >
                    Go to login
                </button>
            )}
        </form>
    );
}

export default Form;
