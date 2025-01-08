import "./NavBar.css";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { Button } from "react-bootstrap";
import CategoriesShow from "../../Pages/Website/CategoriesShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const cookie = Cookie();
  const token = cookie.get("accessToken");
  const user = cookie.get('user');

  const amountRef = useRef(null)
  const nav = useNavigate();

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))) || {
    user: user._id,
    products: []
  };

  let products = [];

  if (cart) {
  products = cart.products;
  }

  useEffect(()=>{

    let amount = 0;
    products.forEach((e) => {
      amount += e.quantity;
    });

    if (amountRef.current) {
      if (amount < 100) {
        amountRef.current.style.setProperty('--after-content', `'${amount}'`);
      } else{
        amountRef.current.style.setProperty('--after-content', '"99+"');
      }
    }

  },[cart, products]);

 useEffect(() => {
  const interval = setInterval(() => {
    const newCart = JSON.parse(localStorage.getItem('cart'));
    if (newCart && JSON.stringify(newCart) !== JSON.stringify(cart)) {
      setCart(newCart);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [cart]);

  function handleLogOut(){
    cookie.remove("accessToken");
    localStorage.removeItem('cart');
    window.location.pathname="/login";
  }
  const path = window.location.pathname.split("/",-1)[1];

  return (
    <>
    <header className="header" style={{height: path === "home" && "auto"}}>
        <nav className="nav-main">
            <div className="logo-nav">
            <NavLink className="text-decoration-none text-white" to={'/'}><h1 style={{fontWeight: "bolder", margin: "0", padding: "0"}}>Store</h1></NavLink>
            {(path !== 'dashboard' && path !== 'login' && path !== 'register') && <Link to={'/dashboard'}><FontAwesomeIcon icon={faBars} color="var(--bg-main)"/></Link>}
            </div>
            {!token
            ? <div className="auth-nav">
            <Link className="btn btn-primary link-nav" to={'/login'}>Login</Link>
            <Link className="btn btn-primary link-nav" to={'/register'}>Register</Link>
            </div> 
            : <div className="d-flex justify-content-between align-items-center gap-4">
            {path !== 'cart' &&
            <div className="text-center rounded-5 d-flex justify-content-center align-items-center cart-amount"
            style={{"--after-content": "0"}}
            ref={amountRef} onClick={()=>nav('/cart')}>
            <FontAwesomeIcon icon={faCartPlus} color="var(--bg-main)"/>
            </div>}
            <Button onClick={handleLogOut} className="btn btn-primary link-nav" >Log Out</Button>
            </div>}
        </nav>
    { path === "home" &&
      <nav className="nav-category">
        <CategoriesShow/>
      </nav>
    }
    </header>
    </>
  )
}
