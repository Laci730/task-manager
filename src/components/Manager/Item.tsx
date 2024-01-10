import { useState } from "react"
import "../../styles/Item.css"

type Props = {
    id: number,
    name: string,
    desc: string,
    deadline: string,
    onRemove: (id: number) => void,
    onEdit: (id: number, newVal: string) => void
}

function Item(props: Props) {
    const [visibility, setVisibility] = useState<string>("hidden");
    const [view, setView] = useState<string>("simple");
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(props.desc);

    function handleOpen() {
        setTimeout(() => setVisibility("visible"), 150);
        setView("expanded");
    }

    function handleClose() {
        setVisibility("hidden");
        setView("simple");
        setIsEditing(false);
    }

    function handleEdit() {
        setIsEditing(!isEditing)
        if (isEditing) {
            props.onEdit(props.id, description);
        }
    }

    return (
        <div className={"task-item " + view}>
            <div className="simple-content" onClick={handleOpen}>
                <p className="task-name">{props.name}</p> 
                <div className="task-deadline">
                    <span className="material-symbols-outlined">
                        schedule
                    </span>
                    {props.deadline}
                </div>
            </div>
            <div className={"item-expand " + visibility}>
                {!isEditing && 
                    <p className="task-description">
                        {description}
                    </p>
                }
                {isEditing && 
                    <textarea 
                        className="task-description" 
                        value={description} 
                        onChange={(e) => {setDescription(e.target.value)}} />
                }
                <div 
                    className="delete-button" 
                    onClick={() => props.onRemove(props.id)}>
                        Delete task
                </div>
                <span 
                    className={"material-symbols-outlined minimize-button " + visibility}
                    onClick={handleClose}>
                        expand_less
                </span>
                <div 
                    className={isEditing ? "save-button" : "edit-button"}
                    onClick={handleEdit}>
                        {isEditing ? "Save" : "Edit"}
                </div>
            </div>
        </div>
    );
}

export default Item;
