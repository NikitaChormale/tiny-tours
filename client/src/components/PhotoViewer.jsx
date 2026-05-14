import React, { useState } from 'react'
import { Trash2 } from'lucide-react';

function PhotoPreview ({imgUrl,show,onClose}){
    if(!show) return null;
  
return (
    <div className='fixed top-0 left-0 w-full h-full flex
    item-centre justify-center py-10 bg-gray-900'>
        <span
        onClick={onClose} 
        className='text-white absolute top-5 right-5 text-3xl
         cursor-pointer'>
            X
        </span>
        <img
        src={imgUrl}
        alt="preview" 
        className='max-w-full max-h-full rounded-md'
        />

    </div>
);
 }

function PhotoViewer({imgUrl,index,onDelete,showDelete=false}) {
    const [ showPreview ,setShowPreview]=useState(false);
  return (
    <div className=' flex items-centre relative w-fit shadow-md rounded-md'>
    <img 
    key={index}
    src={imgUrl}
    alt={`Tour photo ${index + 1}`}
    className='w-24 h-auto mt-2 rounded-md object-cover
    mx-2 cursor-pointer'
     onClick={() =>  setShowPreview(true)} 
    />
    {showDelete ? (
  <Trash2
    className="absolute right-0 top-0 h-5 w-5 text-red-500 cursor-pointer"
    onClick={() => onDelete(imgUrl)}
  />
) : null}
    <PhotoPreview 
    imgUrl={imgUrl}
     show={showPreview}
      onClose={() => {
        setShowPreview(false)
      }}/>
    </div>
  );
}

export default PhotoViewer
