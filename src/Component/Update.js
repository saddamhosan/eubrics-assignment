import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Update = () => {
    
    
    const {id}=useParams()
    const navigate=useNavigate()
    const [updateNote,setUpdateNote]=useState({})
    useEffect(()=>{
        fetch(`https://safe-basin-76577.herokuapp.com/notes/${id}`, {
          method: "get",
          headers: {
            authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setUpdateNote(data));
    },[id])
    const {task}=updateNote
    const handleUpdate=(e)=>{
e.preventDefault()
const task=e.target.note.value
console.log(task);
fetch(`https://safe-basin-76577.herokuapp.com/notes/${id}`, {
  method: "put",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
  body: JSON.stringify({ task }),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.modifiedCount) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your task successfully update",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(window.history.go(-1));
    }
  });
    }
    return (
      <div className="border rounded-xl w-1/2 mx-auto my-10 py-4">
        <h1 className="text-center text-3xl font-bold text-blue-400">
          Update Task
        </h1>
        <form onSubmit={handleUpdate}>
          <input
            className="w-10/12 mx-auto block rounded-xl px-2 py-1 my-2 border"
            type="text"
            name="note"
            defaultValue={task}
          />
          <input
            className="btn btn-outline btn-sm block mx-auto"
            type="submit"
            value="Update"
          />
        </form>
      </div>
    );
};

export default Update;