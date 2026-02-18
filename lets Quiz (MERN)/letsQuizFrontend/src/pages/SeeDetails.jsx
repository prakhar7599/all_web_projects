import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SeeDetails = () => {

    const quizCode = useParams().quizCode
    const userId = useParams().userId
    const [result, setResult] = useState([])
    const [isResultFetched, setIsResultFetched] = useState(false)

    const getQuizResult = (quizCode) => {
        axios.get(`https://letsquizbakcend.onrender.com/api/v1/solution/getQuizSolutionsOfAStudent/${quizCode}/${userId}`, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        }).then((response) => {
            console.log(response.data.data);
            setResult(response.data.data)
            setIsResultFetched(true)
            // console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
      getQuizResult(quizCode)
    // console.log(QuizCode);
    }, [])
    

  return (
    <div className='w-full h-dvh'>
        <Dashboard/>
        <div className='w-full h-[88%] gap-1 flex justify-center items-center bg-blue-900'>
    <div className='w-[80%] h-[90%] bg-gray-800 flex flex-col gap-5 items-center overflow-auto py-10 rounded-lg shadow-lg'>
        {!isResultFetched ? (
            <h1 className='text-white'>Loading...</h1>
        ) : (
            result.map((element, index) => (
                <div key={index} className='w-[90%] min-h-[70%] bg-gray-700 flex gap-4 flex-col justify-start items-center p-10 rounded-lg shadow-md'>
                    <h1 className='text-2xl text-gray-200 font-bold'>Question: {element.questionId.question}</h1>
                    <div className='w-[80%] min-h-[80%] bg-gray-600 flex flex-wrap gap-10 justify-center items-center text-center py-5'>
                        {!isResultFetched ? (
                            <h1 className='text-gray-200'>Loading...</h1>
                        ) : (
                            element.options.map((ele, index) => (
                                <div key={index} className={`border-2 w-[40%] h-[40%] py-3 px-2 ${ele.isCorrect ? 'bg-green-600' : ele.isSelected ? 'bg-red-600' : 'bg-gray-500'} rounded-lg shadow-sm`}>
                                    {ele.option}
                                </div>
                            ))
                        )}
                    </div>
                    {
                        // console.log(element)
                        element.isCorrect ? (
                            <p className='text-green-400 font-bold'>Correct</p>
                        ) : element.options.some((ele) => ele.isSelected) ? (
                            <p className='text-red-400 font-bold'>Incorrect</p>
                        ) : (
                            <p className='text-yellow-400 font-bold'>Not Attempted</p>
                        )
                    }
                </div>
            ))
        )}
    </div>
</div>

    </div>
  )
}

export default SeeDetails