import React, {useState} from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  return (
    <nav className='py-3 px-8 font-bold flex items-center justify-between bg-cyan-400'>
      <ul>
        <h1 className='text-5xl'><Link to={`/`}>LetsQuiz</Link></h1>
      </ul>
      <div>
        <ul className='flex space-x-4'>
          <li><Link to={`/user/login`}>Login</Link></li>
          <li><Link to={`/user/register`}>Register</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar