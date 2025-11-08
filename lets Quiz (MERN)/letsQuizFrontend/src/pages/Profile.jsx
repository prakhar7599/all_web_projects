import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../components/Dashboard.jsx'


const Profile = () => {

  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [password, setPassword] = useState('NoChange')
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const handleCancel = (e) => {
    navigate('/quizzesPage')
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put('https://letsquizbakcend.onrender.com/api/v1/users/updateUser', {
      fullname: fullname? fullname : user.fullname,
      username: username? username : user.username,
      email: email? email : user.email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then((res) => {
      console.log(res);
      if (res.status == 200 && res.statusText == "OK") {
        alert("Done!")
      }
    }).catch((err) => {
      console.log(err.response);
      if (err.response.status == 409 && err.response.statusText == 'Conflict') {
        alert("Some User already has this username/email, please try different one!")
      }
    })
  }

  const getUserDetails = (e) => {
    const userDetails = axios.get('https://letsquizbakcend.onrender.com/api/v1/users/getUserDetails', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    }).then((res) => {
      // console.log(user);
      setUser(res.data.data);

    }).catch((err) => {
      // console.log(err.response.status);
      console.log(err);
    })
  }

  getUserDetails()
  
  return (
    <div className='h-dvh bg-[#36454F]'>
      <Dashboard />
      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-screen-md mt-20'>
          <div className='bg-[#3d6681] shadow-md rounded-lg overflow-hidden'>
            <div className='p-8'>
              <h1 className='text-3xl font-bold text-center mb-6'>Profile</h1>

              <div className='flex items-center justify-center mb-8'>
                <img className='h-40 w-40 rounded-full border-4 border-black' src={`${user.avatar}`} alt="avatar of user" />
              </div>

              <form className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                  <label className='text-lg' htmlFor="fullname">Full Name:</label>
                  <input className='py-2 px-4 border-2 border-black rounded-lg flex-1' type="text" name="fullname" id="fullname" defaultValue={user.fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>

                <div className='flex items-center gap-4'>
                  <label className='text-lg' htmlFor="username">Username:</label>
                  <input className='py-2 px-4 border-2 border-black rounded-lg flex-1' type="username" name="username" id="username" defaultValue={user.username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='flex items-center gap-4'>
                  <label className='text-lg' htmlFor="email">Email:</label>
                  <input className='py-2 px-4 border-2 border-black rounded-lg flex-1' type="email" name="email" id="email" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='flex items-center gap-4'>
                  <label className='text-lg' htmlFor="password">New Password:</label>
                  <input className='py-2 px-4 border-2 border-black rounded-lg flex-1' type="password" name="password" id="password" defaultValue={"NoChange"} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='flex justify-center mt-6'>
                  <button type="button" className='bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg mr-4' onClick={handleCancel}>Cancel</button>
                  <button type="submit" className='bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg' onClick={handleUpdate}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile