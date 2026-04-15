import React from 'react'
import { useEffect } from 'react';
import { setTitle } from './../utils';

function NewTour() {
  useEffect(() => {
    setTitle("New Tour - TinyTours");
    },[]);

return <div>NewTour</div>

}

export default NewTour ;
