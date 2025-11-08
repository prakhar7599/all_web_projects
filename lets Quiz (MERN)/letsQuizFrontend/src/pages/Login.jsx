import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    axios
      .post(
        "https://letsquizbakcend.onrender.com/api/v1/users/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/quizzesPage");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Invalid Credentials");
        }else {
          alert("Something went wrong! Please try again.");
        }
      });
  };

  const checkIfUserIsLoggedIn = () => {
    axios
      .get("https://letsquizbakcend.onrender.com/api/v1/users/isUserLoggedIn", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.statusCode);
        // setIsUserLoggedIn(res.data.statusCode)
        if (res.data.statusCode === 200) {
          navigate("/quizzesPage");
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 401) {
          // setIsUserLoggedIn(false)
          navigate("/user/login");
        }
      });
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <div className="h-dvh bg-[#36454F]">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-3 m-4 min-h-5">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="flex flex-col justify-center items-center gap-5 w-1/2 h-3/4 py-5 mb-5">
          <input
            required
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
