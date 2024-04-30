import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

function View({ todoId, setViewOpen, setEditOpen }) {
  const { todos } = useSelector((state) => state.todo);

  const todo = todos[todoId];

  return (
    <div
      className={
        "w-75 p-4 h-auto z-3 position-absolute top-50  d-flex  flex-column align-items-center justify-content-center bg-light rounded shadow opacity-100"
      }
    >
      <div className="w-100 d-flex align-items-center justify-content-end">
        <RxCross2 size={25} onClick={() => setViewOpen(false)} />
      </div>
      <h4>Detials </h4>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <label htmlFor="text">Title :</label>
        <input
          className="form-control w-50 mx-5  me-2 fs-6 m-2"
          type="text"
          value={todo?.title}
          name="title"
          autoComplete="off"
          disabled
        />
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <label htmlFor="description">Description :</label>
        <textarea
          className="form-control w-50 me-2 fs-6 m-2"
          value={todo?.description}
          name="description"
          autoComplete="off"
          disabled
        />
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <label htmlFor="status" className="mx-4">
          Status :
        </label>
        <input
          className="form-control w-50 mx-1  me-2 fs-6 m-2"
          type="text"
          value={todo?.isCompleted}
          name="isCompleted"
          autoComplete="off"
          disabled
        />
      </div>
      <button
        className="btn btn-primary w-50  fs-6 text-white"
        onClick={() => {
          setViewOpen(false);
          setEditOpen(true);
        }}
        type="button"
      >
        Edit Details
      </button>
    </div>
  );
}

export default View;
