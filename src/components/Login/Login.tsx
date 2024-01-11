import { useState } from "react";
import "../../styles/Login.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import LoginText from "./LoginText";
import { Link, Navigate } from "react-router-dom";

function Login() {
    const currentUser = localStorage.getItem("currentUser");
    const users = localStorage.getItem("userStorage") || '{"users": []}';
    const [username, setUsername] = useState("");
    const [password, setPassword]= useState("");
    const [error, setError] = useState("");

    function submitForm(e: React.FormEvent) {
        e.preventDefault();
        const userList = JSON.parse(users).users;
        const userMatch = userList.find((user: User) => user.username === username && user.password === password);

        if(username && userMatch){
            localStorage.setItem("currentUser", userMatch.username);
            setError("Success")
        } else {
            setError("Wrong username or password.")
        }
        
        setUsername("");
        setPassword("");
    }
    
    return (
        <div className="login-container">
            {currentUser && <Navigate to="../" />}
            <form className="login-form" onSubmit={submitForm}>
                <Input
                    type="text" 
                    label="Username" 
                    value={username} 
                    onChange={(val) => setUsername(val)} />
                <Input
                    type="password" 
                    label="Password" 
                    value={password} 
                    onChange={(val) => setPassword(val)} />
                <div className={"error-text"}>{error}</div>
                <Button 
                    buttonType="submit" 
                    color="blue" 
                    text="Log in" />
                <section className="signup-text">
                    Or create a <Link to="../signup">new account.</Link>
                </section>
            </form>
            <LoginText />
        </div>
    );
}

export default Login;
