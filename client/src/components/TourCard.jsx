import React from 'react';
import { Building2, CircleArrowRight, LandPlot } from "lucide-react";
import Avatar from '../components/Avatar';
import PhotoViewer from './PhotoViewer';


function TourCard({
  _id,
  title,
  description,
  cities,
  photos,
  user,
  startDate,
  endDate,
  createdAt,
  updatedAt, }) {

  const { name, email } = user;

  return (

    <div className='border border-gray-300 my-10 px-5 py-2 rounded-mb-4 shadow-mb'>
      <h2 className='text-lg'>{title}</h2>
      <p className='text-xs text-gray-500'>{description}</p>
      <p className='my-2'>
        <Building2 className='inline-block mr-1 ' />{""}
        {cities.map((city) => {
          return (
            <span key={city} className='mr-4 text-sm bg-gray-400 px-4 py-0.5 rounded-full'>
              {city}
            </span>
          )
        })}
      </p>
      <p>
        <CircleArrowRight className=' mx-2 h-6 w-6' />Starting From: {new Date(startDate).toLocaleDateString()}
        <LandPlot className='ml-4 me-2' /> Ended On: {new Date(endDate).toLocaleDateString()}
      </p>
      <div className='flex items-center'>
        <span className='mr-2'>
          Posted By :</span> {" "}
        <Avatar name={name} size={"small"} />
        <strong>{name}</strong> ({email})
      </div>

      <div className='flex'>
        {photos.map((photo, index) => (
          <PhotoViewer
            key={index}
            imgUrl={photo}
            index={index}
          />
        ))}

      </div>

    </div>

  );
}

export default TourCard
