import React from 'react'
import { useEffect } from 'react';
import { setTitle } from '../utils';
function Tours() {
  useEffect(() => {
    setTitle("All Tour - TinyTours");
    },[]);

return <div>Home</div>
  }

export default Tours
