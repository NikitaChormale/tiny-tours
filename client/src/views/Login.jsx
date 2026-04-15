import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect,useState} from 'react';
import { setTitle } from './../utils';
import Input from "./../components/Input";
import Button from './../components/Button';



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
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

  } catch (error) {
    console.error(error);
    toast.error("Server error!");
  }
};
return (
  <div className="flex justify-center items-center h-screen">
<h1>Login</h1>
<div className='w-[300px] '>

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
</div>
<Toaster position="top-center" reverseOrder={false}/>
  </div>
)
  }

export default Login
