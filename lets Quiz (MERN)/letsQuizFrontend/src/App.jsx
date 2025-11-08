import React from 'react'
import { Routes, Route, useParams} from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import QuizzesPage from './pages/QuizzesPage.jsx'
import Profile from './pages/Profile.jsx'
import CreateQuiz from './pages/CreateQuiz.jsx'
import AddingQuestions from './pages/AddingQuestions.jsx'
import AttemptQuiz from './pages/AttemptQuiz.jsx'
import QuizHistory from './pages/QuizHistory.jsx'
import QuizCodePage from './pages/QuizCodePage.jsx'
import Result from './pages/Result.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import SeeDetails from './pages/SeeDetails.jsx'

function App() {

  return (
    <Routes>
      <Route path='*' element={<h1>404 Not Found</h1>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/user/register' element={<Register/>}></Route>
      <Route path='/user/login' element={<Login/>}></Route>
      <Route path='/quizzesPage' element={<QuizzesPage/>}></Route>
      <Route path='/addingQuestions' element={<AddingQuestions/>}></Route>
      <Route path='/user/profile' element={<Profile/>}></Route>
      <Route path='/createQuiz' element={<CreateQuiz/>}></Route>
      <Route path='/attemptQuiz/:quizCode' element={<AttemptQuiz />}></Route>
      <Route path='/quizHistory' element={<QuizHistory/>}></Route>
      <Route path='/QuizCodePage' element={<QuizCodePage/>}></Route>
      <Route path='/result/:quizCode' element={<Result/>}></Route>
      <Route path='/leaderboard/:quizCode' element={<Leaderboard/>}></Route>
      <Route path='seeDetails/:quizCode/:userId' element={<SeeDetails/>}></Route>
    </Routes>
  )
}

export default App
