import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'


const Leaderboard = () => {

    const quizCode = useParams().quizCode
    const [isResultFetched, setIsResultFetched] = useState(false)
    const [leaderboard, setLeaderboard] = useState([])

    const fetchLeaderboard = (quizCode) => {
        axios.get(`https://letsquizbakcend.onrender.com/api/v1/result/fetchLeaderboard/${quizCode}`, {
            headers: {
                "Content-Type": "Application/json"
            }, withCredentials: true
        }).then((response) => {
            console.log(response);
            setLeaderboard(response.data.data)
            setIsResultFetched(true)
        }).catch((err) => {
            console.log(err);
        })
    }

    // const handleSeeDetails = (e) => {
    //     const userId = e.target.id
    //     // console.log("User ID: ", userId)
    //     // console.log("Quiz Code: ", quizCode);

    // }

    useEffect(() => {
        fetchLeaderboard(quizCode)
    }, [])


    return (
        <div className='w-full h-dvh'>
            <Dashboard />
            <div className='w-full h-[88%] flex flex-col justify-center items-center bg-gray-900'>
    <div className='w-[80%] h-[90%] bg-gray-800 flex flex-col gap-5 items-center overflow-y-scroll py-10 px-10'>
        <h1 className='text-5xl font-bold text-white mb-8'>Leaderboard</h1>

        {!isResultFetched ? (
            <h1 className='text-white'>Loading...</h1>
        ) : leaderboard.length === 0 ? (
            <h1 className='text-5xl text-white'>Nothing to show yet...</h1>
        ) : (
            <>
                <div className='w-full bg-gray-700 flex gap-4 justify-start items-center py-3 px-4 rounded-md'>
                    <div className='w-1/6 text-white text-lg font-bold'>Serial Number</div>
                    <div className='w-4/6 text-white text-lg font-bold'>Username</div>
                    <div className='w-1/6 text-white text-lg font-bold mr-28'>Score</div>
                    <div></div>
                </div>
                {leaderboard.map((element, index) => (
                    <div key={index} className='w-full bg-gray-700 flex gap-4 justify-start items-center py-3 px-4 rounded-md'>
                        <div className='w-1/6 text-white text-lg'>{index + 1}</div>
                        <div className='w-4/6 text-white text-lg'>{element.userId.username}</div>
                        <div className='w-1/6 text-white text-lg'>{element.score}</div>
                        <Link to={`/seeDetails/${quizCode}/${element.userId._id}`}>
                        <button className='bg-blue-500 text-white px-3 py-1 rounded-md'>See details</button>
                        </Link>
                    </div>
                ))}
            </>
        )}
    </div>
</div>


        </div>
    )
}

export default Leaderboard