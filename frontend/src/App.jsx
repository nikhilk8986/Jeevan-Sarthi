import React, { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
 

  

  return (
    <>
      <NavigationBar/>
      <HeroSection/>
      {/* <Login/> */}
      <Footer/>
    </>
  );
}

export default App;
