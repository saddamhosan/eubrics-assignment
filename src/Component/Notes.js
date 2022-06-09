import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../Firebase.init";

const Notes = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [names, setNames] = useState({});
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch(`https://safe-basin-76577.herokuapp.com/collection/${id}`)
      .then((res) => res.json())
      .then((data) => setNames(data));
  }, [id]);

  const name = names?.name;
  const email = user?.email;

  useEffect(() => {
    fetch(`https://safe-basin-76577.herokuapp.com/note?name=${name}&email=${email}`)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [email, name, notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const note = {
      name,
      email,
      task,
    };
    fetch("https://safe-basin-76577.herokuapp.com/note", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.insertedId){
          e.target.reset()
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`https://safe-basin-76577.herokuapp.com/note/${id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          alert("delete Successfully");
        }
      });
  };

  const handleUpdate=(id)=>{
    navigate(`/update/${id}`)
    console.log(id);
  }

  return (
    <div>
      <div className="border rounded-xl w-1/2 mx-auto my-10 py-4">
        <h1 className="text-center text-3xl font-bold text-blue-400">
          Add a new Task
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-10/12 mx-auto block rounded-xl px-2 py-1 my-2 border"
            type="text"
            name="task"
            placeholder="Add a new task"
          />
          <input
            className="btn btn-outline btn-sm block mx-auto"
            type="submit"
            value="Add"
          />
        </form>
      </div>
      <div>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Task</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => (
                <tr key={note._id}>
                  <th>{index + 1}</th>
                  <td>{note.task}</td>
                  <td
                    className="cursor-pointer text-3xl text-blue-500"
                    onClick={() => handleUpdate(note._id)}
                  >
                    <AiFillEdit />
                  </td>
                  <td
                    className="cursor-pointer text-3xl text-red-600"
                    onClick={() => handleDelete(note._id)}
                  >
                    <MdDeleteForever />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Notes;
