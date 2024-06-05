import React, { useEffect, useState } from 'react'
import Task from './Task'

const TaskForm = () => {
  const[task, setTask] = useState({});
  const[taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (Object.keys(task).length && task.value.length !== 0) {
      setTaskList([...taskList, task]);
      saveThem([...taskList, task]);
    }
    setTask({});
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
    const task={
      value:e.target.value,
      status:false
    }
    setTask(task);
    // saveThem(taskList);
  }

  const handleCheck = (index) => 
  {
    const tasks = taskList;
    tasks[index].status = !tasks[index].status;
    setTaskList(taskList);
    saveThem(taskList);
  }

  const handleDelete = (index) => 
  {
    setTaskList(taskList.filter((_, i) => i !== index));
    saveThem(taskList.filter((_, i) => i !== index));
    window.location.reload();
  }

  const handleEdit = (index) => 
  {
    setTask(taskList.filter((_, i) => i === index)[0]);
    if(Object.keys(task).length && task.value.length > 0)
    {
      document.querySelector('.inputBar').value = task.value;
    }
    document.querySelector('.inputBar').focus();
    setTaskList(taskList.filter((_, i) => i !== index));
    saveThem(taskList.filter((_, i) => i !== index));  
  };

  return (
    <>

        <div id="welcome">
            <h2>Just Do It !!!</h2>
        </div>
        <div className='container'>
          <div className="input">
            <input className='inputBar' value={task.value?task.value:""} onChange={handleChange} type="text" placeholder='Enter a task...'/>
            <div className="button">
              <button onClick={addTask} className={"add"}>Add task</button>

            </div>
          </div>
            {taskList.map((taskItem, index) => (
              <Task key={index} task={taskItem} index={index} onDelete={handleDelete} onEdit={handleEdit} onCheck={handleCheck}/>
            ))}
        </div>
    </>
  )
}

export default TaskForm
