import React, { useEffect, useState } from "react";
import { getProfile } from "../api/authAPI";
import { Link, useNavigate } from "react-router-dom";
import BackGround from "../assets/DashboardBackground.jpg"

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (err) {
      console.log("Profile Error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }

    navigate("/");
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center" style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: `url(${BackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );

  return (
    <div 
      className="min-h-screen" 
      style={{
        fontFamily: "'Poppins', sans-serif",
        textDecoration: "none",
        backgroundImage: `url(${BackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay for better readability - REDUCED OPACITY */}
      <div className="min-h-screen" style={{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(8px)"
      }}>
        {/* Header with glass effect */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Welcome back, {user.name} 👋
                </h1>
                <p className="text-sm sm:text-base text-gray-700 mt-1 font-semibold">Ready to plan your next adventure?</p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 font-bold"
                style={{ textDecoration: "none" }}
              >
                <i className="bi bi-box-arrow-right text-lg"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {/* Plan a Trip Card */}
            <Link
              to="/plan"
              className="group relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-green-300 hover:-translate-y-2"
              style={{ textDecoration: "none" }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative circle */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-green-500/40">
                  <i className="bi bi-map-fill text-2xl sm:text-3xl text-white"></i>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
                  Plan a Trip
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-semibold">
                  Generate AI-powered trip plans tailored to your preferences
                </p>
                
                <div className="mt-4 sm:mt-6 flex items-center text-green-600 font-black text-sm sm:text-base group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Get Started</span>
                  <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                </div>
              </div>
            </Link>

            {/* My Trips Card */}
            <Link
              to="/trips"
              className="group relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-blue-300 hover:-translate-y-2"
              style={{ textDecoration: "none" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-blue-500/40">
                  <i className="bi bi-suitcase-fill text-2xl sm:text-3xl text-white"></i>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  My Trips
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-semibold">
                  View and manage your saved travel adventures
                </p>
                
                <div className="mt-4 sm:mt-6 flex items-center text-blue-600 font-black text-sm sm:text-base group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>View Trips</span>
                  <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                </div>
              </div>
            </Link>

            {/* Photos Card */}
            <Link
              to="/photos"
              className="group relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-purple-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-1"
              style={{ textDecoration: "none" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-fuchsia-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-fuchsia-400/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-purple-500/40">
                  <i className="bi bi-images text-2xl sm:text-3xl text-white"></i>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                  Photos
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-semibold">
                  Upload and explore your cherished travel memories
                </p>
                
                <div className="mt-4 sm:mt-6 flex items-center text-purple-600 font-black text-sm sm:text-base group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Browse Photos</span>
                  <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                </div>
              </div>
            </Link>
          </div>

          {/* Pro Tip Section */}
          <div className="relative bg-gradient-to-br from-amber-100 via-orange-100 to-amber-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden border-2 border-amber-300/50">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-br from-amber-400/40 to-orange-400/40 rounded-full blur-3xl"></div>
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-amber-500/40">
                  <span className="text-xl sm:text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-2">
                    Pro Travel Tip
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed font-semibold">
                    Use <span className="font-black text-amber-800 bg-amber-200 px-2 py-1 rounded-lg">JPG</span> images for destinations — smaller file size with high quality. 
                    Reserve <span className="font-black text-amber-800 bg-amber-200 px-2 py-1 rounded-lg">PNG</span> for icons or images requiring transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;