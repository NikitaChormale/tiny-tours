import React from 'react'
import { useEffect } from 'react';
import { setTitle } from '../utils';
function Login() {

     useEffect(() => {
    setTitle("login Tour - TinyTours");
    },[]);
  return (
    <div>
      <h1>login</h1>
    </div>
  )
}

export default Login
