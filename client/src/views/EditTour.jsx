import React from 'react'
import { useEffect } from 'react';
import { setTitle } from '../utils';

function EditTour() {
useEffect(() => {
setTitle ("Edit Tour - TinyTours");
},[]);
return <div>EditTour</div>;
}

export default EditTour
