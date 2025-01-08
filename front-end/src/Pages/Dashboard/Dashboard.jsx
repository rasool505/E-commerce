import "./Dashboard.css";
import NavBar from "../../Components/Website/NavBar";
import Footer from "../../Components/Website/Footer";
import SideBar from "../../Components/Dashboard/SideBar";
import { Outlet } from "react-router-dom";


export default function Dashboard() {

  return ( <main className="conatiner-dashboard">
      <NavBar/>
        <div className="content-dashboard w-100 min-vh-100 d-flex justify-content-start align-items-center flex-row">
        <SideBar/>
        <Outlet/>
        </div>
    </main> )
}
