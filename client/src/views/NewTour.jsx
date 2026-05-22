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
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
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

  const authenticator = async () => {
    const response = await fetch("http://localhost:8080/auth");
    const data = await response.json();
    return data;
  };

  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    try {
      const { signature, expire, token, publicKey } =
        await authenticator();

      const res = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,
        onProgress: (e) =>
          setProgress((e.loaded / e.total) * 100),
      });

      setNewTour((prev) => ({
        ...prev,
        photos: [...prev.photos, res.url],
      }));

      setProgress(0);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

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

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => (window.location.href = "/dashboard"), 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to add tour");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-2xl font-bold text-center mb-6">
            Add New Tour
          </h1>

          {/* Title */}
          <Input
            type="text"
            placeholder="Tour Title"
            value={newTour.title}
            onChange={(e) =>
              setNewTour({ ...newTour, title: e.target.value })
            }
          />

          {/* Description */}
          <div className="mt-3">
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

          {/* Cities */}
          <div className="mt-3">
            <Multiselect
  selectedItems={newTour.cities}
  placeholder="Add Cities"
  onAddItem={(val) =>
    setNewTour((prev) => ({
      ...prev,
      cities: [...prev.cities, val],
    }))
  }
  onRemoveItem={(val) =>
    setNewTour((prev) => ({
      ...prev,
      cities: prev.cities.filter(
        (c) => c !== val
      ),
    }))
  }
/>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3 mt-3">
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

          {/* Photos */}
          <div className="mt-5">
            <p className="text-sm font-medium mb-2">Photos</p>

            <div className="flex flex-wrap gap-2">
              {newTour.photos.map((photo, i) => (
                <PhotoViewer
                  key={i}
                  imgUrl={photo}
                  index={i}
                  showDelete
                  onDelete={(url) =>
                    setNewTour({
                      ...newTour,
                      photos: newTour.photos.filter(
                        (p) => p !== url
                      ),
                    })
                  }
                />
              ))}
            </div>

            {/* Upload Box */}
            <div className="mt-3 border-2 border-dashed rounded-lg p-4 text-center bg-gray-50">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                className="w-full"
              />

              {progress > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1">
                    Uploading {Math.round(progress)}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <Button title="Create Tour" onClick={addTour} />
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default NewTour;