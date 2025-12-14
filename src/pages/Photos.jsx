import React, { useEffect, useState } from "react";
import {
  uploadPhoto,
  getUserPhotos,
  deletePhoto,
  getTripPhotos,
} from "../api/photosAPI";
import { getTrips } from "../api/tripAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Photos() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  const loadTrips = async () => {
    try {
      const res = await getTrips();
      setTrips(res.data);
    } catch (err) {
      toast.error("Failed to load trips");
    }
  };

  const loadPhotos = async () => {
    try {
      const res = await getUserPhotos();
      setPhotos(res.data);
    } catch (err) {
      toast.error("Failed to load photos");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedTrip) {
      newErrors.trip = "Please select a trip";
    }

    if (!file) {
      newErrors.file = "Please select an image file";
    } else {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/heif"];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!allowedTypes.includes(file.type.toLowerCase())) {
        newErrors.file = "Only JPG, PNG, HEIC, and HEIF formats are allowed";
      }

      if (file.size > maxSize) {
        newErrors.file = "File size must be less than 10MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrors({ ...errors, file: "" });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const upload = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before uploading");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const form = new FormData();
      form.append("photo", file);
      form.append("caption", caption);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await uploadPhoto(selectedTrip, form);

      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success("Photo uploaded successfully!");
      
      // Reset form
      setFile(null);
      setCaption("");
      setPreviewUrl(null);
      setErrors({});
      
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        loadPhotos();
      }, 1000);
    } catch (err) {
      setUploading(false);
      setUploadProgress(0);
      toast.error("Upload failed. Please try again.");
    }
  };

  const remove = async (id) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      try {
        await deletePhoto(id);
        toast.success("Photo deleted successfully!");
        loadPhotos();
      } catch (err) {
        toast.error("Delete failed. Please try again.");
      }
    }
  };

  const downloadPhoto = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename || "photo.jpg";
        link.click();
        toast.success("Download started!");
      })
      .catch(() => {
        toast.error("Download failed");
      });
  };

  useEffect(() => {
    loadTrips();
    loadPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <i className="bi bi-camera-fill mr-3"></i>
          My Travel Photos
        </h1>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <i className="bi bi-cloud-upload-fill mr-3 text-green-600"></i>
            Upload New Photo
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Form */}
            <div className="space-y-4">
              {/* Trip Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <i className="bi bi-geo-alt-fill mr-2 text-green-600"></i>
                  Select Trip
                </label>
                <select
                  className={`w-full border-2 ${errors.trip ? 'border-red-500' : 'border-gray-200'} p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-gradient-to-r from-white to-gray-50`}
                  value={selectedTrip}
                  onChange={(e) => {
                    setSelectedTrip(e.target.value);
                    setErrors({ ...errors, trip: "" });
                  }}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <option value="">Choose a trip...</option>
                  {trips.map((t) => (
                    <option value={t._id} key={t._id}>
                      {t.destination} ({t.startPlace})
                    </option>
                  ))}
                </select>
                {errors.trip && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <i className="bi bi-exclamation-circle-fill mr-1"></i>
                    {errors.trip}
                  </p>
                )}
              </div>

              {/* File Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <i className="bi bi-image-fill mr-2 text-green-600"></i>
                  Choose Image
                </label>
                <div className={`border-2 ${errors.file ? 'border-red-500' : 'border-dashed border-gray-300'} rounded-xl p-4 text-center hover:border-green-500 transition-all cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50`}>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/jpg,image/png,image/heic,image/heif"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <i className="bi bi-file-earmark-image text-4xl text-green-600 mb-2"></i>
                    <p className="text-gray-600 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {file ? file.name : "Click to select image"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, HEIC, HEIF (Max 10MB)</p>
                  </label>
                </div>
                {errors.file && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <i className="bi bi-exclamation-circle-fill mr-1"></i>
                    {errors.file}
                  </p>
                )}
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <i className="bi bi-chat-quote-fill mr-2 text-green-600"></i>
                  Caption (Optional)
                </label>
                <textarea
                  placeholder="Add a beautiful caption..."
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                  rows="3"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>

              {/* Upload Button & Progress */}
              <div>
                <button
                  onClick={upload}
                  disabled={uploading}
                  className={`w-full ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'} text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {uploading ? (
                    <>
                      <i className="bi bi-hourglass-split mr-2 animate-spin"></i>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-cloud-arrow-up-fill mr-2"></i>
                      Upload Photo
                    </>
                  )}
                </button>

                {uploading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span style={{ fontFamily: 'Poppins, sans-serif' }}>Uploading...</span>
                      <span style={{ fontFamily: 'Poppins, sans-serif' }}>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Preview */}
            <div className="flex items-center justify-center">
              {previewUrl ? (
                <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-3">
                    <p className="text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <i className="bi bi-eye-fill mr-2"></i>
                      Preview
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full min-h-[300px] rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center border-4 border-dashed border-green-300 transform rotate-3">
                  <div className="text-center">
                    <i className="bi bi-image text-6xl text-green-400 mb-3"></i>
                    <p className="text-gray-500 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Image preview will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <i className="bi bi-grid-3x3-gap-fill mr-3 text-green-600"></i>
            My Gallery ({photos.length})
          </h2>

          {photos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <i className="bi bi-images text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                No photos uploaded yet. Start capturing your memories!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((p) => (
                <div
                  key={p._id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.caption}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      onClick={() => setSelectedPhoto(p)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {p.caption || "No caption"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                    <p className="text-sm text-gray-700 mb-3 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <i className="bi bi-chat-left-text-fill mr-2 text-green-600"></i>
                      {p.caption || "No caption"}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedPhoto(p)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-md"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <i className="bi bi-eye-fill mr-1"></i>
                        View
                      </button>
                      <button
                        onClick={() => downloadPhoto(p.imageUrl, `photo-${p._id}.jpg`)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-md"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <i className="bi bi-download mr-1"></i>
                        Save
                      </button>
                      <button
                        onClick={() => remove(p._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-md"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors text-3xl"
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <p className="text-white text-lg font-medium mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedPhoto.caption || "No caption"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => downloadPhoto(selectedPhoto.imageUrl, `photo-${selectedPhoto._id}.jpg`)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <i className="bi bi-download mr-2"></i>
                  Download
                </button>
                <button
                  onClick={() => {
                    setSelectedPhoto(null);
                    remove(selectedPhoto._id);
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <i className="bi bi-trash-fill mr-2"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Photos;