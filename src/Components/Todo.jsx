import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const addTodo = () => {
    if(todo !== ''){
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
    }
    if(editId){
      const editTodo = todos.find((task) => task.id === editId)
      const updateTodo = todos.map((task)=>task.id===editTodo.id
      ? (task = {id : task.id, list : todo})
      : (task = {id : task.id, list : task.list}))
      setTodos(updateTodo)
      setEditId(0)
      setTodo('')
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((task) => {
      if (task.id === id) return { ...task, status: !task.status };
      return task;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((task) => task.id === id);
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your task"
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}> {editId? 'EDIT' : 'ADD'} </button>
      </form>
      <div className="list">
        <ul>
          {todos.map((task) => (
            <li className="list-items">
              <div
                className="list-item-list"
                id={task.status ? "list-item" : ""}
              >
                {task.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(task.id)}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(task.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(task.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
