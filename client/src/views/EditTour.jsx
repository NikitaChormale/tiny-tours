import React from 'react'
import { useEffect } from 'react';
import { setTitle } from '../utils';
import Navbar from '../components/Navbar';

function EditTour() {
useEffect(() => {
setTitle ("Edit Tour - TinyTours");
},[]);
return 
<div>
<Navbar/>
<h1>EditTour</h1>
</div>;
}

export default EditTour
