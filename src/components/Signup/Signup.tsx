import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "../../styles/Signup.css";
import PwStrengthText from "./PwStrengthText";

function Signup() {
    const users = localStorage.getItem("userStorage") || '{"users": []}';
    const [username, setUsername] = useState("");
    const [password, setPassword]= useState("");
    const [error, setError] = useState("");

    function submitForm(e: React.FormEvent) {
        e.preventDefault();
        const userList = JSON.parse(users).users;
        const user = userList.find((user: User) => user.username === username);
        try {
            if (user === undefined) {
                userList.push({
                    "username": username,
                    "password": password,
                    "tasks": []
                });
                localStorage.setItem("userStorage", JSON.stringify({users: userList}));
            } else {
                setError("Username is taken.");
            }   
        } catch(error) {
            setError("Invalid credentials.")
        }
        console.log(localStorage);
        setUsername("");
        setPassword("");
    }

    return(
        <form className="signup-form" onSubmit={submitForm}>
                <Input 
                    type="text" 
                    label="Username" 
                    value={username} 
                    onChange={(val) => setUsername(val)}/>
                <Input 
                    type="password" 
                    label="Password" 
                    value={password} 
                    onChange={(val) => setPassword(val)}/>
                <PwStrengthText value={password} />
                <div className={"error-text"}>{error}</div>
                <Button 
                    buttonType="submit" 
                    color="blue" 
                    text="Sign up"/>
        </form>
    );
}

export default Signup;
