import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCpassword] = useState("")
  const navigate = useNavigate()

  const handleSignup = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post("http://localhost:8080/user/signup",{
        name : username,
        password : password
      })
      navigate("/")
    }catch(err){
      console.log("Login failed!!"+ err.response?.data || err.message);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg w-full max-w-sm space-y-6 p-8 rounded-lg">
          <h2 className="text-gray-900 text-center font-semibold text-2xl">SIGN UP</h2>
          <form action="" onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="username" className='block text-sm font-medium text-gray-900'>username:</label>
              <input 
                type="text" 
                name="username" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full mt-3 py-2 rounded-sm border border-indigo-700 px-4 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-200'
              />
            </div>
            <div>
              <label htmlFor="password" className='block text-sm font-medium text-gray-900'>password:</label>
              <input 
                type="text" 
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full mt-3 py-2 rounded-sm border border-indigo-700 px-4 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-200'
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-900'>confirm password:</label>
              <input 
                type="text" 
                name="cPassword" 
                id="cPassword" 
                value={cPassword}
                onChange={(e) => setCpassword(e.target.value)}
                className='w-full mt-3 py-2 rounded-sm border border-indigo-700 px-4 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-200'
              />
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="SIGN UP"
                disabled={!username || !password || !cPassword}
                className={`w-full px-4 py-2 mt-2 text-white rounded-md font-semibold 
                  ${((!username || !password || !cPassword || password !== cPassword))
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hxover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
              />
            </div>
            <div className="text-center text-sm text-gray-900">
              <h4>
                Do you already have an account? <Link to="/" className='font-semibold text-indigo-700 hover:underline hover:text-indigo-700'>login</Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
