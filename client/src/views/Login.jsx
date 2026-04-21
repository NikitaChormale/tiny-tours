import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect,useState} from 'react';
import { setTitle } from './../utils';
import Input from "./../components/Input";
import Button from './../components/Button';
import {Link} from "react-router";
import Navbar from "../components/Navbar";



function Login() {

  const  [CheskUser,setCheckUser] =useState({
    email:"",
    password:"",
  });

   useEffect(() => {
    setTitle (" LoginTour - TinyTours");
    },[]);


const CheckLoginUsers = async () => {
  try {
    const response = await axios.post("http://localhost:8080/login", CheskUser);

    console.log(response.data);

    if (response.data.success) {
      toast.success(response.data.message,{id:"loginsuccess"});
      setCheckUser({
        email:"",
        password:"",
      });

      const {jwtToken,data}= response.data;

      localStorage.setItem("userjwtToken",jwtToken);
      localStorage.setItem("userData",JSON.stringify(data));

      setTimeout(() =>{
        window.location.href ="/dashboad";
      },1500)
      
    } else {
      toast.error(response.data.message,{id:"loginError"});
    }

  } catch (error) {
    console.error(error);
    toast.error("Server error!");
  }
};
return (
   <div >
    <Navbar/>
    
   
<h1>Login</h1>
    
    <div className='flex justify-centre items-center w[300px]'>
<Input
type='email'
placeholder='Email'
value={CheskUser.email}
onChange={(e) =>
  {setCheckUser({...CheskUser,email:e.target.value});
}} 
/>
<Input
type='password'
placeholder='Password'
value={CheskUser.password}
onChange={(e) =>
  {setCheckUser({...CheskUser,password:e.target.value});
}} 
/>
<Button title="Login" onClick={CheckLoginUsers}/>

<Link to ="/signup"  className="mt-2 block text-blue-500">
Don't have an account? Signup
</Link>
</div>
<Toaster position="top-center" reverseOrder={false}/>
  </div>
)
  }

export default Login
