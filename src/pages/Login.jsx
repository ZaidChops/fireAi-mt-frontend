import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    );

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(data));
  };

    useEffect(() => {
      if (isError || message) {
        toast.error(message);
      }

      if (user?.token) {
        navigate("/");
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
      <h1 className="text-center text-secondary">Login Here</h1>
      <div className="card p-3 my-3">
        <form className="my-3" id="login" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <h6 className="text-center text-secondary">
          Don't have any account? <Link to={"/signup"}>Signup</Link>
        </h6>
      </div>
    </div>
  );
}

export default Login;
