import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect,useState} from 'react';
import { setTitle } from './../utils';
import Input from "./../components/Input";
import Button from './../components/Button';



function Signup() {

  const  [newUser,setNewUser] =useState({
    name: "",
    email:"",
    mobile: "",
    city: "",
    country:"",
    password:"",
  });

   useEffect(() => {
    setTitle ("signup Tour - TinyTours");
    },[]);


const createUsers = async () => {
  try {
    const response = await axios.post("http://localhost:8080/signup", newUser);

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
<h1>Signup</h1>
<div className='w-[300px] '>
<Input
type='text'
placeholder='Name'
value={newUser.name}
onChange={(e) =>{setNewUser({...newUser,name:e.target.value});
}} 
/>
<Input
type='email'
placeholder='Email'
value={newUser.email}
onChange={(e) =>{setNewUser({...newUser,email:e.target.value});
}} 
/>
<Input
type='text'
placeholder='Mobile'
value={newUser.mobile}
onChange={(e) =>{setNewUser({...newUser,mobile:e.target.value});
}} 
/>
<Input
type='text'
placeholder='City'
value={newUser.city}
onChange={(e) =>{setNewUser({...newUser,city:e.target.value});
}} 
/>
<Input
type='text'
placeholder='Country'
value={newUser.country}
onChange={(e) =>{setNewUser({...newUser,country:e.target.value});
}} 
/>
<Input
type='password'
placeholder='Password'
value={newUser.password}
onChange={(e) =>{setNewUser({...newUser,password:e.target.value});
}} 
/>
<Button title="Signup" onClick={createUsers}/>
</div>
<Toaster position="top-center" reverseOrder={false}/>
  </div>
)
  }

export default Signup
