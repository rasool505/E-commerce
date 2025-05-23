import "./NavBar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { Button } from "react-bootstrap";
import CategoriesShow from "../../Pages/Website/CategoriesShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faCartPlus, faLanguage, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchProducts } from "../../Context/SearchCtx";
import { searchURL } from "../../Api/Api";
import { Axios } from "../../Api/AxiosCreate";
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const cookie = Cookie();
  const token = cookie.get("accessToken");
  const user = cookie.get('user');
  const [query, setQuery] = useState('');
  const {setProducts} = useContext(SearchProducts);
  const amountRef = useRef(null)
  const nav = useNavigate();
//translation
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
      let newLang = i18n.language === 'en' ? 'ar' : 'en';
      i18n.changeLanguage(newLang);
    };

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




  //search product in products
          async function handleSearch(){
              try{
              const res = await Axios(`${searchURL}/${query}`);
                setProducts(res.data);
              }
              catch(error){
                setProducts([]);
              }
          }
      
  const path = window.location.pathname.split("/",-1)[1];

  const role = user?.role;
  let navTo = "/dashboard/edit/user";
  if(role === 0)
    navTo="/dashboard/users";
  else if (role === 1)
    navTo="/dashboard/edit/user"
  else if (role === 2)
    navTo="/dashboard/delivery";
  else if (role === 3)
    navTo="/dashboard/products";

  return (
    <>
    <header className="header" style={{height: path === "home" && "auto"}}>
        <nav className="nav-main">

            <div className="logo-nav">
            <NavLink className="text-decoration-none text-white" to={'/'}><h1 style={{fontWeight: "bolder", margin: "0", padding: "0"}}>Store</h1></NavLink>
            </div>
            { path === "home" &&
            <div className='d-flex flex-row justify-content-center align-items-center w-75 pt-3 gap-1'>
              <input 
              value={query}
              onChange={(e)=> setQuery((e.target.value).trim())}
              type="text"
              className='w-50 p-2 search-bar'
              placeholder={`${t('Search')}...`}
              autoFocus
              />
              <Button className='btn btn-primary link-nav ms-1 search-btn' onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
            </div>
            }
            <div className="d-flex justify-content-between align-items-center gap-1">
            <Button className='btn btn-primary link-nav me-2' onClick={toggleLanguage}><FontAwesomeIcon icon={faLanguage} /></Button>
            {!token
            ? <div className="auth-nav">
              {path !== 'login' &&
              <Link className="btn btn-primary link-nav" to={'/login'}>{t('Login')}</Link>
            }
              {path !== 'register' &&
              <Link className="btn btn-primary link-nav" to={'/register'}>{t('Register')}</Link>
            }
            </div> 
            : <div className="d-flex justify-content-between align-items-center gap-4">
            {path !== 'cart' &&
            <div className="text-center rounded-5 d-flex justify-content-center align-items-center cart-amount"
            style={{"--after-content": "0"}}
            ref={amountRef} onClick={()=>nav('/cart')}>
            <FontAwesomeIcon icon={faCartPlus} color="var(--bg-main)"/>
            </div>}
            {(path !== 'login' && path !== 'register') && <Link className="dashborad-btn" to={(path !== 'dashboard') ? navTo : '/'}><FontAwesomeIcon className="class-20px" icon={faBarsStaggered} color="var(--bg-main)"/></Link>}
            </div>}
            </div>
            
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
