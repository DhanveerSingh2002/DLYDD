import React, {useState} from 'react'

const Task = (props) => {

    const[checked, setChecked] = useState(props.task.status);
    
    const handleCheck = () => {
        setChecked(!checked);
        props.onCheck(props.index);
    }

    const handleDelete = () => 
    {
        props.onDelete(props.index);
    }

    const handleEdit = () => 
    {
        props.onEdit(props.index);
    }

    return (
    <>
    {props.task &&(
        <div className={!checked?"task":"blur task"}>
        <div className='innerTask border' key={props.index}>
            <div className='taskName'>
                <div className='done'>
                    <input type="checkbox" onChange={handleCheck} name="" id="" checked={checked} />
                </div>
                <div className={!checked?"font":"strike-through blur"}>
                    {props.task.value}
                </div>
            </div>
            <div className='buttons'>
                <button onClick={handleDelete} className='delete'><i className="fa fa-trash" aria-hidden="true"></i></button>
                <button onClick={handleEdit} className='edit'><i className="fa fa-pencil" aria-hidden="true"></i></button>
            </div>
        </div>
        </div>
)}
    </>
    )
}

export default Task
