import React, { useState, useEffect } from 'react';

const Task = (props) => 
{
    const [checked, setChecked] = useState(false);

    useEffect(() => 
    {
        const isChecked = localStorage.getItem(`${props.index}`);
        if (isChecked !== null) {
            setChecked(isChecked === 'true');
        }
    }, [props.index]);

    const handleCheck = () => 
    {
        const newCheckedState = !checked;
        setChecked(newCheckedState);
        localStorage.setItem(`${props.index}`, newCheckedState.toString());
    };

    const handleDelete = () => {
        props.onDelete(props.index);
    };

    const handleEdit = () => {
        props.onEdit(props.index);
    };

    return (
        <>
            {props.task && (
                <div className={!checked ? 'task' : 'blur task'}>
                    <div className='innerTask border' key={props.index}>
                        <div className='taskName'>
                            <div className='done'>
                                <input type="checkbox" checked={checked} onChange={handleCheck} />
                            </div>
                            <div className={!checked ? 'font' : 'strike-through blur'}>
                                {props.task}
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
    );
};

export default Task;
