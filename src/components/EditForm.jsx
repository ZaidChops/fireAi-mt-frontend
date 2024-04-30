import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../features/todo/todoSlice";

function EditForm({ setEditOpen, editOpen, todoId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todo);

  const todo = todos[todoId];
  const [data, setData] = useState(todo);
  const { title, description, isCompleted } = data;

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      userId: user?.id,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("object", data);
    dispatch(editTodo(data));
    setEditOpen(false);
  };
  return (
    <div
      className={
        "w-75 p-4 h-auto z-3 position-absolute top-50  d-flex  flex-column align-items-center justify-content-center bg-light rounded shadow opacity-100"
      }
    >
      <div className="w-100 d-flex align-items-center justify-content-end">
        <RxCross2 size={25} onClick={() => setEditOpen(false)} />
      </div>
      <h4>Edit Detials </h4>
      <form
        className="mb-4 d-flex  flex-column align-items-center justify-content-center w-100"
        role="search"
        onSubmit={handleSubmit}
      >
        <div className="w-100 d-flex align-items-center justify-content-center">
          <label htmlFor="text">Title :</label>
          <input
            className="form-control w-50 mx-5  me-2 fs-5 m-2"
            type="text"
            value={title}
            name="title"
            autoComplete="off"
            placeholder="Write any task."
            aria-label="Add"
            onChange={handleChange}
          />
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center ">
          <label htmlFor="description">Description :</label>
          <textarea
            className="form-control w-50 me-2 fs-5 m-2"
            value={description}
            name="description"
            autoComplete="off"
            placeholder="Write description."
            aria-label="Add"
            onChange={handleChange}
          />
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center ">
          <label htmlFor="status" className="mx-4">
            Status :
          </label>
          <select
            className="form-select w-50  m-2"
            name="isCompleted"
            aria-label="Default select example"
            onChange={handleChange}
            defaultValue={isCompleted}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
        <button className="btn btn-success w-75  fs-5 text-white" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditForm;
