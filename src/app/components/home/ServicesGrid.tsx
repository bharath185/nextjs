"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const mainServices = [
  { 
    id: 1,
    name: "AC Repair", 
    icon: "❄️", 
    desc: "24/7 Cooling Solutions",
    rating:4.1,
    reviews:"70+",
    isPopular:true,
    subServices: [
      {
        id:1,
        title: "Split AC Repair",
        desc: "Expert repair for all split AC models",
        image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:2,
        title: "Gas Refilling",
        desc: "Professional gas refilling services",
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:3,
        title: "AC Maintenance",
        desc: "Regular maintenance packages",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },  {
        id:4,
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  },
  { 
    id: 2,
    name: "Electrical", 
    icon: "⚡", 
    desc: "Wiring & Maintenance",
    rating:4.3,
    reviews:"150+",
    isPopular:true,
    subServices: [
      {
        id:1,
        title: "Wiring Installation",
        desc: "Complete home/office wiring solutions",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:2,
        title: "Switchboard Repair",
        desc: "Faulty switchboard diagnostics and repair",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:3,
        title: "Lighting Solutions",
        desc: "Modern lighting installations",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },  {
        id:4,
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  },
  { 
    id: 3,
    name: "Plumbing", 
    icon: "🚿", 
    desc: "Leakage & Pipe Repair",
    rating:4.7,
    reviews:"80+",
    isPopular:false,
    subServices: [
      {
        id:1,
        title: "Pipe Repair",
        desc: "Fix leaks and broken pipes",
        image: "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:2,
        title: "Drain Cleaning",
        desc: "Clogged drain solutions",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:3,
        title: "Bathroom Fixtures",
        desc: "Installation and repair",
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
        {
            id:4,
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  },
  { 
    id: 4,
    name: "Appliance", 
    icon: "🔌", 
    desc: "Repair & Maintenance",
    rating:4.8,
    reviews:"100+",
    isPopular:true,
    subServices: [
      {
        id:1,
        title: "Refrigerator Repair",
        desc: "Cooling system maintenance",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:2,
        title: "Washing Machine",
        desc: "Motor and drum repairs",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:3,
        title: "Microwave Oven",
        desc: "Heating element replacement",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
        {
            id:4,
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  },
  { 
    id: 5,
    name: "Carpentry", 
    icon: "🪚", 
    desc: "Furniture & Fixtures",
    rating:3.8,
    reviews:"10+",
    isPopular:true,
    subServices: [
      {
        id:1,
        title: "Furniture Repair",
        desc: "Restoration and polishing",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:2,
        title: "Custom Woodwork",
        desc: "Tailored carpentry solutions",
        image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:3,
        title: "Door Installation",
        desc: "Precision fitting and alignment",
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },  {
        id:4,
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  },
  { 
    id: 6,
    name: "Painting", 
    icon: "🎨", 
    desc: "Interior & Exterior",
    rating:3.8,
    isPopular:false,   
    reviews:"120+",
    subServices: [
      {
        id:1,
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:2,
        title: "Waterproofing",
        desc: "Dampness protection",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
           id:3,
        title: "Texture Coating",
        desc: "Decorative wall finishes",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },  {
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  },
  { 
    id: 7,
    name: "Emergency", 
    icon: "🚨", 
    desc: "Instant Response",
    rating:2.8,
    reviews:"10+",
    isPopular:false,
    subServices: [
      {
        id:1,
        title: "24/7 Support",
        desc: "Round the clock service",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:2,
        title: "Quick Fix",
        desc: "Temporary solutions",
        image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:3,
        title: "Leak Control",
        desc: "Immediate water damage control",
        image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  },
  { 
    id: 8,
    name: "Installation", 
    icon: "🛠️", 
    desc: "Professional Setup",
    rating:4.8,
    reviews:"100+",
    isPopular:true,
    subServices: [
      {
        id:1,
        title: "AC Installation",
        desc: "Expert unit setup",
        image: "https://images.unsplash.com/photo-1600566752229-250ed79470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:2,
        title: "Appliance Setup",
        desc: "Safe installation",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:3,
        title: "Smart Home",
        desc: "Automation solutions",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },  {
        id:4,
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      
      {
        id:5,
        title: "Appliance Setup",
        desc: "Safe installation",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id:6,
        title: "Smart Home",
        desc: "Automation solutions",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },  {
        id:7,
        title: "Wall Painting",
        desc: "Premium finish painting",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  }
];
export function ServicesGrid() {
  const [activeService, setActiveService] = useState(mainServices[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = mainServices.findIndex(s => s.id === activeService.id);
      const nextIndex = (currentIndex + 1) % mainServices.length;
      setActiveService(mainServices[nextIndex]);
    }, 10000);
    return () => clearInterval(interval);
  }, [activeService.id]);



  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Comprehensive Services</h2>
      
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Left Column - Main Services (4 cards per row) */}
        <div className="lg:w-1/2">
          <div className="grid grid-cols-2 gap-4 h-full">
            {mainServices.map((service) => (
              <motion.div
                key={service.id} // Use service.id for a unique key
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: service.id * 0.1 }} // Adjust delay based on service.id
                className={`p-4 rounded-lg cursor-pointer transition-all h-full flex flex-col ${
                  activeService.id === service.id ? 'bg-blue-50 border-2 border-blue-300 shadow-md' : 'bg-white border hover:bg-gray-50'
                }`}
                onClick={() => setActiveService(service)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start">
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <div className="flex items-center bg-blue-100 px-2 py-1 rounded-full">
                    <FaStar className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-medium ml-1">
                      {service.rating?.toFixed(1) || '4.8'}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{service.desc}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {service.reviews?.toLocaleString() || '120+'} reviews
                  </span>
                  {service.isPopular && (
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Right Column - Sub Services */}
<div className="lg:w-1/2">
  <motion.div
    key={activeService.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
  >
    <div className="flex items-center mb-4">
      <div className="text-3xl mr-3 text-blue-500">{activeService.icon}</div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">{activeService.name}</h2>
        <p className="text-gray-500 text-sm">{activeService.desc}</p>
      </div>
    </div>
    
    <div className={`grid ${
      activeService.subServices?.length > 3 
        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
        : `grid-cols-${activeService.subServices?.length}`
    } gap-3`}>
      {activeService.subServices?.map((sub, i) => (
        <motion.div
          key={sub.id || i}
          className="border border-gray-200 rounded-lg overflow-hidden"
          whileHover={{ y: -3 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="h-32 overflow-hidden">
            <img 
              src={sub.image} 
              alt={sub.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          <div className="p-2">
            <h3 className="font-medium text-sm text-gray-800 line-clamp-1">{sub.title}</h3>
            <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded transition-colors">
              Book Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</div>
      </div>
    </div>
  );
};
