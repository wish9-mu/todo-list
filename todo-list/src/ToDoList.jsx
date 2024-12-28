import React, { useState } from "react";

function ToDoList() {
  const [isTyping, setIsTyping] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function toggleNewTask() {
    setIsTyping(!isTyping); 
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, {taskName: newTask, completed: false}]);
      setNewTask("");
      toggleNewTask();
    }
  }

  function removeTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }


  return (
    <div className="app-container">
      <div className="to-do-list">
        <h1>To-Do List</h1>

        <div className="add-task-container">
          {!isTyping ? (
            <>
              <button className="NEadd-button"
              onClick={toggleNewTask}>+ Add a task</button>
            </>
          ) : (
            <div className="task-input-container">
              <input
              type="text" value={newTask} placeholder="What will you do today?"
              onChange={handleInputChange} onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault(); 
                  addTask();
                }
              }}/>
              <button className="add-button" onClick={addTask}>
              Add Task
              </button>
            </div>
          )}
        </div>

        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className="taskFront">
                <input type="checkbox" onChange={() => removeTask(index)}  />
                <span className="taskName" onClick={toggleEdit}>{task.taskName}</span>
              </div>
              <div className="taskBack">
                <button className="move-button" onClick={() => moveTaskUp(index)}>
                  ⬆
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskDown(index)}
                >
                  ⬇
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <footer className="footer">gawa ni wishlu ✨ / edited ni sopya huahua 💖</footer>
    </div>
  );
}
export default ToDoList;
