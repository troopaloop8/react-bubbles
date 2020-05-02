import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <h1>Welcome to React Bubbles!</h1>
        <h2>Let's Get Poppin!</h2>
      </div>
      <div>
        <form onSubmit={login}>
          <div>
            <input
              name="username"
              placeholder="username"
              onChange={handleChange}
              value={user.username}
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={user.password}
            />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
