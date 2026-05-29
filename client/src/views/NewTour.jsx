import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { setTitle, getUserjwtToken } from "./../utils";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./../components/Navbar";
import Input from "../components/Input";
import Multiselect from "../components/MultiSelect";
import Button from "../components/Button";
import PhotoViewer from "./../components/PhotoViewer";

import {
  upload,
} from "@imagekit/react";

function NewTour() {

  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef();

  useEffect(() => {
    setTitle("Add Tour - TinyTours");
  }, []);

  // AUTH
  const authenticator = async () => {

    try {

      const response = await fetch("http://localhost:8080/auth");

      const data = await response.json();

      return data;

    } catch (error) {

      console.log(error);

      toast.error("Authentication Failed");

    }

  };

  // IMAGE UPLOAD
  const handleUpload = async () => {

    try {

      const file = fileInputRef.current.files[0];

      if (!file) {
        return;
      }

      const {
        signature,
        expire,
        token,
        publicKey,
      } = await authenticator();

      const res = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,

        onProgress: (e) => {
          setProgress((e.loaded / e.total) * 100);
        },
      });

      console.log(res.url);

      setNewTour((prev) => ({
        ...prev,
        photos: [...prev.photos, res.url],
      }));

      setProgress(0);

      fileInputRef.current.value = "";

      toast.success("Image Uploaded");

    } catch (error) {

      console.log(error);

      toast.error("Image Upload Failed");

    }

  };

  // ADD TOUR
  const addTour = async () => {

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/tours`,
        newTour,
        {
          headers: {
            Authorization: `Bearer ${getUserjwtToken()}`,
          },
        }
      );

      console.log(res.data);

      if (res.data.success) {

        toast.success(res.data.message);

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);

      } else {

        toast.error(res.data.message);

      }

    } catch (err) {

      console.log(err);

      toast.error("Failed to Add Tour");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">

      <Navbar />

      <div className="flex justify-center px-4 py-12">

        <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-orange-100 p-8">

          {/* HEADING */}
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Add New Tour ✈️
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Create your beautiful travel journey
          </p>

          {/* TITLE */}
          <div className="mt-8">

            <Input
              type="text"
              placeholder="Tour Title"
              value={newTour.title}
              onChange={(e) =>
                setNewTour({
                  ...newTour,
                  title: e.target.value,
                })
              }
            />

          </div>

          {/* DESCRIPTION */}
          <div className="mt-4">

            <Input
              type="text"
              placeholder="Description"
              value={newTour.description}
              onChange={(e) =>
                setNewTour({
                  ...newTour,
                  description: e.target.value,
                })
              }
            />

          </div>

          {/* CITIES */}
          <div className="mt-4">

            <Multiselect
              selectedItems={newTour.cities}
              placeholder="Add Cities"

              onAddItem={(val) => {

                setNewTour((prev) => ({
                  ...prev,
                  cities: [...prev.cities, val],
                }));

              }}

              onRemoveItem={(val) => {

                setNewTour((prev) => ({
                  ...prev,
                  cities: prev.cities.filter(
                    (city) => city !== val
                  ),
                }));

              }}
            />

          </div>

          {/* SHOW CITIES */}
          <div className="flex flex-wrap gap-2 mt-4">

            {newTour.cities.map((city, index) => (

              <div
                key={index}
                className="bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 px-4 py-2 rounded-2xl text-sm font-medium"
              >
                {city}
              </div>

            ))}

          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4 mt-5">

            <Input
              type="date"
              value={newTour.startDate}
              onChange={(e) =>
                setNewTour({
                  ...newTour,
                  startDate: e.target.value,
                })
              }
            />

            <Input
              type="date"
              value={newTour.endDate}
              onChange={(e) =>
                setNewTour({
                  ...newTour,
                  endDate: e.target.value,
                })
              }
            />

          </div>

          {/* PHOTOS */}
          <div className="mt-8">

            <p className="text-lg font-semibold text-gray-700 mb-3">
              Upload Photos
            </p>

            {/* PREVIEW */}
            <div className="flex flex-wrap gap-3">

              {newTour.photos.map((photo, i) => (

                <PhotoViewer
                  key={i}
                  imgUrl={photo}
                  index={i}
                  showDelete

                  onDelete={(url) => {

                    setNewTour({
                      ...newTour,
                      photos: newTour.photos.filter(
                        (p) => p !== url
                      ),
                    });

                  }}
                />

              ))}

            </div>

            {/* UPLOAD BOX */}
            <div className="mt-4 border-2 border-dashed border-pink-200 rounded-3xl p-6 text-center bg-gradient-to-r from-orange-50 to-pink-50">

              <input
                type="file"
                ref={fileInputRef}

                onChange={(e) => {

                  if (e.target.files.length > 0) {
                    handleUpload();
                  }

                }}

                className="w-full"
              />

              {/* PROGRESS */}
              {progress > 0 && (

                <div className="mt-4">

                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

                    <div
                      className="bg-gradient-to-r from-orange-400 to-pink-500 h-3 rounded-full"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Uploading {Math.round(progress)}%
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* BUTTON */}
          <div className="mt-8">

            <Button
              title="Create Tour"
              onClick={addTour}
            />

          </div>

        </div>

      </div>

      <Toaster position="top-center" />

    </div>

  );
}

export default NewTour;