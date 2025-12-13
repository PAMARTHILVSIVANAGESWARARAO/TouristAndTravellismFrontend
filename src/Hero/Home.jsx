import React from 'react'
import Background from '../assets/Background.jpg'
import Aeroplane from '../assets/Aeroplane.png'
import male from '../assets/male.jpg'
import male2 from '../assets/male2.jpg'
import { Link } from 'react-router-dom'
import About from './About.jsx'
import './Home.css'

function Home() {
  return (
    <div className="">

      <div className="relative w-screen h-screen overflow-hidden bg-black">

        {/* BG Blur */}
        <div
          className="absolute inset-0 blur-[35px] opacity-90"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 180, 0, 0.4), rgba(0, 120, 255, 0.4)),
            url(${Background})
          `,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* LOGO - Responsive positioning */}
        <div
          className="absolute top-4 left-4 sm:top-6 sm:left-8 z-30 text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-widest underline-double"
          style={{ fontFamily: '"Poppins", sans-serif', color: "black" }}
        >
          Trippy
        </div>

        {/* LEFT TEXT SECTION - Fully responsive */}
        <div className="absolute top-1/2 left-4 sm:left-8 md:left-12 lg:left-20 -translate-y-1/2 z-30 text-white max-w-[90%] sm:max-w-[520px] md:max-w-[480px] px-2 sm:px-0">

          <h3 className="text-base sm:text-lg md:text-xl font-light opacity-80">It's</h3>

          <h1 className="leading-[50px] sm:leading-[70px] md:leading-[90px] text-[50px] sm:text-[70px] md:text-[50px] font-extrabold" style={{ fontFamily: '"Alfa Slab One", serif', letterSpacing: "2px" }}>
            Time To
            <br />
            <span className="text-[70px] sm:text-[100px] md:text-[120px] block mt-[-5px] md:mt-[-10px]" style={{
              fontFamily: '"Mrs Saint Delafield", cursive',
              fontWeight: 'bolder',
              letterSpacing: '0px',
              marginTop: "10px"
            }}>Travel</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-2" style={{
            fontFamily: '"Ballet", cursive',
            letterSpacing: '2px',      // adjust as you like
            wordSpacing: '3px',
            color: "white",
            fontWeight: "bolder"

          }}>
            Explore The <span className="text-yellow-300" style={{
              fontFamily: '"Ballet", cursive',
              letterSpacing: '2px',      // adjust as you like
              wordSpacing: '3px',

              fontWeight: "bolder"

            }}>World With Us!</span>
          </h2>

          <p className="text-xs sm:text-sm mt-3 md:mt-4 opacity-90"
          >
            Traveling — it leaves you speechless, then turns you into a storyteller.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-5 md:mt-6">

            {/* LOGIN BUTTON */}
            <Link
              to="/login"
              className="
              fill1
              w-full sm:w-[180px] md:w-[200px]
              h-[45px]
              flex items-center justify-center
              font-bold
              uppercase text-sm tracking-[2px]
              text-white
              bg-green-500
              border-2 border-green-500
              rounded
              relative overflow-hidden
              z-[1]
              transition-all duration-[80ms] ease-in
            "
            style={{textDecoration:"none"}}
            >
              <span className="relative z-10" >Login</span>
            </Link>

            {/* JOIN NOW BUTTON */}
            <Link
              to="/register"
              className="
              fill
              w-full sm:w-[180px] md:w-[200px]
              h-[45px]
              flex items-center justify-center
              font-bold
              uppercase text-sm tracking-[2px]
              text-green-600
              bg-white
              border-2 border-green-500
              rounded
              relative overflow-hidden
              z-[1]
              transition-all duration-[80ms] ease-in
            "
             style={{textDecoration:"none" , color:"#00C951"}}>
              <span className="relative z-10">Join Now</span>
            </Link>

          </div>

        </div>

        {/* RIGHT SIDE IMAGES - Better responsive behavior */}
        <div className="hidden lg:block">

          {/* Plane - Desktop only */}
          <img
            src={Aeroplane}
            className="absolute top-[20%] right-[15%] xl:w-[500px] lg:w-[380px] drop-shadow-2xl z-30"
            alt=""
          />

          {/* Naruto */}
          <img
            src={male}
            className="absolute top-[45%] right-[40%] xl:w-52 lg:w-44 rotate-[-6deg] shadow-2xl border-4 border-white floating-fast"
            alt=""
          />

          {/* Gojo */}
          <img
            src={male2}
            className="absolute bottom-[10%] right-[10%] xl:w-52 lg:w-44 rotate-[8deg] shadow-2xl border-4 border-white floating-medium"
            alt=""
          />
        </div>

        {/* TABLET VERSION - Show fewer decorative images */}
        <div className="hidden md:block lg:hidden">

          {/* Plane - Smaller and repositioned for tablet */}
          <img
            src={Aeroplane}
            className="absolute top-[25%] right-[5%] w-[280px] drop-shadow-2xl z-30 opacity-70"
            alt=""
          />

          {/* Just one floating image for tablet */}
          <img
            src={male2}
            className="absolute bottom-[12%] right-[8%] w-36 rotate-[8deg] shadow-2xl border-4 border-white floating-medium"
            alt=""
          />
        </div>

      </div>
      <About />

    </div>
  )
}

export default Home