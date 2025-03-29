import React, { useEffect, useState } from 'react'
import "../App.css"
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

    const navigate = useNavigate()

  const [ email , setEmail ] = useState()
  const [ password , setPassword ] = useState()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setEmail("");
      setPassword("");
      const data = { email , password };
      const res = await axios.post("/api/login", data);
      const token = res.data.token;
      console.log("token",token);
      navigate("/users");
      localStorage.setItem("token", token);
      toast.success("Login Successful!", { position: "top-right", autoClose: 2000 }); 
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed", { position: "top-right", autoClose: 3000 });
    }
  }

  useEffect(()=>{
    const Auth_token = localStorage.getItem("token");
    console.log(Auth_token);
    if(Auth_token){
     navigate("/users");
    }
  },[])

  return (
    <>
    <div className="h-screen w-full py-[10vw] px-[5vw] md:flex md:flex-col md:items-center md:justify-center">
        <ToastContainer />
        <div className="md:border md:border-black md:rounded-2xl md:shadow-lg md:p-[3vw]">
        <div className="relative w-full mt-5">
          <fieldset className="border border-gray-300 rounded-md p-2 h-20 relative">
            <legend className="text-purple-600 font-semibold p-2">Email Address</legend>
            <input type="text" className="w-full h-10 ml-3 absolute top-[-15%] outline-none" value={email} onChange={(e)=>setEmail(e.target.value)} required={true} placeholder='Enter email Address' />
          </fieldset>
        </div>
        <div className="relative w-full mt-5">
          <fieldset className="border border-gray-300 rounded-md p-2 h-20 relative">
            <legend className="text-purple-600 font-semibold p-2">Password</legend>
            <input type="password" className="w-full h-10 ml-3 absolute top-[-15%] outline-none" value={password} onChange={(e)=>setPassword(e.target.value)} required={true} placeholder='Enter Password' />
          </fieldset>
        </div>
        <div className="h-12 w-full bg-[#6C25FF] text-white mt-6 rounded-md md:w-[40vw]">
            <button className='h-full w-full text-center font-bold hover:cursor-pointer text-xl' onClick={handleSubmit}>Login</button>
        </div>
        </div>
    </div>
    </>
  )
}

export default Login