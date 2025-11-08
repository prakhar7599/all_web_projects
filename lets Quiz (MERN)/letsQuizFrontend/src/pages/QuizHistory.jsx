import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { Link, useNavigate } from 'react-router-dom'

const QuizHistory = () => {

    const navigate = useNavigate()
    const [myCreatedQuizzes, setMyCreatedQuizzes] = useState({})
    const [quizzesIAttempted, setQuizzesIAttempted] = useState({})

    const getQuizzesICreated = () => {
        // get the quizzes that I created
        axios.get('https://letsquizbakcend.onrender.com/api/v1/quiz/getQuizzesICreated', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then((res) => {
            // console.log(res.data.data);
            setMyCreatedQuizzes(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getQuizzesIAttempted = () => {
        axios.get(`https://letsquizbakcend.onrender.com/api/v1/result/getQuizzesIAttempted`, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            setQuizzesIAttempted(response.data.data)
            // console.log(response.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleDeleteQuiz = (e) => {
        const quizCode = e.target.parentElement.parentElement.id
        axios.delete(`https://letsquizbakcend.onrender.com/api/v1/quiz/deleteQuiz/${quizCode}`, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        getQuizzesICreated()
        getQuizzesIAttempted()
    }, [])


    return (
        <div className='bg-[#36454F] w-full h-dvh '>
            <Dashboard />
            <div className='w-full h-[88%] flex flex-col justify-start items-center pb-5 bg-[#36454F] ]'>
                <div className='w-11/12 flex flex-col flex-wrap gap-5 mt-5'>
                    <h2 className='text-2xl '>Quizzes I Created</h2>
                    <div className='w-11/12 px-5 py-7 flex overflow-x-scroll gap-5 mt-2 bg-black text-center'>
                        {myCreatedQuizzes.length > 0 ? myCreatedQuizzes.map((quiz, index) => {
                            return (
                                <div key={index} id={quiz.quizCode} className='min-w-[20rem] bg-cyan-300 p-5 rounded-md flex flex-col justify-center items-center gap-2'>
                                    <div className='w-full flex justify-between items-center '>
                                        <h2 className='text-2xl'>{index}</h2>
                                    </div>
                                    <h2 className='text-2xl'>{quiz.quizTitle}</h2>
                                    <p className='text-lg'>{quiz.quizDescription}</p>
                                    <Link to={`/leaderboard/${quiz.quizCode}`} className='w-1/2 bg-blue-500 text-white p-2 rounded-md'>Leaderboard</Link>
                                </div>
                            );
                        }) : <h2 className='text-2xl'>You have not created any quiz yet</h2>}
                    </div>
                </div>

                <div className='w-11/12 flex flex-col flex-wrap gap-5 mt-5'>
                    <h2 className='text-2xl'>Quizzes I Attempted</h2>
                    <div className='w-11/12 px-5 py-7 flex overflow-x-scroll gap-5 mt-2 bg-black text-center'>
                        {quizzesIAttempted.length > 0 ? quizzesIAttempted.map((quiz, index) => {
                            return (
                                <div key={index} id={index} className='min-w-[20rem] bg-cyan-300 p-5 rounded-md flex flex-col justify-center items-center gap-2'>
                                    <div className='w-full flex justify-between items-center '>
                                        <h2 className='text-2xl'>{index}</h2>
                                    </div>
                                    <h2 className='text-2xl'>{quiz.quizId.quizTitle}</h2>
                                    <p className='text-lg'>{quiz.quizDescription}</p>
                                    <Link to={`/result/${quiz.quizCode}`} className='w-1/2 bg-blue-500 text-white p-2 rounded-md'>Result</Link>
                                </div>
                            );
                        }) : <h2 className='text-2xl'>You have not attempted any quiz yet</h2>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizHistory