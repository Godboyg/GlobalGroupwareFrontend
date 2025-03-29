import React, { useEffect, useState } from 'react'
import Card from './UserCard'
import UserCard from './UserCard'
import axios from 'axios'
import "../App.css"
import { useNavigate } from 'react-router-dom'

function Users() {

  const navigate = useNavigate()

  const [ users , setUsers ] = useState([])
  const [ isVisible , setIsVisible ] = useState(false)
  const [ first_name , setFirst ] = useState()
  const [ id , setId ] = useState()
  const [ last_name , setLast ] = useState()
  const [ email , setEmail ] = useState()
  const [ authenticated , setAuthenticated ] = useState(false)

  const data = { first_name , last_name , email};

  const Allusers = async() => {
    const response = await axios.get("api/users?page1");
    console.log(response.data.data)
    setUsers(response.data.data);
  }

  const handleDelete = async(id) => {
    setUsers(users.filter((user) => user.id !== id));
    const res = await axios.delete(`/api/users/${id}`)
    console.log(res);
  }

  useEffect(()=>{
    Allusers();
  },[])

  const savedToken = localStorage.getItem("token");

  useEffect(()=>{
    if (savedToken) {
      console.log("User is authenticated");
      setAuthenticated(true)
    } else {
      console.log("User is not authenticated");
    }
  },[])

  const handleClick = (id) => {
    setId(id);
    setIsVisible(!isVisible);
  }
  const user = users.find((user) => user.id === id)
  useEffect(()=>{
    if(user){
      setFirst(user.first_name);
      setLast(user.last_name);
      setEmail(user.email);
    }
  },[user]);

  const handleFalse = () => {
    setIsVisible(!isVisible)
  }

  const handleEdit = async()=>{
    setIsVisible(false)
    const res = await axios.put(`/api/users/${id}` , data);
    console.log("edited",res);
    const response = await axios.get("api/users?page1");
    setUsers(response.data.data);
    console.log("new res",res);
  }

  return (
    <>
    <div className="relative bg-cyan-300 h-screen">
    {authenticated ? (
      <>
      <div className="p-10">
      { users && users.length > 0 ? (
        users?.map((user)=>(
          <UserCard
            id={user.id} 
            firstName={user.first_name} 
            lastName={user.last_name} 
            avatar={user.avatar} 
            onDelete = {()=>handleDelete(user.id)} 
            SetTrue = {()=>handleClick(user.id)}
         />
        ))
      ) : (
        <p>Loading</p>
      )}
      </div>
      <div className={`h-screen w-full flex justify-center items-center absolute top-0 ${isVisible ? "scale-100 backdrop-blur-md" : "opacity-0 scale-1"}`}>
      { user ? (
        <>
         <div className={`absolute bg-black text-white p-10 rounded-lg transition-all max-sm:w-96 transform delay-500 ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
        <div className="flex items-center justify-center"><p className='text-2xl hover:cursor-pointer w-10' onClick={handleFalse}>❌</p></div>
        <fieldset className="border border-cyan-500 p-2 rounded-lg">
          <legend className="text-cyan-500 font-bold px-4">First Name</legend>
          <input type="text" value={first_name} onChange={(e)=>setFirst(e.target.value)} className="w-full outline-none ml-3 p-1"/>
        </fieldset>
        <fieldset className="border border-cyan-500 p-2 rounded-lg mt-5">
          <legend className="font-bold px-4 text-cyan-500">Last Name</legend>
          <input type="text" value={last_name} onChange={(e)=>setLast(e.target.value)} className="w-full outline-none ml-3 p-1"/>
        </fieldset>
        <fieldset className="border border-cyan-500 p-2 rounded-lg mt-5">
          <legend className="px-4 font-bold text-cyan-500">Email</legend>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full outline-none ml-3 p-1"/>
        </fieldset>
        <div className="h-12 w-full bg-[#6C25FF] text-white mt-6 rounded-lg md:w-[40vw]">
            <button className='h-full w-full text-center font-bold hover:cursor-pointer text-xl' onClick={handleEdit}>Edit</button>
        </div>
      </div>
        </>
      ):(
        <p className={`${isVisible ? "block" : "hidden"}`}>User not found</p>
      )}
      </div>
    </>
    ) : (
      <p>UnAutheticated</p>
    )}
    </div>
    </>
  )
}

export default Users