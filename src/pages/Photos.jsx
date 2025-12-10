import React, { useEffect, useState } from "react";
import { uploadTripPhoto, getTripPhotos, deletePhoto } from "../api/photosAPI";
import { useSearchParams, Link } from "react-router-dom";

function Photos() {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("trip");

  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [msg, setMsg] = useState("");

  const loadPhotos = async () => {
    try {
      const res = await getTripPhotos(tripId);
      setPhotos(res);
    } catch (error) {
      console.log("Failed to load photos");
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const uploadPhoto = async (e) => {
    e.preventDefault();

    if (!file) {
      setMsg("Select a photo first");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("caption", caption);

    try {
      await uploadTripPhoto(tripId, formData);
      setMsg("Photo uploaded successfully!");
      setFile(null);
      setCaption("");
      loadPhotos();
    } catch (error) {
      setMsg("Failed to upload photo");
    }
  };

  const remove = async (photoId) => {
    if (!confirm("Delete this photo permanently?")) return;

    try {
      await deletePhoto(photoId);
      setMsg("Photo deleted!");
      loadPhotos();
    } catch (error) {
      setMsg("Failed to delete photo");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">

      <Link
        to={`/trips/${tripId}`}
        className="text-green-700 font-semibold hover:underline text-lg"
      >
        ← Back to Trip
      </Link>

      <h1 className="text-3xl font-bold text-green-700 mt-4 mb-6">
        Trip Photos
      </h1>

      {msg && <p className="text-green-600 mb-4">{msg}</p>}

      {/* Upload Box */}
      <form
        onSubmit={uploadPhoto}
        className="bg-white p-6 rounded shadow max-w-xl mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Upload Photo</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
        />

        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-3 focus:border-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700"
        >
          Upload
        </button>
      </form>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="bg-white p-3 rounded shadow flex flex-col"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-64 object-cover rounded"
            />

            <p className="mt-2 text-lg font-medium">{photo.caption}</p>

            <button
              onClick={() => remove(photo._id)}
              className="mt-3 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}

        {/* No photos */}
        {photos.length === 0 && (
          <p className="text-gray-600 text-lg">No photos uploaded yet.</p>
        )}
      </div>

    </div>
  );
}

export default Photos;
