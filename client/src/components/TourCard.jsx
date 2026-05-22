import React from "react";
import {
  Building2,
  CalendarDays,
  Pencil,
  User,
  Trash2,
} from "lucide-react";

import Avatar from "../components/Avatar";
import PhotoViewer from "./PhotoViewer";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function TourCard({
  _id,
  title,
  description,
  cities,
  photos,
  user,
  startDate,
  endDate,
}) {

  const { name, email } = user || {};
  const deleteTour = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this tour?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/tours/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userjwtToken")}`,
        },
      }
    );

    console.log(response.data);

    if (response.data.success) {

      toast.success(response.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else {

      toast.error(response.data.message);

    }

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to delete tour"
    );

  }

};

  return (

    <div
      className="
        relative
        bg-white
        rounded-3xl
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
        overflow-hidden
        border
        border-slate-200
      "
    >

      {/* Edit Button */}
      <Link to={`/tours/${_id}/edit-tour`}>

        <div
          className="
            absolute
            top-4
            right-4
            z-10
            bg-white
            p-2
            rounded-full
            shadow-md
            hover:bg-orange-500
            hover:text-white
            transition-all
            cursor-pointer
          "
        >
          <Pencil className="h-5 w-5" />
        </div>

      </Link>
      <div
  onClick={deleteTour}
  className='absolute top-16 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all cursor-pointer'
>
  <Trash2 className='h-5 w-5' />
</div>

      {/* Main Image */}
      {photos?.[0] && (

       <img
  src={photos[0]}
  alt={title}
  className="
    h-52
    w-full
    object-contain
    bg-slate-100
  "
/>

      )}

      {/* Content */}
      <div className="p-6">

        {/* Title */}
        <h2
          className="
            text-2xl
            font-bold
            text-slate-800
          "
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="
            text-slate-500
            mt-2
            text-sm
            leading-relaxed
            line-clamp-2
          "
        >
          {description}
        </p>

        {/* Cities */}
        <div className="mt-5">

          <div
            className="
              flex
              items-center
              gap-2
              mb-3
            "
          >
            <Building2
              className="
                text-orange-500
                h-5
                w-5
              "
            />

            <p className="font-semibold text-slate-700">
              Cities
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            {cities?.map((city) => (

              <span
                key={city}
                className="
                  bg-orange-100
                  text-orange-600
                  px-4
                  py-1
                  rounded-full
                  text-sm
                  font-medium
                "
              >
                {city}
              </span>

            ))}

          </div>

        </div>

        {/* Dates */}
        <div
          className="
            mt-6
            bg-slate-50
            rounded-2xl
            p-4
            flex
            flex-col
            gap-3
          "
        >

          <div className="flex items-center gap-2">

            <CalendarDays
              className="
                text-green-500
                h-5
                w-5
              "
            />

            <p className="text-sm text-slate-700">

              <span className="font-semibold">
                Start:
              </span>{" "}

              {new Date(startDate).toLocaleDateString()}
            </p>

          </div>

          <div className="flex items-center gap-2">

            <CalendarDays
              className="
                text-red-500
                h-5
                w-5
              "
            />

            <p className="text-sm text-slate-700">

              <span className="font-semibold">
                End:
              </span>{" "}

              {new Date(endDate).toLocaleDateString()}
            </p>

          </div>

        </div>

        {/* User */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >

          <div className="flex items-center gap-3">

            <Avatar
              name={name}
              size={"small"}
            />

            <div>

              <p
                className="
                  font-semibold
                  text-slate-800
                "
              >
                {name}
              </p>

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                {email}
              </p>

            </div>

          </div>

          <div
            className="
              bg-slate-100
              p-2
              rounded-full
            "
          >
            <User
              className="
                h-5
                w-5
                text-slate-600
              "
            />
          </div>

        </div>

        {/* Gallery */}
        {photos?.length > 1 && (

          <div className="mt-6">

            <p
              className="
                text-sm
                font-semibold
                text-slate-700
                mb-3
              "
            >
              Tour Gallery
            </p>

            <div
              className="
                flex
                gap-3
                overflow-x-auto
              "
            >

              {photos.map((photo, index) => (

                <PhotoViewer
                  key={index}
                  imgUrl={photo}
                  index={index}
                />

              ))}

            </div>

          </div>

        )}
      </div>

    </div>
  );
}
export default TourCard;