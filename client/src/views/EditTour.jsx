import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import PhotoViewer from './../components/PhotoViewer';
import {useParams} from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { setTitle } from './../utils';
import { getUserjwtToken } from './../utils';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './../components/Navbar';
import Input from '../components/Input';
import Multiselect from '../components/MultiSelect';
import Button from '../components/Button';

function EditTour() {
const {id}=useParams();

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("http://localhost:8080/auth");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });


      setExistingTour({
        ...ExistingTour, photos: [...ExistingTour.photos, uploadResponse.url],
      });

      setProgress(0);
      fileInput.value = "";
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };


  const [ExistingTour, setExistingTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const EditTour = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getUserjwtToken()}`,
        },
      });
    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  };
  console.log(getUserjwtToken());
  
 const loadExistingTour = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getUserjwtToken()}`,
        },
      }
    );

    console.log(response.data);

    if (response.data.success) {
      setExistingTour(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);

    toast.error("Failed to load tour");
  }
};
  useEffect(() => {
    setTitle("EditTour - TinyTours");
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Edit New Tour {id}</h1>

      <div className='w-80 block mx-auto mt-10'>

        <Input
          type="text"
          placeholder="Enter Title"
          value={ExistingTour.title}
          onChange={(e) => {
            setExistingTour({
              ...ExistingTour,
              title: e.target.value,
            });
          }}
        />

        <Input
          type="text"
          placeholder="Enter Description"
          value={ExistingTour.description}
          onChange={(e) => {
            setExistingTour({
              ...ExistingTour,
              description: e.target.value,
            });
          }}
        />

        <Multiselect
          selectedItems={ExistingTour.cities}
          placeholder={"Enter city"}
          onAddItem={(val) => {
            setExistingTour({
              ...ExistingTour,
              cities: [...ExistingTour.cities, val],
            });
          }}
          onRemoveItem={(val) => {
            setExistingTour({
              ...ExistingTour,
              cities: ExistingTour.cities.filter((city) => city !== val),
            });
          }}
        />

        <Input
          type="date"
          value={ExistingTour.startDate}
          onChange={(e) => {
            setExistingTour({
              ...ExistingTour,
              startDate: e.target.value,
            });
          }}
        />

        <Input
          type="date"
          value={ExistingTour.endDate}
          onChange={(e) => {
            setExistingTour({
              ...ExistingTour,
              endDate: e.target.value,
            });
          }}
        />
        <div className='flex gap-x-0 '>
          {ExistingTour.photos?.map((photo, index) => (
            <PhotoViewer
              key={index}
              imgUrl={photo}
              index={index}
              onDelete={(url) => {
                setExistingTour({
                  ...ExistingTour,
                  photos: ExistingTour.photos.filter((p) => p !== url),
                });
              }}
              showDelete
            />
          ))}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            console.log("file selected:");
            console.log(e.target.files);
            if (e.target.files.length > 0) {
              handleUpload();
            }
          }} />

        {progress > 0 ? `Uploading...${progress}` : null}



      </div>
      <div className='w-80 block mx-auto mt-10'>
        <Button title="Edit Tour" onClick={EditTour} />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
export default EditTour;