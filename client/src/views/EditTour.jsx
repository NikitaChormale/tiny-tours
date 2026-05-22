import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Multiselect from "../components/MultiSelect";
import Button from "../components/Button";
import PhotoViewer from "../components/PhotoViewer";

import {
  getUserjwtToken,
  setTitle,
} from "../utils";

function EditTour() {

  const { id } = useParams();

  const fileInputRef = useRef();

  const [progress, setProgress] = useState(0);

  const [existingTour, setExistingTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  // ================= LOAD TOUR =================

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

  // ================= UPDATE TOUR =================

  const updateTour = async () => {

    try {

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,
        existingTour,
        {
          headers: {
            Authorization: `Bearer ${getUserjwtToken()}`,
          },
        }
      );

      if (response.data.success) {

        toast.success("Tour updated successfully");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update tour"
      );
    }
  };

  // ================= IMAGEKIT AUTH =================

  const authenticator = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth`
      );

      const data = await response.json();

      return data;

    } catch (error) {

      console.log(error);
      throw new Error("Authentication failed");
    }
  };

  // ================= IMAGE UPLOAD =================

  const handleUpload = async () => {

    const fileInput = fileInputRef.current;

    if (
      !fileInput ||
      !fileInput.files ||
      fileInput.files.length === 0
    ) {
      return;
    }

    const file = fileInput.files[0];

    try {

      const authParams = await authenticator();

      const {
        signature,
        expire,
        token,
        publicKey,
      } = authParams;

      const uploadResponse = await upload({

        file,
        fileName: file.name,

        signature,
        expire,
        token,
        publicKey,

        onProgress: (event) => {
          setProgress(
            Math.round(
              (event.loaded / event.total) * 100
            )
          );
        },
      });

      setExistingTour({
        ...existingTour,
        photos: [
          ...existingTour.photos,
          uploadResponse.url,
        ],
      });

      toast.success("Photo uploaded");

      setProgress(0);

      fileInput.value = "";

    } catch (error) {

      if (error instanceof ImageKitAbortError) {
        console.log(error.reason);

      } else if (
        error instanceof ImageKitInvalidRequestError
      ) {
        console.log(error.message);

      } else if (
        error instanceof ImageKitUploadNetworkError
      ) {
        console.log(error.message);

      } else if (
        error instanceof ImageKitServerError
      ) {
        console.log(error.message);

      } else {
        console.log(error);
      }

      toast.error("Image upload failed");
    }
  };

  useEffect(() => {

    setTitle("Edit Tour - TinyTours");

    loadExistingTour();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div
        className="
          max-w-3xl
          mx-auto
          px-4
          py-10
        "
      >

        {/* Card */}
        <div
          className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8
          "
        >

          {/* Header */}
          <div className="mb-8">

            <h1
              className="
                text-3xl
                font-bold
                text-slate-800
              "
            >
              Edit Tour
            </h1>

            <p className="text-slate-500 mt-2">
              Update your tour details and photos
            </p>

          </div>

          {/* Form */}
          <div className="space-y-5">

            <Input
              type="text"
              placeholder="Tour Title"
              value={existingTour.title}
              onChange={(e) => {
                setExistingTour({
                  ...existingTour,
                  title: e.target.value,
                });
              }}
            />

            <Input
              type="text"
              placeholder="Tour Description"
              value={existingTour.description}
              onChange={(e) => {
                setExistingTour({
                  ...existingTour,
                  description: e.target.value,
                });
              }}
            />

            <Multiselect
              selectedItems={existingTour.cities}
              placeholder="Enter Cities"
              onAddItem={(val) => {
                setExistingTour({
                  ...existingTour,
                  cities: [
                    ...existingTour.cities,
                    val,
                  ],
                });
              }}
              onRemoveItem={(val) => {
                setExistingTour({
                  ...existingTour,
                  cities:
                    existingTour.cities.filter(
                      (city) => city !== val
                    ),
                });
              }}
            />

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">

              <Input
                type="date"
                value={existingTour.startDate}
                onChange={(e) => {
                  setExistingTour({
                    ...existingTour,
                    startDate: e.target.value,
                  });
                }}
              />

              <Input
                type="date"
                value={existingTour.endDate}
                onChange={(e) => {
                  setExistingTour({
                    ...existingTour,
                    endDate: e.target.value,
                  });
                }}
              />

            </div>

            {/* Photos */}
            <div className="flex flex-wrap gap-3">

              {existingTour.photos?.map(
                (photo, index) => (

                  <PhotoViewer
                    key={index}
                    imgUrl={photo}
                    index={index}
                    showDelete
                    onDelete={(url) => {

                      setExistingTour({
                        ...existingTour,
                        photos:
                          existingTour.photos.filter(
                            (p) => p !== url
                          ),
                      });
                    }}
                  />
                )
              )}

            </div>

            {/* Upload */}
            <div>

              <input
                type="file"
                ref={fileInputRef}
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  p-3
                  cursor-pointer
                "
                onChange={(e) => {

                  if (e.target.files.length > 0) {
                    handleUpload();
                  }
                }}
              />

              {progress > 0 && (

                <div className="mt-3">

                  <div
                    className="
                      h-3
                      bg-slate-200
                      rounded-full
                    "
                  >
                    <div
                      className="
                        h-3
                        bg-orange-500
                        rounded-full
                      "
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="text-sm mt-1 text-slate-500">
                    Uploading... {progress}%
                  </p>

                </div>
              )}

            </div>

            {/* Button */}
            <div className="pt-4">

              <Button
                title="Update Tour"
                onClick={updateTour}
                fullWidth
              />

            </div>

          </div>

        </div>

      </div>

      <Toaster position="top-center" />

    </div>
  );
}

export default EditTour;