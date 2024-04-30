import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

function Navbar() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false)

  const handleLogout = () => {
    // dispatch(logoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("todos");
    setLogout(true)
    
  };
  
  useEffect(() => {
    if(logout){
      navigate("/login")
      setLogout(false)
    }
  }, [logout])
  

  return (
    <nav className="w-100 navbar navbar-expand-lg bg-body-secondary">
      <div className="w-100 container-fluid  ">
        <a className="navbar-brand fs-4 fw-semibold text-secondary" href="#">
          TODO
        </a>
        {user?.name && (
          <div className="d-flex">
        <button className="btn btn-outline-danger mx-3" onClick={handleLogout}>Logout</button>
        </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
