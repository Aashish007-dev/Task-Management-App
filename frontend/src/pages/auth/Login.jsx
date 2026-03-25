import React, { useState } from "react"
import AuthLayout from "../../components/AuthLayout"
import {FaEyeSlash, FaPeopleGroup } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance"
import {useDispatch, useSelector} from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from "../../redux/slice/userSlice"



const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const {loading} = useSelector((state) => state.user);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }

    if(!password){
      setError("Please fill all the fields");
      return;
    }

    setError(null);

    // login API call

    try {
      dispatch(signInStart())

      const response = await axiosInstance.post('/auth/login', {
        email, password
      })
      
      // console.log(response.data)

      if(response.data.role === 'admin'){
        dispatch(signInSuccess(response.data))
        navigate('/admin/dashboard');
      }else{
        dispatch(signInSuccess(response.data))
        navigate('/user/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        dispatch(signInFailure(error.response.data.message))
        setError(error.response.data.message);
      }else{
        dispatch(signInFailure("Something went wrong!"))
        setError("Something went wrong!");
      }
    }


  }

  return (
    <AuthLayout >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Gradient top border */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-400"></div>

          <div className="p-8">
            {/* Logo and title */}
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPeopleGroup className="text-4xl text-blue-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mt-4 uppercase">
                Project Flow
              </h1>

              <p className="text-gray-600 mt-1">
                Manage your projects efficiently
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>

                <input type="email" id="email"  value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="example@gmail.com" required/>

                
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                <input type={showPassword ? "text" : "password"} id="password"  value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12" placeholder="Enter password" required/>

                <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {loading ? (
                <span className="animate-pulse w-full text-center bg-blue-600 text-white py-3 px-4 rounded-lg">Loading...</span>
              ): (
                <div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">Login</button>
              </div>
              )}
            </form>

            <div className="mt-6 text-center text-sm ">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign Up
                </Link>
              </p>
            </div>


          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login