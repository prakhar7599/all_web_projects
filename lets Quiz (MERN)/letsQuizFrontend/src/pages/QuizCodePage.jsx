import React, {useState} from 'react'
import Dashboard from '../components/Dashboard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const QuizCodePage = () => {

    const navigate = useNavigate()
    const [quizCode, setQuizCode] = useState('')
    const handleSubmit = () => {
        if(!quizCode) {
            alert('Please fill quiz code field properly!')
        } else{
            axios.get(`https://letsquizbakcend.onrender.com/api/v1/quiz/doesQuizExist/${quizCode}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(res => {
                // console.log(res.data)
                navigate(`/attemptQuiz/${quizCode}`)
            }).catch(err => {
                // console.log(err)
                alert('Quiz for this code does not exist!')
            })

            // navigate(`/attemptQuiz/${quizCode}`)
        }
    }

    return (
        <div className='w-full h-dvh'>
            <Dashboard />
            <div className='w-full h-[88%] flex flex-col gap-4 items-center justify-start bg-[#36454F] py-5'>
                <h1 className='text-3xl text-white font-bold'>Enter Quiz Code</h1>
                <input type='text' placeholder='Enter Quiz Code' className='w-1/3 h-10 px-3 rounded-md outline-none' value={quizCode} onChange={(e) => setQuizCode(e.target.value)} />
                <button className='w-1/3 h-10 bg-[#F9A826] text-white font-bold rounded-md' onClick={handleSubmit}>Submit</button>
                
            </div>
        </div>
    )
}

export default QuizCodePage