import "../../styles/Button.css";

type Props = {
    buttonType: "button" | "submit" | "reset" | undefined,
    color: "blue" | "green" | "red" | "grey",
    text: string,
    onclick?: VoidFunction

}

function Button(props: Props){
    return(
        <button className={"btn " + props.color + "-btn"} 
            type={props.buttonType}
            onClick={props.onclick}>
                {props.text}
        </button>
    );
}

export default Button;