import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Footer Top Section */}
        <div className="footer-content">

          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-brand">Trippy</h3>
            <p className="footer-description">
              Your smart travel companion for unforgettable journeys around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li><i className="bi bi-envelope"></i> info@trippy.com</li>
              <li><i className="bi bi-telephone"></i> +1 234 567 8900</li>
              <li><i className="bi bi-geo-alt"></i> 123 Travel Street, City</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-icons">
              <a href="#" className="social-icon facebook" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon twitter" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-icon instagram" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="social-icon youtube" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <div className="footer-divider"></div>

        {/* Footer Bottom - Copyright */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Trippy. All Rights Reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer