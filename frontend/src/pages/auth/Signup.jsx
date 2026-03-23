import React, { useState } from "react"
import AuthLayout from "../../components/AuthLayout"
import {FaEyeSlash, FaPeopleGroup } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector"



const Signup = () => {
  

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [showAdminInviteToken, setShowAdminInviteToken] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!fullName){
      setError("Please enter your full name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }

    if(!password){
      setError("Please fill all the fields");
      return;
    }

    setError(null);

    // SignUp API call




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
                Join Project Flow
              </h1>

              <p className="text-gray-600 mt-1">
                Start managing your projects efficiently
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>

                <input type="text" id="fullName"  value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your name" required />
              </div>


              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>

                <input type="email" id="email"  value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="example@gmail.com" required />
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

                <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Admin Invite Token
                </label>
                <div className="relative">
                <input type={showAdminInviteToken ? "text" : "password"} id="adminInviteToken"  value={adminInviteToken} onChange={(e) => setAdminInviteToken(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12" placeholder="Enter admin invite token" required/>

                <button onClick={() => setShowAdminInviteToken(!showAdminInviteToken)} type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer">
                  {showAdminInviteToken ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">Sign Up</button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm ">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Login
                </Link>
              </p>
            </div>


          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Signup