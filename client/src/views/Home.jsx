import React from 'react'
import { useEffect } from 'react';
import { setTitle } from '../utils';
import Navbar from '../components/Navbar';
function Home() {
 
    useEffect(() => {
    setTitle ("Home Tour - TinyTours");
    },[]);

return (
<div>
  <Navbar/>
<h1>home</h1>
</div>
)
  }
export default Home;
