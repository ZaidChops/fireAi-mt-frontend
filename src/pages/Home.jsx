import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { allTodo, deletedTodo } from "../features/todo/todoSlice";
import View from "../components/View";
import EditForm from "../components/EditForm";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [todoId, setTodoId] = useState("");
  let deleteId = "";
  const [searchWord, setSearchWord] = useState("");
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todo);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  useEffect(() => {
    dispatch(allTodo());
    if (!user.token) {
      navigate("/login");
    }
  }, [user?.token]);

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center position-relative p-4">
      <div className="w-100 h-100 z-1 p-4 m-0 rounded d-flex flex-column align-items-center  bg-secondary text-black-50">
        {/* //search */}
        <form
          className="w-100 d-flex flex-column-reverse align-items-center justify-content-center"
          role="search"
        >
          <input
            className="form-control w-50  rounded-pill shadow"
            type="search"
            placeholder="Search anything"
            aria-label="Search"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />

          <button
            className="btn btn-primary w-50 mx-2 my-2 px-3 rounded-pill shadow"
            type="button"
            onClick={handleOpen}
          >
            Add +
          </button>
        </form>
        {/* // todos */}
        <ul className="w-100 my-4">
          {todos?.length == 0 && (
            <li className="container w-100 my-2 px-2 py-1 d-flex flex-row align-items-center justify-content-center text-light rounded">
              <h4>Add Any Todo 📝</h4>
            </li>
          )}
          {todos?.length > 0 &&
            todos?.map((todo, index) => {
              if (
                todo?.title
                  ?.toLowerCase()
                  .includes(searchWord?.toLowerCase()) ||
                todo?.description
                  ?.toLowerCase()
                  .includes(searchWord?.toLowerCase())
              ) {
                return (
                  <li
                    className="container w-50 my-2 px-2 py-1 d-flex flex-row align-items-center justify-content-between bg-light text-dark rounded "
                    key={index}
                  >
                    <p>
                      <span>{index + 1}.</span> {todo?.title}
                    </p>

                    <span className=" p-1 ">
                      <IoIosEye
                        size={25}
                        className="mx-2 rounded bg-tertiary"
                        onClick={() => {
                          setTodoId(index);
                          setViewOpen(true);
                        }}
                      />
                      <MdDelete
                        size={25}
                        className="mx-2 rounded  bg-tertiary"
                        onClick={() => {
                          dispatch(deletedTodo((deleteId = todo?._id)));
                        }}
                      />
                    </span>
                  </li>
                );
              } else if (searchWord == 0) {
                return (
                  <li
                    className="container w-50 my-2 px-2 py-1 d-flex flex-row align-items-center justify-content-between bg-light text-dark rounded "
                    key={index}
                  >
                    <p>
                      <span>{index + 1}.</span> {todo?.title}
                    </p>

                    <span className=" p-1 ">
                      <IoIosEye
                        size={25}
                        className="mx-2 rounded bg-tertiary"
                        onClick={() => {
                          setTodoId(index);
                          setViewOpen(true);
                        }}
                      />
                      <MdDelete
                        size={25}
                        className="mx-2 rounded  bg-tertiary"
                        onClick={() => {
                          dispatch(deletedTodo((deleteId = todo?._id)));
                        }}
                      />
                    </span>
                  </li>
                );
              }
            })}
        </ul>
      </div>
      <TodoForm setOpen={setOpen} open={open} />
      {viewOpen && (
        <View
          setViewOpen={setViewOpen}
          setEditOpen={setEditOpen}
          todoId={todoId}
        />
      )}
      {editOpen && (
        <EditForm
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          todoId={todoId}
        />
      )}
    </div>
  );
}

export default Home;
