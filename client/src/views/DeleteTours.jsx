import React from 'react'
import { useEffect } from 'react';
import { setTitle } from '../utils';
function Tours() {
  useEffect(() => {
    setTitle("All Tour - TinyTours");
    },[]);

return 
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
  }

export default Tours
