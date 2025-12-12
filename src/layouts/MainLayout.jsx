
// import Home from "../pages/Home"
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout=({children})=>{
return(
     <div className="flex flex-col min-h-screen bg-lightgray">
      
      {/* Top Navbar */}
      <Navbar />
        
      {/* Page Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
)
}
export default MainLayout