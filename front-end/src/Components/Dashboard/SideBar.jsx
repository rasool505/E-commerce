import "./SideBar.css";
import {links} from './SideLink';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleUp, faAnglesLeft, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState } from "react";
import React from "react";
import Cookie from 'cookie-universal';
import { Axios } from "../../Api/AxiosCreate";
import { userURL } from "../../Api/Api";
import { Button } from "react-bootstrap";



export default function SideBar() {
  const cookie = Cookie();
  const token = cookie.get('accessToken');
  const [user, setUser] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    Axios.get(userURL,{
      headers:{
        Authorization: "Bearer "+token,
      }
    })
    .then((data)=>setUser(data.data))
    .catch((error)=>console.log(error))
  }, []);

  

  function handleSideBar(val){
      setOpen(prev=> !prev)

      const selectedItems = document.querySelectorAll(".select");
      selectedItems.forEach(item => {
          item.classList.remove("select");
          item.children[2].classList.remove("rotate");
          item.nextElementSibling.classList.remove("show");
      });
  }

  function handleLists(val){
    if(!val.classList.contains("select")){
      val.classList.add("select");
      val.children[2].classList.add("rotate")
      val.nextElementSibling.classList.add("show")
      setOpen(true)
    }
    else{
      val.classList.remove("select");
      val.children[2].classList.remove("rotate")
      val.nextElementSibling.classList.remove("show")
    }
  }


  const listShow = links.map((el, i)=>(el.role.includes(user.role) && (<React.Fragment key={i}>
    {/* head of list */}
      <li onClick={function(e){handleLists(e.currentTarget);}} className="headList">
            <FontAwesomeIcon icon={el.icon}/>
            <span>{el.list}</span>
            <FontAwesomeIcon id="angle" icon={faAngleUp}/>
      </li>
    {/* body of list */}
            <ul className="sub-menu">
              <div>
                { el.items.map((it, i)=>(
                <NavLink key={i} id="link" to={it.path} replace={true}>
                <FontAwesomeIcon icon={it.icon}/>
                <span>{it.name}</span>
                </NavLink>
                ))}
              </div>
            </ul>
  </React.Fragment>)))

function handleLogOut(){
  cookie.remove("accessToken");
  cookie.remove("user");
  localStorage.removeItem('cart');
  window.location.pathname="/login";
}

  return (
        <nav id="sidebar" style={{width:  open ? "250px" : "50px"}}>
          <ul>
            <li id="logo" onClick={function(e){handleSideBar(e.currentTarget)}} className="mb-3 mt-3">
              <span>Store</span>
              <FontAwesomeIcon icon={faAnglesLeft} className="me-2" style={{transition: "0.4s ease", transform: open && "rotate(-180deg)"}}/>
            </li>
            {listShow}
          </ul>
          <Button onClick={handleLogOut} className="w-75 btn btn-primary link-nav btn-side" ><FontAwesomeIcon icon={faRightFromBracket} /></Button>
        </nav>
  )
}
