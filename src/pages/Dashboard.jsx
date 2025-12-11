import React, { useEffect, useState } from "react";
import { getProfile } from "../api/authAPI";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (err) {
      console.log("Profile Error:", err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-5">Welcome, {user.name} 👋</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <Link
          to="/plan"
          className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">Plan a Trip</h2>
          <p>Generate AI trip plan</p>
        </Link>

        <Link
          to="/trips"
          className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">My Trips</h2>
          <p>View all saved trips</p>
        </Link>

        <Link
          to="/photos"
          className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">Photos</h2>
          <p>View & upload travel photos</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
