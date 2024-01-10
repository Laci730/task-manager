import { useState } from "react"
import ItemForm from "./ItemForm"
import Item from "./Item"
import "../../styles/Manager.css"
import { Navigate } from "react-router-dom"
import Button from "../Button/Button"

function Manager() {
    const currentUsername = localStorage.getItem("currentUser") || "";
    const registeredUsers: User[] = JSON.parse(localStorage.getItem("userStorage") || '{"users": []}').users;
    const currentUserObject = registeredUsers.find((user: User) => user.username === currentUsername);
    const [showItemForm, setShowItemForm] = useState(false);
    let taskList: Task[] = [];
    
    if (currentUserObject) {
        taskList = currentUserObject.tasks;
    }

    function findUserIndexByUsername(username: string) {
        return registeredUsers.findIndex((user: User) => user.username === username);
    }

    function addNewItem(item: {name: string, description: string, deadline: string}) {
        const newItem: Task= {
            id: taskList.length,
            name: item.name,
            description: item.description,
            deadline: item.deadline
        }
        taskList.push(newItem);
        const userIndex = findUserIndexByUsername(currentUsername);
        registeredUsers[userIndex].tasks = taskList;
        localStorage.setItem("userStorage", JSON.stringify({users: registeredUsers}));
        setShowItemForm(false);
    }

    function removeItem(id: number) {
        taskList = taskList.filter((task: Task) => task.id !== id);
        for(let i = 0; i < taskList.length; i++) {
            taskList[i].id = i;
        }
        const userIndex = findUserIndexByUsername(currentUsername);
        registeredUsers[userIndex].tasks = taskList;
        localStorage.setItem("userStorage", JSON.stringify({users: registeredUsers}));
        location.reload();
    }

    function editItem (id: number, newVal: string) {
        const userIndex = findUserIndexByUsername(currentUsername);
        taskList[id].description = newVal;
        registeredUsers[userIndex].tasks = taskList;
        localStorage.setItem("userStorage", JSON.stringify({users: registeredUsers}));
        
    }

    function handleLogOut() {
        localStorage.removeItem("currentUser");
        location.reload();
    }

    return (
        <div className="main-page-container">
            <Button 
                color="red" 
                text="Log out" 
                buttonType="button" 
                onclick={handleLogOut}
            />
            {!currentUsername && <Navigate to="../login" />}
            <div className="item-container">
                {taskList.map((task) => {
                    return (
                        <Item
                            key={task.id}
                            id={task.id}
                            name={task.name} 
                            desc={task.description}
                            deadline={task.deadline}
                            onRemove={removeItem}
                            onEdit={editItem}/>
                    );
                })}
            </div>
            <div className="add-item" 
                onClick={() => {setShowItemForm(true)}}>
                <span className="material-symbols-outlined">
                    add
                </span>
                <p>Add new task</p>
            </div>
            {showItemForm &&
             <ItemForm
                editing={false}
                onClose={() => {setShowItemForm(false)}}
                onSubmit={addNewItem}/>
            }
        </div>
    );
}

export default Manager;
