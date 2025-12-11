import React, { useEffect, useState } from "react";
import {
  uploadPhoto,
  getUserPhotos,
  deletePhoto,
  getTripPhotos,
} from "../api/photosAPI";
import { getTrips } from "../api/tripAPI";

function Photos() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [photos, setPhotos] = useState([]);
  const [msg, setMsg] = useState("");

  const loadTrips = async () => {
    try {
      const res = await getTrips();
      setTrips(res.data);
    } catch (err) {}
  };

  const loadPhotos = async () => {
    try {
      const res = await getUserPhotos();
      setPhotos(res.data);
    } catch (err) {}
  };

  const upload = async () => {
    if (!selectedTrip || !file) {
      setMsg("Please select a trip and choose a file");
      return;
    }

    try {
      const form = new FormData();
      form.append("photo", file);
      form.append("caption", caption);

      await uploadPhoto(selectedTrip, form);

      setMsg("Photo uploaded");
      loadPhotos();
    } catch (err) {
      setMsg("Upload failed");
    }
  };

  const remove = async (id) => {
    try {
      await deletePhoto(id);
      setMsg("Photo deleted");
      loadPhotos();
    } catch (err) {
      setMsg("Delete failed");
    }
  };

  useEffect(() => {
    loadTrips();
    loadPhotos();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-4">Photos</h1>

      {msg && <p className="text-red-600 mb-3 font-semibold">{msg}</p>}

      {/* Upload Section */}
      <div className="bg-white p-5 rounded shadow mb-8">

        <h2 className="text-xl font-semibold mb-3">Upload Photo</h2>

        <select
          className="border p-2 rounded w-full mb-3"
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
        >
          <option value="">Select Trip</option>
          {trips.map((t) => (
            <option value={t._id} key={t._id}>
              {t.destination} ({t.startPlace})
            </option>
          ))}
        </select>

        <input
          type="file"
          className="w-full mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Caption (optional)"
          className="border p-2 rounded w-full mb-3"
          onChange={(e) => setCaption(e.target.value)}
        />

        <button
          onClick={upload}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Upload
        </button>
      </div>

      {/* Display Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {photos.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded shadow overflow-hidden pb-3"
          >
            <img src={p.imageUrl} alt="" className="w-full h-48 object-cover" />

            <p className="p-2 text-sm">{p.caption}</p>

            <button
              onClick={() => remove(p._id)}
              className="bg-red-600 text-white px-4 py-1 rounded ml-2 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p className="text-gray-600 mt-6">No photos uploaded yet.</p>
      )}
    </div>
  );
}

export default Photos;
