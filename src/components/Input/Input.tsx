import { useState, useEffect } from "react";
import "../../styles/Input.css";

type Props = {
    label: string,
    type: "text" | "password" | "date",
    onChange: (value: string) => void,
    value?: string
}

function Input(props: Props) {

    const [visible, setVisible] = useState(false);
    const [eyeIcon, setEyeIcon] = useState("");

    useEffect(
        () => {setEyeIcon(visible ? "visibility_off" : "visibility")},
        [visible]
    );

    switch(props.type) {
        case "text":
        case "date":
            return (
                <div className="input-container">
                    <label className="input-label">{props.label}</label>
                    <input 
                        className="input-field"
                        type={props.type} 
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        />
                </div>
            );
        case "password":
            return (
                <div className="input-container">
                    <label className="input-label">{props.label}</label>
                    <div className="eye-container">
                        <input 
                            className="input-field"
                            type={visible ? "text" : "password"} 
                            value={props.value}
                            onChange={(e) => props.onChange(e.target.value)}
                            />
                            <span className="material-symbols-outlined eye-icon" onClick={() => setVisible(!visible)}>
                                {eyeIcon}
                            </span>
                    </div>
                </div>
            )
    }
}

export default Input;
