import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    );

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(data));
  };

    useEffect(() => {
      if (isError || message) {
        toast.error(message);
      }

      if (user?.token) {
        navigate("/login");
      }
    }, [user, isError, message]);

    if (isLoading) {
      return (
        <div className="container p-5">
          <h1 className="display-5 text-secondary texg-center">Loading...</h1>
        </div>
      );
    }
  return (
    <div className="container-fluid p-5">
      <h1 className="text-center text-secondary">Signup Here</h1>
      <div className="card p-3 my-3">
        <form className="my-3" id="signup" onSubmit={handleSubmit}>
        <input
            type="text"
            className="form-control fw-medium my-3"
            placeholder="Enter your name"
            required
            autoComplete="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            type="email"
            className="form-control fw-medium my-3"
            placeholder="Enter Email"
            required
            autoComplete="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            className="form-control fw-medium my-3"
            placeholder="Enter Password"
            required
            autoComplete="off"
            name="confirm-password"
          />
          <input
            type="password"
            className="form-control fw-medium my-3"
            placeholder="confirm Password"
            required
            autoComplete="off"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button className="btn btn-primary w-100">Signup</button>
        </form>
        <h6 className="text-center text-secondary">
          Don't have any account? <Link to={"/login"}>Login</Link>
        </h6>
      </div>
    </div>
  );
}

export default Signup;
