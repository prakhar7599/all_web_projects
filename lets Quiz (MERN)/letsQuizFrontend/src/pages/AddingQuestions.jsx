import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddingQuestions = () => {

  const navigate = useNavigate()

  const handleAddQuestion = (e) => {
    const question = document.querySelector('input[type="text"]').value
    const options = document.querySelectorAll('.option')
    const optionsArray = []
    options.forEach(option => {
      const optionObj = {
        option: option.querySelector('input[type="text"]').value,
        isCorrect: option.querySelector('input[type="checkbox"]').checked
      }
      optionsArray.push(optionObj)
    })
    // console.log(question, optionsArray)

    const quizCode = Cookies.get('quizCode')

    axios.post('https://letsquizbakcend.onrender.com/api/v1/question/addQuestion', {
      quizCode: quizCode,
      question: question,
      options: optionsArray
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(res => {
      console.log(res.data)
      alert('Question has been added to quiz')
      location.reload()
    }).catch(err => {
      console.log(err)
      alert('Something has happend, please try again.')
    })

  }


  const handleCloneInputField = (e) => {
    const optionsContainer = document.querySelector('.Options-Container')
    const newOptionField = document.querySelector('.option').cloneNode(true)
    newOptionField.querySelector('input[type="checkbox"]').name = 'Option ' + (optionsContainer.children.length + 1)
    newOptionField.querySelector('input[type="checkbox"]').id = 'Option ' + (optionsContainer.children.length + 1)
    newOptionField.querySelector('input[type="checkbox"]').checked = false
    newOptionField.querySelector('input[type="text"]').value = ''
    newOptionField.querySelector('input[type="text"]').placeholder = 'Option ' + (optionsContainer.children.length + 1)
    optionsContainer.appendChild(newOptionField)
  }

  const handleDone = (e) => {
    alert("Questions has been added to the quiz!")
    navigate('/quizzesPage')
  }

  return (
    <div className='bg-[#36454F] w-full h-dvh'>
      <Dashboard />
      <div className='bg-gray-700 w-full h-[88%] flex flex-col justify-center items-center'>
        <div className='bg-gray-800 w-[40%] h-[70%] flex flex-col justify-center items-center rounded-lg'>
          <div className='text-3xl text-white font-bold'>Add Questions</div>
          <div className='text-1xl text-white font-bold mt-4'>Quiz Code: {Cookies.get('quizCode')}</div>

          <div className='w-full flex flex-col justify-center items-center mt-4'>
            <input type='text' placeholder='Question' className='w-[80%] h-10 rounded-lg bg-gray-800 text-white pl-2 border-b-4' />
            <div className='w-full Options-Container flex flex-col justify-center mt-4'>
              <div className='w-full option flex gap-5 justify-center items-center mt-5'>
                <input type='checkbox' name='Option 1' id='Option 1' className='w-5 h-5' />
                <input type='text' placeholder='Option 1' className='w-[84%] h-10 rounded-lg bg-gray-800 text-white pl-2 border-b-4' />
              </div>
            </div>
            <div className='w-full h-20 flex gap-3 items-center justify-center'>
              <button onClick={handleCloneInputField} className='w-[28%] bg-blue-500 text-white p-2 rounded-md mt-4'>Add Option</button>
              <button onClick={handleAddQuestion} className='w-[28%] bg-blue-500 text-white p-2 rounded-md mt-4'>Add this Question to Quiz</button>
              <button onClick={handleDone} className='w-[28%] bg-blue-500 text-white p-2 rounded-md mt-4'>Done adding questions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddingQuestions