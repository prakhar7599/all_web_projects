import React, {useEffect} from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
const Home = () => {

  const navigate = useNavigate()

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
        console.log(err);
        if (err?.response?.status === 401) {
          // setIsUserLoggedIn(false)
          navigate("/user/login");
        }
      });
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <div style={{backgroundImage: `url(bgImg.jpg)`}} className=' h-dvh'>
        <Navbar />
    <div className='flex flex-col md:flex-row items-center justify-center gap-6 m-4 text-white'>
        <div className='max-w-lg'>
            <h1 className='text-4xl font-bold text-center mb-4'>Welcome to LetsQuiz</h1>
            <h2 className='text-2xl text-center mb-6'>A platform to create and attempt quizzes</h2>
            <p className='text-lg text-center mb-6'>
                LetsQuiz is a user-friendly quiz platform designed to make creating and taking quizzes easy and enjoyable. Whether you're a teacher, a student, or just someone looking to test your knowledge, LetsQuiz has something for you.
            </p>
            <div className='text-lg'>
                <p className='mb-2'>Features of LetsQuiz:</p>
                <ul className='list-disc pl-6'>
                    <li>Easy quiz creation with a variety of question types</li>
                    <li>Customizable quizzes to suit your needs</li>
                    <li>Engaging user interface for quiz takers</li>
                    <li>Instant feedback and results</li>
                    <li>Shareable quizzes for easy distribution</li>
                </ul>
            </div>
        </div>
        <div className='max-w-lg'>
            <div className='text-lg'>
                <p className='mb-2'>How LetsQuiz can help:</p>
                <ul className='list-disc pl-6'>
                    <li>Teachers can create quizzes for students to assess learning</li>
                    <li>Students can test their knowledge and track their progress</li>
                    <li>Organizations can use quizzes for training and assessment</li>
                    <li>Anyone can create quizzes for fun and entertainment</li>
                </ul>
            </div>
            <div className='text-lg'>
                <p className='mb-2'>What makes LetsQuiz different:</p>
                <ul className='list-disc pl-6'>
                    <li>User-friendly interface for both creators and takers</li>
                    <li>Wide range of question types and customization options</li>
                    <li>Real-time feedback and results</li>
                    <li>Ability to share quizzes easily</li>
                </ul>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Home