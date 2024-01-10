import Button from "../Button/Button";
import Input from "../Input/Input";
import "../../styles/ItemForm.css";
import { useState } from "react";

type Props = {
    editing: boolean,
    onClose: () => void,
    onSubmit: (item: {name: string, description: string, deadline: string}) => void
}

function ItemForm(props: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [error, setError] = useState("");

    function createItem(e: React.FormEvent) {
        e.preventDefault();
        if (title && deadline) {
            const taskItem = {
                name: title,
                description: description,
                deadline: deadline
            };
            props.onSubmit(taskItem);
        }
        else {
            setError("Please provide at least a name and deadline for your task.")
        }
    }

    return (
        <div className="item-form-bg">
            <form onSubmit={createItem} className="item-form">
                <span 
                    className="material-symbols-outlined close-button"
                    onClick={props.onClose}>
                    close
                </span>
                <h4 className="item-form-title">Create new task</h4>
                <Input type="text" label="Name" onChange={(val) => {setTitle(val)}}/>
                <Input type="date" label="Deadline" onChange={(val) => {setDeadline(val)}}/>
                <div className="description-container">
                    <label>Description</label>
                    <textarea 
                        name="description" 
                        className="description-input"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <Button color="green" buttonType="submit" text="Add task"/>
                {error && <p className="input-form-error">{error}</p>}
            </form>
        </div>
    );
}

export default ItemForm;
