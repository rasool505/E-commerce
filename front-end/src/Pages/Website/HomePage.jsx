import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Website/NavBar";
import Footer from "../../Components/Website/Footer";
import "./HomePage.css";
import React from "react";


export default function HomePage() {

  return (
    <main className="d-flex justify-content-center align-items-center flex-column home-page">
      <NavBar/>
        <div className="content-dashboard w-100 min-vh-100 d-flex justify-content-center align-items-center flex-row">
        <Outlet/>
        </div>
      <Footer/>
    </main>
  )
}
