"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileAppLayout from './MobileView';
import { HeroSection } from './HeroSection';

import { LoginPopup } from '../auth/LoginPage';
import Footer from './Footer';
import { ServicesGrid } from './ServicesGrid';

export default function ResponsiveHeader() {
  const [isMobile, setIsMobile] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [electricalDropdown, setElectricalDropdown] = useState(false);
  const [userLocation, setUserLocation] = useState('Loading location...');
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await reverseGeocode(latitude, longitude);
            },
            (error) => {
              console.error("Geolocation error:", error);
              setLocationError("Couldn't get precise location. Using approximate location.");
              fetchApproximateLocation();
            }
          );
        } else {
          setLocationError("Geolocation not supported. Using approximate location.");
          fetchApproximateLocation();
        }
      } catch (error) {
        console.error("Location error:", error);
        setUserLocation("Bangalore, IN"); // Default fallback
      }
    };

    getLocation();
  }, []);

const reverseGeocode = async (lat: number, lng: number) => {
  try {
    // IMPORTANT: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Get the full formatted address
      const fullAddress = data.results[0].formatted_address;
      
      // Extract components for more readable display if needed
      const addressComponents = data.results[0].address_components;
      const streetNumber = addressComponents.find((c: any) => c.types.includes('street_number'))?.long_name || '';
      const route = addressComponents.find((c: any) => c.types.includes('route'))?.long_name || '';
      const locality = addressComponents.find((c: any) => c.types.includes('locality'))?.long_name || '';
      const administrativeArea = addressComponents.find((c: any) => c.types.includes('administrative_area_level_1'))?.long_name || '';
      const country = addressComponents.find((c: any) => c.types.includes('country'))?.long_name || '';
      const postalCode = addressComponents.find((c: any) => c.types.includes('postal_code'))?.long_name || '';

      // Set the full address by default
     // setUserLocation(fullAddress);

      // Alternative: Create a more concise display address
      // const displayAddress = `${streetNumber} ${route}, ${locality}, ${administrativeArea}`;
      // setUserLocation(displayAddress);
      
    } else {
      throw new Error("No results from geocoding");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  //  / fetchApproximateLocation();
  }
};

  const fetchApproximateLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setUserLocation(`${data.city || data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`);
    } catch (error) {
      console.error("IP-based location error:", error);
    //  setUserLocation("Bengaluru, India"); // Final fallback
    }
  };

  // Services Dropdown Component
  const ServicesDropdown = () => (
    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 grid grid-cols-2 gap-4">
      <div className="col-span-2 mb-2">
        <h3 className="font-bold text-lg text-blue-600">HVAC Services</h3>
        <p className="text-sm text-gray-600">Professional solutions for all your AC needs</p>
      </div>
      
      <ServiceCard 
        href="/services/installation" 
        title="AC Installation" 
        description="Professional installation services"
        imgSrc="https://images.unsplash.com/photo-1600566752229-250ed79470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
      
      <ServiceCard 
        href="/services/repair" 
        title="AC Repair" 
        description="Fast and reliable repairs"
        imgSrc="https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
      
      <ServiceCard 
        href="/services/maintenance" 
        title="AC Maintenance" 
        description="Regular checkups for efficiency"
        imgSrc="https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
      
      <ServiceCard 
        href="/services/cleaning" 
        title="AC Cleaning" 
        description="Deep cleaning services"
        imgSrc="https://images.unsplash.com/photo-1627485937980-221c88ac04f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
    </div>
  );

  // Electrical Services Dropdown Component
  const ElectricalDropdown = () => (
    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 grid grid-cols-2 gap-4">
      <div className="col-span-2 mb-2">
        <h3 className="font-bold text-lg text-blue-600">Electrical Services</h3>
        <p className="text-sm text-gray-600">Certified electricians for all your needs</p>
      </div>
      
      <ServiceCard 
        href="/electrical/wiring" 
        title="House Wiring" 
        description="Complete wiring solutions"
        imgSrc="https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
      
      <ServiceCard 
        href="/electrical/panel" 
        title="Panel Upgrade" 
        description="Modern electrical panels"
        imgSrc="https://images.unsplash.com/photo-1581093450025-4c357cce1b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
      
      <ServiceCard 
        href="/electrical/lighting" 
        title="Lighting Installation" 
        description="Indoor/outdoor lighting"
        imgSrc="https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
      
      <ServiceCard 
        href="/electrical/generator" 
        title="Generator Setup" 
        description="Backup power solutions"
        imgSrc="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
      
      <ServiceCard 
        href="/electrical/inspection" 
        title="Electrical Inspection" 
        description="Safety compliance checks"
        imgSrc="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
      
      <ServiceCard 
        href="/electrical/smart-home" 
        title="Smart Home Setup" 
        description="Automation solutions"
        imgSrc="https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />
    </div>
  );

  // Reusable Service Card Component
  const ServiceCard = ({ href, title, description, imgSrc }: {
    href: string;
    title: string;
    description: string;
    imgSrc: string;
  }) => (
    <Link href={href} className="group">
      <div className="h-24 bg-blue-50 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
        <img 
          src={imgSrc} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </Link>
  );

  // Mobile menu items (expanded with more options)
  const MobileMenu = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link href="/" className="flex flex-col items-center">
          <HomeIcon />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center">
          <ServicesIcon />
          <span className="text-xs mt-1">Services</span>
        </Link>
        <Link href="/electrical" className="flex flex-col items-center">
          <LightningIcon />
          <span className="text-xs mt-1">Electrical</span>
        </Link>
        <Link href="/plumbing" className="flex flex-col items-center">
          <PlumbingIcon />
          <span className="text-xs mt-1">Plumbing</span>
        </Link>
        <Link href="/beauty" className="flex flex-col items-center">
          <BeautyIcon />
          <span className="text-xs mt-1">Beauty</span>
        </Link>
      </div>
    </nav>
  );

  // Desktop menu items
  const DesktopMenu = () => (
    <header className="hidden md:block bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Location */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <img 
                src="https://via.placeholder.com/40x40?text=AC" 
                alt="AC Repair Pro Logo" 
                className="h-10 w-10"
              />
              <span className="ml-2 text-xl font-bold text-blue-800">AC Repair Pro</span>
            </Link>
            
            <div className="flex items-center text-sm text-gray-600">
              <LocationIcon className="h-5 w-5 text-blue-600 mr-1" />
              <span title={locationError || 'Your current location'} className="truncate max-w-[180px]">
                {userLocation}
              </span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Services
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {servicesDropdown && <ServicesDropdown />}
            </div>
            
            <div 
              className="relative"
              onMouseEnter={() => setElectricalDropdown(true)}
              onMouseLeave={() => setElectricalDropdown(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Electrical
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {electricalDropdown && <ElectricalDropdown />}
            </div>
            
            <Link href="/plumbing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Plumbing</Link>
            <Link href="/beauty" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Beauty</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</Link>
          </nav>
          
          {/* Login and Book Now */}
          <div className="flex items-center space-x-4">
            <button   onClick={() => setShowLoginPopup(true)} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <UserIcon className="h-5 w-5 mr-1" />
              Login
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-md">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
 const [showLoginPopup, setShowLoginPopup] = useState(false);
return (
    <>
      {isMobile ? <MobileAppLayout /> : (
        <DesktopMenu />
      )}
      {!isMobile && (
        <>
          <ServicesGrid />
          
          <Footer/>
        </>
      )}
     <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </>
  );
}

// Icons
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ServicesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PlumbingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const BeautyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);