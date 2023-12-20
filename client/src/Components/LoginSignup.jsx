import React, { useState } from "react";
import "../Components/LoginSignup.css";
import { IoPerson } from "react-icons/io5";
import { TbMailFilled } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginSignUp() {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/register", { name, email, password })
      .then((res) => {
        alert("Created Succesfully");
        setName("");
        setEmail("");
        setPassword("");
        localStorage.setItem("username", res.data.name);
        localStorage.setItem("useremail", res.data.email);
        setAction("Login");
      })
      .catch((err) => console.log(err));
  };

  const handleLog = async (event) => {
    try {
      event.preventDefault();
      const display = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(display);
      localStorage.setItem("username", display.data.username);
      localStorage.setItem("useremail", email);
      nav("/home");
    } catch (error) {
      console.log("Error on passing data", error);
      setError("Invalid Email Or Password");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="text">{action}</h1>
      </div>
      <h4 style={{ color: "red", marginTop: "20px", marginLeft: "150px" }}>
        {error}
      </h4>

      <div className="inputs">
        {action === "Login" ? (
          <div> </div>
        ) : (
          <div className="input">
            <IoPerson className="icon" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        )}

        <div className="input">
          <TbMailFilled className="icon" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <RiLockPasswordFill className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div className="forgot-password">
          {" "}
          I Have an Account...{" "}
          <span
            onClick={() => {
              setAction("Login");
            }}
          >
            Click Here..!
          </span>
        </div>
      ) : (
        <div className="forgot-password">
          Lost Password..? <span>Click Here..!</span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={(event) => {
            setAction("Sign Up");
            handleSubmit(event);
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={(event) => {
            setAction("Login");
            handleLog(event);
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
