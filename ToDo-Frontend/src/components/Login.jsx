import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    const loginHandler = async(e) => {
        e.preventDefault()
       try{
        const response = await axios.post("http://localhost:8080/user/login",{
            name : username,
            password: password
        },{
            withCredentials : true
        })
        navigate("/home")
       }catch(err){
        console.error('Login failed:', err.response?.data || err.message);
       }
       setUsername("")
       setPassword("")
    }

    return (
        <>
            <div className='flex items-center justify-center min-h-screen bg-gray-100'>
                <div className='w-full max-w-sm p-8 space-y-6 bg-white shadow-lg rounded-lg'>
                    <h1 className='text-2xl font-semibold text-center mb-6 text-gray-900'>LOGIN</h1>
                    <form action="" method="post" onSubmit={loginHandler} className='space-y-6'>
                        <div>
                            <div>
                                <label htmlFor="username" className='block text-sm font-medium text-gray-700'>username:</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='w-full px-4 py-2 mb-1 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500' 
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className='block text-sm font-medium text-gray-700'>password:</label>
                                <input type="password" name="password" id="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full px-4 py-2 mb-1 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500'
                                />
                            </div>
                            <div>
                                <input 
                                    type="submit" 
                                    value="LOGIN" 
                                    disabled = {!username || !password}
                                    className={`w-full px-4 py-2 mt-2 text-white rounded-md font-semibold 
                                    ${!username || !password 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`} 
                                />
                            </div>
                            <div className='text-center text-sm text-gray-600 pt-4'>
                                <h4>
                                    Do you not have an Account? <Link to = "/signup" className='text-indigo-600 hover:text-indigo-700'>sign up</Link>
                                </h4>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login