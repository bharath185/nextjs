"use client";


import Link from 'next/link';
import { FaTools, FaHome,  FaSnowflake, FaBolt, FaShieldAlt, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {

  const DesktopFooter = () => (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <FaSnowflake className="text-blue-400 mr-2" /> AC Repair Pro
            </h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner for all HVAC and electrical solutions since 2010. We provide premium services with certified professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center"><FaHome className="mr-2" /> Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center"><FaShieldAlt className="mr-2" /> About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors flex items-center"><FaTools className="mr-2" /> Services</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors flex items-center"><FaBolt className="mr-2" /> Pricing</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center"><FaPhoneAlt className="mr-2" /> Contact</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Service Areas</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400"><FaMapMarkerAlt className="mr-2 text-blue-400" /> Bangalore</li>
              <li className="flex items-center text-gray-400"><FaMapMarkerAlt className="mr-2 text-blue-400" /> Mumbai</li>
              <li className="flex items-center text-gray-400"><FaMapMarkerAlt className="mr-2 text-blue-400" /> Delhi</li>
              <li className="flex items-center text-gray-400"><FaMapMarkerAlt className="mr-2 text-blue-400" /> Hyderabad</li>
              <li className="flex items-center text-gray-400"><FaMapMarkerAlt className="mr-2 text-blue-400" /> Chennai</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Contact Us</h4>
            <address className="text-gray-400 not-italic space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-400" />
                <p>#24, Service Lane, Koramangala, Bangalore - 560034</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-3 text-blue-400" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-400" />
                <a href="mailto:info@acrepairpro.com" className="hover:text-white transition-colors">info@acrepairpro.com</a>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-3 text-blue-400" />
                <p>24/7 Emergency Services Available</p>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-800 py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 mb-6">Get updates on special offers and maintenance tips</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} AC Repair Pro. All Rights Reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-white text-sm transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <DesktopFooter />
    </>
  );
}

// Icons


// Sample data


