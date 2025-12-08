import React from 'react'
import './About.css'
import Background from '../assets/Background.jpg'
import Footer from './Footer'
function About() {
  return (
    <div className="">

      <div className="min-h-screen bg-white">

        {/* About Us Heading with Background Clipped Inside Text */}
        <div className="pt-20 pb-12 px-4">
          <h1
            className="text-center text-7xl sm:text-8xl md:text-9xl font-black uppercase tracking-wider bg-clip-text text-transparent"
            style={{
              backgroundImage: `url(${Background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            About Us
          </h1>
        </div>

        {/* Content Section - Green Text on White Background */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pb-20">

          <div className="space-y-6 text-green-600">

            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
              <span className="font-bold text-green-700">Trippy</span> is a smart travel–planning platform designed to make your journeys easier, smarter, and more enjoyable.
            </p>

            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
              With the power of <span className="font-bold text-green-700">Generative AI</span>, our system helps you create perfect trip plans based on your interests, budget, and destination. You can explore flight options, must-visit places, and personalized travel ideas — all in one place.
            </p>

            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
              We also provide a secure space to store your travel photos. Every image you upload is safely encrypted and kept in our protected database at no cost.
            </p>

            <div className="pt-4">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold text-green-700 mb-3">
                Our goal is simple:
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed font-bold text-green-800">
                Plan your trips effortlessly, explore the world with confidence, and keep your travel memories safe — for free.
              </p>
            </div>

          </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default About