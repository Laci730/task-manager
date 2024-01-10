import { useEffect, useState } from "react"
import "../../Styles/PwStrengthText.css"
import zxcvbn from "zxcvbn"

interface Props {
    value: string;
}

const PwStrengthText = ({ value }: Props) => {
    const [strength, setStrength] = useState<number>(0);
    const strengthLevels = ["Very weak", "Very weak", "Weak", "Good", "Strong"]
    const colors = ["red-text", "red-text", "yellow-text", "green-text", "blue-text"]
    const [style, setStyle] = useState<string>("pw-text")

    function checkStrength(password: string) {
        const pwStrength = zxcvbn(password).score;
        setStrength(pwStrength);
        if (password.length !== 0) {
            setStyle("pw-text " + colors[pwStrength]);
        }
        else {
            setStyle("pw-text");
        }
    }

    useEffect(() => {
        checkStrength(value);
    })

    return(
        <div className={style}>
            {strengthLevels[strength]} password
        </div>
    );
}

export default PwStrengthText;
