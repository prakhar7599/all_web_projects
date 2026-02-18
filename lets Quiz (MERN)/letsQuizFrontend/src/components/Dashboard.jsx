import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const [user, setUser] = useState({})
  const navigate = useNavigate()

  // this is to handle the create quiz button
  const handleCreateQuiz = () => {
    navigate('/createQuiz')
  }

  // this is to get the user details
  const getUserDetails = () => {
    const userDetails = axios.get(`https://letsquizbakcend.onrender.com/api/v1/users/getUserDetails`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    }).then((res) => {
      setUser(res.data.data)
    }).catch((err) => {
      // console.log(err.response.status);
      console.log(err);
    })
  }

  // this is to handle the logout button
  const handleOnClick = () => {
    axios.post(`https://letsquizbakcend.onrender.com/api/v1/users/logout`, {}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then((res) => {
      navigate('/user/login')
    }).catch((err) => {
      console.log(err);
    })
  }

  // this is to handle the profile button
  const profilePage = () => {
    navigate('/user/profile')
  }

  // this is to handle the attempt quiz button
  const handleAttemptQuiz = () => {
    navigate('/QuizCodePage')
  }

  const myQuizHistory = () => {
    navigate('/quizHistory')
  }

  const quizzesPage = () => {
    navigate('/quizzesPage')
  }
  useEffect(() => {
    getUserDetails() // when the component is mounted, the user details are fetched from the server
  }, [])


  return (
    <nav className='w-full h-[12%] py-3 px-8 font-bold flex items-center justify-between bg-black text-white mallanna-regular'>
      <ul>
        <h1 className='text-5xl text-white'><Link to={`/`}>LetsQuiz</Link></h1>
      </ul>

      <div className='w-1/2 min-h-16 flex gap-5 items-center justify-around'>
        <button className='text-lg hover:bg-cyan-500 border-2 border-white py-2 px-1' onClick={quizzesPage}>Quizzes Page</button>
        <button className='text-lg hover:bg-cyan-500 border-2 border-white py-2 px-1' onClick={handleCreateQuiz} >Create a Quiz</button>
        <button className='text-lg hover:bg-cyan-500 border-2 border-white py-2 px-1' onClick={handleAttemptQuiz}>Attept a Quiz</button>
        <button className='text-lg hover:bg-cyan-500 border-2 border-white py-2 px-1' onClick={myQuizHistory}>My Quiz History</button>
      </div>

      <div className='w-[25%] flex gap-5 items-center justify-end '>
        <img className='h-20 w-20 rounded-3xl ' src={`${user.avatar}`} alt="avatar of user" />
        <h1 className='text-lg'>{user.username}</h1>
        <div className='min-h-16 w-1 border-2 border-white '></div>
        <button className='text-lg hover:bg-cyan-500 border-2 border-white py-2 px-3' onClick={profilePage} >Profile</button>
        <button className='text-lg hover:bg-cyan-500 border-2 border-white py-2 px-3' onClick={handleOnClick}>Logout</button>
      </div>
    </nav>
  )
}

export default Dashboard