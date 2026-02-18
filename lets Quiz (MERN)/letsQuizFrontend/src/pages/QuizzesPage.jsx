import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../components/Dashboard";

const QuizzesPage = () => {
  const [activeQuizzes, setActiveQuizzes] = useState({});
  const [upcomingQuizzes, setUpcomingQuizzes] = useState({});
  // const navigate = useNavigate()

  const getActiveQuizzes = () => {
    axios
      .get("https://letsquizbakcend.onrender.com/api/v1/quiz/activeQuizzes", {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setActiveQuizzes(response.data.data);
        // console.log(response.data.data[0].availableTill.getTimezoneOffset());
      }).catch((error) => {
        console.log(error);
      })
  };

  const getUpcomingQuizzes = () => {
    axios
      .get("https://letsquizbakcend.onrender.com/api/v1/quiz/upcomingQuizzes", {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data[0].availableAfter.getTimezoneOffset());
        setUpcomingQuizzes(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getActiveQuizzes();
    getUpcomingQuizzes();
  }, []);
  return (
    <div className="bg-[#36454F] w-full h-dvh">
      <Dashboard />

      <div className="mt-2">
        <h1 className="text-5xl text-center text-white">Quizzes</h1>
        <div className="flex flex-col py-5 items-center justify-center">
          <div className="w-11/12 flex flex-col flex-wrap gap-5 mt-5">
            <h2 className="text-2xl text-white">Active Quizzes</h2>
            <div className="w-11/12 px-5 py-7 flex gap-5 mt-2 bg-black overflow-x-scroll rounded-md">
              {activeQuizzes.length > 0 ? (
                activeQuizzes.map((quiz, index) => {
                  return (
                    <div
                      key={index}
                      id={index}
                      className="min-w-[20rem] bg-blue-300 p-5 rounded-md flex flex-col gap-2"
                    >
                      <h2>{index}</h2>
                      <h2 className="text-2xl">{quiz.quizTitle}</h2>
                      <p className="text-lg">{quiz.quizDescription}</p>
                      <p className="text-sm text-gray-500">
                        Available until:{" "}
                        {new Date(quiz.availableTill).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <Link
                        to={`/attemptQuiz/${quiz.quizCode}`}
                        className="w-1/2 bg-blue-500 text-white p-2 rounded-md text-center"
                      >
                        Attempt Quiz
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h2 className="text-2xl text-white">No Active Quizzes</h2>
              )}
            </div>
          </div>

          <div className="w-11/12 flex flex-col flex-wrap gap-5 mt-5">
            <h2 className="text-2xl text-white">Upcoming Quizzes</h2>
            <div className="w-11/12 px-5 py-7 flex gap-5 mt-2 bg-black overflow-x-scroll rounded-md">
              {upcomingQuizzes.length > 0 ? (
                upcomingQuizzes.map((quiz, index) => {
                  return (
                    <div
                      key={index}
                      id={index}
                      className="min-w-[20rem] bg-blue-300 p-5 rounded-md flex flex-col gap-2"
                    >
                      <h2>{index}</h2>
                      <h2 className="text-2xl">{quiz.quizTitle}</h2>
                      <p className="text-lg">{quiz.quizDescription}</p>
                      <p className="text-sm text-gray-500">
                        Available from:{" "}
                        {new Date(quiz.availableAfter).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {/* <p className="text-sm text-gray-500">
                        Available until:{" "}
                        {new Date(quiz.availableTill).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p> */}
                    </div>
                  );
                })
              ) : (
                <h2 className="text-2xl text-white">No Upcoming Quizzes</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;
