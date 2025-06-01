"use client";

import { useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// First, let's define proper TypeScript interfaces at the top of your file

interface Service {
  id: number;
  title: string;
  category: string;
  rating: number;
  price: string;
  image: string;
  featured: boolean;
  duration?: string;
  popular?: boolean;
}



interface ProfessionalCardProps {
  onBookNow: (service: Service) => void;
}
export default function MobileAppLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    address: '',
    notes: ''
  });

  // Expanded service data
  const services = [
    // HVAC Services
    {
      id: 1,
      title: "AC Installation",
      category: "hvac",
      rating: 4.8,
      price: "$199+",
      image: "https://images.unsplash.com/photo-1600566752229-250ed79470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "2-4 hours",
      popular: true
    },
    {
      id: 2,
      title: "AC Repair",
      category: "hvac",
      rating: 4.7,
      price: "$129+",
      image: "https://images.unsplash.com/photo-1558002038-1057f6a827a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "1-3 hours"
    },
    {
      id: 3,
      title: "AC Maintenance",
      category: "hvac",
      rating: 4.6,
      price: "$89+",
      image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: false,
      duration: "1-2 hours"
    },

    // Electrical Services
    {
      id: 4,
      title: "Electrical Wiring",
      category: "electrical",
      rating: 4.7,
      price: "$149+",
      image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "3-5 hours",
      popular: true
    },
    {
      id: 5,
      title: "Light Installation",
      category: "electrical",
      rating: 4.5,
      price: "$79+",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: false,
      duration: "1-2 hours"
    },
    {
      id: 6,
      title: "Circuit Repair",
      category: "electrical",
      rating: 4.6,
      price: "$119+",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "2-3 hours"
    },

    // Plumbing Services
    {
      id: 7,
      title: "Plumbing Repair",
      category: "plumbing",
      rating: 4.5,
      price: "$99+",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: false,
      duration: "1-3 hours"
    },
    {
      id: 8,
      title: "Pipe Installation",
      category: "plumbing",
      rating: 4.4,
      price: "$159+",
      image: "https://images.unsplash.com/photo-1622485937980-221c88ac04f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "2-4 hours",
      popular: true
    },
    {
      id: 9,
      title: "Water Heater Repair",
      category: "plumbing",
      rating: 4.6,
      price: "$139+",
      image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "2-3 hours"
    },

    // Beauty Services
    {
      id: 10,
      title: "Hair Styling",
      category: "beauty",
      rating: 4.9,
      price: "$49+",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "1-2 hours",
      popular: true
    },
    {
      id: 11,
      title: "Makeup Artist",
      category: "beauty",
      rating: 4.8,
      price: "$69+",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "1-3 hours"
    },
    {
      id: 12,
      title: "Nail Technician",
      category: "beauty",
      rating: 4.7,
      price: "$39+",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: false,
      duration: "1 hour"
    },

    // Cleaning Services
    {
      id: 13,
      title: "Home Cleaning",
      category: "cleaning",
      rating: 4.6,
      price: "$79+",
      image: "https://images.unsplash.com/photo-1622485937980-221c88ac04f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: false,
      duration: "2-4 hours"
    },
    {
      id: 14,
      title: "Deep Cleaning",
      category: "cleaning",
      rating: 4.7,
      price: "$129+",
      image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "3-5 hours",
      popular: true
    },
    {
      id: 15,
      title: "Office Cleaning",
      category: "cleaning",
      rating: 4.5,
      price: "$149+",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: false,
      duration: "3-6 hours"
    },

    // Appliance Services
    {
      id: 16,
      title: "Refrigerator Repair",
      category: "appliance",
      rating: 4.4,
      price: "$129+",
      image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: false,
      duration: "2-3 hours"
    },
    {
      id: 17,
      title: "Washing Machine Repair",
      category: "appliance",
      rating: 4.5,
      price: "$119+",
      image: "https://images.unsplash.com/photo-1622485937980-221c88ac04f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: true,
      duration: "1-2 hours",
      popular: true
    },
    {
      id: 18,
      title: "Oven Repair",
      category: "appliance",
      rating: 4.3,
      price: "$109+",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      featured: false,
      duration: "1-3 hours"
    }
  ];

  // Categories for horizontal scrolling
  const categories = [
    { id: 'all', name: 'All', icon: '🌐', color: 'bg-purple-100 text-purple-800' },
    { id: 'hvac', name: 'AC Services', icon: '❄️', color: 'bg-blue-100 text-blue-800' },
    { id: 'electrical', name: 'Electrical', icon: '⚡', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'plumbing', name: 'Plumbing', icon: '🚿', color: 'bg-cyan-100 text-cyan-800' },
    { id: 'beauty', name: 'Beauty', icon: '💅', color: 'bg-pink-100 text-pink-800' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹', color: 'bg-green-100 text-green-800' },
    { id: 'appliance', name: 'Appliances', icon: '🔌', color: 'bg-orange-100 text-orange-800' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = services.filter(service => 
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredServices = services.filter(service => service.featured);
  const popularServices = services.filter(service => service.popular);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleBookNow = (Service:any) => {
    setSelectedService(Service);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e:any) => {
    e.preventDefault();
    // Here you would typically send the booking details to your backend
    alert(`Booking confirmed for  on ${bookingDetails.date} at ${bookingDetails.time}`);
    setShowBookingForm(false);
    setBookingDetails({
      date: '',
      time: '',
      address: '',
      notes: ''
    });
  };

  return (
    <div className="relative max-w-md mx-auto bg-gradient-to-b from-blue-50 to-white min-h-screen pb-20">
      {/* Header with search */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            ServicePro
          </h1>
          <div className="flex items-center space-x-3">
            <button className="p-1 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <button className="p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search for services..."
            className="w-full p-3 pl-10 rounded-lg bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className="w-5 h-5 absolute left-3 top-3.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      <main className="p-4">
        {/* Promo Banner Slider */}
        <div className="mb-6 rounded-xl overflow-hidden shadow-md">
          <Slider {...sliderSettings}>
            <div className="relative h-40">
              <img 
                src="https://images.unsplash.com/photo-1558002038-1057f6a827a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="AC Services"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-bold">Summer AC Special</h3>
                <p className="text-white text-sm">20% off on all AC services</p>
              </div>
            </div>
            <div className="relative h-40">
              <img 
                src="https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Electrical Services"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-bold">Electrical Safety Check</h3>
                <p className="text-white text-sm">Free inspection with any repair</p>
              </div>
            </div>
            <div className="relative h-40">
              <img 
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Beauty Services"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-bold">Beauty Package</h3>
                <p className="text-white text-sm">Hair + Makeup for $99</p>
              </div>
            </div>
          </Slider>
        </div>

        {/* Categories horizontal scroll */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Categories</h2>
          <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center justify-center min-w-max px-4 py-3 rounded-xl ${selectedCategory === category.id ? `${category.color} shadow-md` : 'bg-white'} transition-all duration-200`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs mt-1 font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Popular Services</h2>
            <Link href="/services" className="text-blue-600 text-sm font-medium">See all</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {popularServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                variant="featured" 
                onBookNow={() => handleBookNow(service)}
              />
            ))}
          </div>
        </div>

        {/* Featured Services slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Featured Services</h2>
            <Link href="/services" className="text-blue-600 text-sm font-medium">See all</Link>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {featuredServices.map(service => (
              <div key={service.id} className="min-w-[200px]">
                <ServiceCard 
                  service={service} 
                  variant="featured" 
                  onBookNow={() => handleBookNow(service)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* All Services list */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">All Services</h2>
            <Link href="/services" className="text-blue-600 text-sm font-medium">See all</Link>
          </div>
          <div className="space-y-3">
            {filteredServices.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                variant="list" 
                onBookNow={() => handleBookNow(service)}
              />
            ))}
          </div>
        </div>

        {/* Popular Professionals */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Top Professionals</h2>
            <Link href="/professionals" className="text-blue-600 text-sm font-medium">See all</Link>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {[1, 2, 3, 4, 5].map(item => (
              <ProfessionalCard 
                key={item} 
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Booking Form Modal */}
      {showBookingForm && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Book </h3>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={bookingDetails.date}
                  onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Time</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={bookingDetails.time}
                  onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={bookingDetails.address}
                  onChange={(e) => setBookingDetails({...bookingDetails, address: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Special Instructions</label>
                <textarea
                  placeholder="Any special requirements?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  value={bookingDetails.notes}
                  onChange={(e) => setBookingDetails({...bookingDetails, notes: e.target.value})}
                />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Service Fee</p>
                  <p className="text-lg font-bold text-blue-600"></p>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`flex flex-col items-center p-2 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'} transition-colors duration-200`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'home' ? 2 : 1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('services')} 
            className={`flex flex-col items-center p-2 ${activeTab === 'services' ? 'text-blue-600' : 'text-gray-500'} transition-colors duration-200`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'services' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'services' ? 2 : 1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs mt-1">Services</span>
          </button>
          <button 
            onClick={() => setActiveTab('bookings')} 
            className={`flex flex-col items-center p-2 ${activeTab === 'bookings' ? 'text-blue-600' : 'text-gray-500'} transition-colors duration-200`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'bookings' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'bookings' ? 2 : 1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs mt-1">Bookings</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`flex flex-col items-center p-2 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'} transition-colors duration-200`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'profile' ? 2 : 1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

// Reusable Service Card Component
const ServiceCard = ({ service, variant, onBookNow }: { service: any, variant: 'featured' | 'list', onBookNow: () => void }) => {
  if (variant === 'featured') {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-32">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h3 className="text-white font-medium text-sm">{service.title}</h3>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white text-xs ml-1">{service.rating}</span>
              </div>
              <span className="text-white text-xs bg-blue-600 px-2 py-1 rounded-full">{service.duration}</span>
            </div>
          </div>
        </div>
        <div className="p-3 flex justify-between items-center">
          <p className="text-blue-600 font-semibold text-sm">{service.price}</p>
          <button 
            onClick={onBookNow}
            className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-200">
      <div className="relative h-16 w-16 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{service.title}</h3>
        <div className="flex items-center mt-1">
          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gray-600 text-xs ml-1">{service.rating}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-600 text-xs truncate">{service.category}</span>
        </div>
      </div>
      <div className="ml-2 flex flex-col items-end">
        <p className="text-blue-600 font-semibold text-sm">{service.price}</p>
        <button 
          onClick={onBookNow}
          className="bg-blue-50 text-blue-600 text-xs font-medium px          mt-1 py-1 px-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
        >
          Book
        </button>
      </div>
    </div>
  );
};

// Professional Card Component
const ProfessionalCard = ({ onBookNow }: ProfessionalCardProps) => {
  const names = ["Alex Johnson", "Maria Garcia", "James Smith", "Sarah Wilson", "David Brown"];
  const services = ["AC Technician", "Electrician", "Plumber", "Beautician", "Cleaner"];
  const ratings = [4.8, 4.9, 4.7, 4.6, 4.5];
  const prices = ["$99/hr", "$89/hr", "$79/hr", "$59/hr", "$49/hr"];
  const images = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/22.jpg",
    "https://randomuser.me/api/portraits/women/63.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg"
  ];
  
  const randomIndex = Math.floor(Math.random() * 5);
  
 return (
    <div className="bg-white rounded-lg shadow-sm p-3 min-w-[140px] hover:shadow-md transition-shadow duration-200">
      {/* ... existing professional card JSX ... */}
      <button 
        onClick={() => onBookNow({
          id: randomIndex,
          title: services[randomIndex],
          category: '',
          rating: ratings[randomIndex],
          price: prices[randomIndex],
          image: images[randomIndex],
          featured: false
        })}
        className="bg-blue-50 text-blue-600 text-xs w-full py-1 rounded mt-2 hover:bg-blue-100 transition-colors duration-200"
      >
        Book Now
      </button>
    </div>
  );
};

// Add this CSS to your global styles for animations
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fade-in {
//   animation: fadeIn 0.3s ease-out forwards;
// }