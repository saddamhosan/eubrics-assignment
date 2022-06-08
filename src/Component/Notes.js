import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../Firebase.init";

const Notes = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [names, setNames] = useState({});
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/collection/${id}`)
      .then((res) => res.json())
      .then((data) => setNames(data));
  }, [id]);

  const name = names?.name;
  const email = user?.email;

  useEffect(() => {
    fetch(`http://localhost:5000/note?name=${name}&email=${email}`)
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
    fetch("http://localhost:5000/note", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/note/${id}`, {
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="task" placeholder="Add anew task" />
        <input type="submit" value="Add" />
      </form>

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
                  <td>
                    <label for="my-modal-3" class="btn modal-button">
                      Edit
                    </label>

                    <input
                      type="checkbox"
                      id="my-modal-3"
                      class="modal-toggle"
                    />
                    <div class="modal">
                      <div class="modal-box relative">
                        <label
                          for="my-modal-3"
                          class="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        <form >
                            <input type="text" name="noteUpdate" defaultValue={note.task} />
                        </form>
                      </div>
                    </div>
                  </td>
                  <td onClick={() => handleDelete(note._id)}>Delete</td>
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
