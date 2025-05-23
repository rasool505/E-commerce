import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Website/NavBar";
import Footer from "../../Components/Website/Footer";
import "./HomePage.css";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {

  useEffect(() => {
    gsap.to(".progress-line",{
      width: "100%",
      ease: "none",
      opacity: "100%",
      scrollTrigger:{
        trigger: "body",
        start: "top top",
        end: "100% 100%",
        scrub: true,
      },
    });
  }, []);
  


  return (
    <>
    <main className="d-flex justify-content-center align-items-center flex-column home-page">
    <div className="progress">
      <div className="progress-line"></div>
    </div>
      <NavBar/>
        <div className="content-dashboard w-100 min-vh-100 d-flex justify-content-center align-items-center flex-row">
        <Outlet/>
        </div>
      <Footer/>
    </main>
    </>
  )
}
