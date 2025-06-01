"use client"; // ← Add this at the top

import ResponsiveHeader from "./components/home/ResponsiveHeader";



export default function Home() {
  return (
    <div className="min-h-screen">
     
    <ResponsiveHeader />
     {/* // <ServicesGrid /> */}
      {/* <HeroSection /> */}
      {/* <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex justify-center my-12"
      >
        <Button size="lg">Book a Service</Button>
      </motion.div> */}
    </div>
  );
}