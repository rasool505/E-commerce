import NavBar from "../../Components/Website/NavBar";
import Footer from "../../Components/Website/Footer";
import "./MainPage.css";
import { Navigate } from "react-router-dom";

export default function MainPage() {
  return (
    <Navigate to={'/home'}/>
  )
}
