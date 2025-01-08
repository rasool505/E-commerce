import { useEffect } from "react";
import "./Loading.css";
import { useNavigate } from "react-router-dom";


export default function Loading() {

  const nav = useNavigate();

  // useEffect(()=>{
  //   setTimeout(function() {
  //   }, 10000);
  //   nav("/login", {replace: true});
  // },[])
 

  return (
    <div className="Loading">
    <div className="cube">
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
    </div>
    <p>Loading..</p>
    </div>
  )
}
