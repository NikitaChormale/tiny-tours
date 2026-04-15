import React from 'react'
import { useEffect } from 'react';
import { setTitle } from '../utils';

function Home() {
 
    useEffect(() => {
    setTitle ("Home Tour - TinyTours");
    },[]);

return (
<div>
<h1>home</h1>
</div>
)
  }
export default Home;
