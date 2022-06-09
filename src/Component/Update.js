import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const [updateNote,setUpdateNote]=useState({})
    useEffect(()=>{
        fetch(`http://localhost:5000/notes/${id}`)
          .then((res) => res.json())
          .then((data) => setUpdateNote(data));
    },[id])
    const {task}=updateNote
    const handleUpdate=(e)=>{
e.preventDefault()
const task=e.target.note.value
console.log(task);
fetch(`http://localhost:5000/notes/${id}`,{
    method:'put',
    headers:{
        'content-type':'application/json',
    },
    body:JSON.stringify({task})
}).then(res=>res.json()).then(data=>{
    if (data.modifiedCount) {
        navigate('/')
    }
})
    }
    return (
        <div>
            <form onSubmit={handleUpdate}>
                <input type="text" name='note' defaultValue={task} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;