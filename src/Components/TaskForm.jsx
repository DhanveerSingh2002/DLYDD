import React, { useEffect, useState } from 'react'
import Task from './Task'

const TaskForm = () => {
  const[task, setTask] = useState("");
  const[taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task.length !== 0) {
      setTaskList([...taskList, task]);
      saveThem([...taskList, task]);
    }
    setTask("");
  }

  useEffect(() => 
  {
    const tasks = localStorage.getItem('taskList');
    if (tasks) 
    {
      const objTasks = JSON.parse(tasks);
      setTaskList(objTasks);
    }
  }, [])

  const saveThem= (taskList) => {
    let data = JSON.stringify(taskList);
    localStorage.setItem("taskList", data);
  }

  document.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
      addTask();
      document.querySelector('.inputBar').blur();
    }
  });

  const handleChange = (e) =>{
    setTask(e.target.value);
    // saveThem(taskList);
  }

  const handleDelete = (index) => 
  {
    setTaskList(taskList.filter((_, i) => i !== index));
    saveThem(taskList.filter((_, i) => i !== index));
  }

  const handleEdit = (index) => 
  {
    setTask(taskList.filter((_, i) => i === index));
    if(task.length>0)
    {
      document.querySelector('.inputBar').value = task;
    }
    document.querySelector('.inputBar').focus();

    handleDelete(index);
    
    saveThem(taskList);
  };

  return (
    <>
    
        <div id="welcome">
            <h2>Just Do It !!!</h2>
        </div>
        <div className='container'>
          <div className="input">
            <input className='inputBar' value={task} onChange={handleChange} type="text" placeholder='Enter a task...'/>
            <div className="button">
              <button onClick={addTask} className={"add"}>Add task</button>

            </div>
          </div>
            {taskList.map((taskItem, index) => (
              <Task key={index} task={taskItem.task} index={index} onDelete={handleDelete} onEdit={handleEdit}/>
            ))}
        </div>
    </>
  )
}

export default TaskForm
