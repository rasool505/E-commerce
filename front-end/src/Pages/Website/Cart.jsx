import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from '../../Components/Website/NavBar';
import Footer from '../../Components/Website/Footer';
import {faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'cookie-universal';
import { Axios } from '../../Api/AxiosCreate';
import { cartsURL } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';


export default function Cart(){
    const navigate = useNavigate();
    const cookie = Cookie();
    const user = cookie.get('user');
    let products = [];
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))) || {
        user: user._id,
        products: []
    };
    const [errorMessage, setErrorMessage] = useState('')
    
    if(cart){
    products = cart.products;
    }

    async function handleSubmit(){
        try{
            let productsForm = [];
            let form = {};
            products.forEach((e)=>{
                productsForm.push({productId: e.productId, quantity: e.quantity})
            })
            form = {user: user._id, products: productsForm}
            await Axios.post(cartsURL, form);
            localStorage.removeItem('cart');
            setCart({
                user: user._id,
                products: []
            });
            setErrorMessage('');
            navigate('/home')
        } catch (error) {
            console.log(error)
            // setErrorMessage(error.response.message);
        }
    }

    let product;

    if(products !== undefined){
    product = products.map((item, i)=>(
        <div key={i} className='product-of-cart'>

                <img className='border-card' style={{width: '80px', height: '80px', objectFit: 'cover'}} src={item.image}/>

                <div className='d-flex justify-content-between align-items-center flex-column'>
                    <h1>{item.title}</h1>
                    <p className=' fw-bold'>Price: {item.price}$</p>
                    <p className=' fw-bold'>Stock: {item.stock}</p>
                    <p className=' fw-bold'>Total price: {(item.price * item.quantity)}$</p>
                </div>

                <div className='d-flex align-items-center gap-2 flex-column w-50'>
                    <Button className='btn-primary link-nav w-100 bg-danger'
                    style={{height: '38px'}}
                    onClick={()=>{
                        cart.products = cart.products.filter(p => p.productId !== item.productId);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        setCart(JSON.parse(localStorage.getItem('cart')));

                    }}
                    >Remove</Button>
                    <div className='d-flex justify-content-center align-items-center w-100'>
                    <Button className='btn-primary link-nav w-25' 
                    onClick={()=>{
                        if (cart.products[i].quantity > 1) {
                        cart.products[i].quantity -= 1;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        setCart(JSON.parse(localStorage.getItem('cart')))
                        }
                    }}>
                    <FontAwesomeIcon icon={faMinus}/></Button>
                    
                    <p className='m-2'>{cart.products[i].quantity}</p>

                    <Button className='btn-primary link-nav w-25' 
                    onClick={()=>{
                        if (cart.products[i].quantity < 300) {
                            cart.products[i].quantity += 1;
                            localStorage.setItem('cart', JSON.stringify(cart));
                            setCart(JSON.parse(localStorage.getItem('cart')));
                        }
                    }}>
                    <FontAwesomeIcon icon={faPlus}/></Button>
                    </div>
                </div>
        </div>
    )
    );
    }

    return <main style={{color: 'white', background: 'var(--base-clr)'}} className='w-100 min-vh-100'>
        <NavBar/>
        <div className='d-flex justify-content-center align-items-center w-auto p-2 gap-2 flex-nowrap nav-cart'>
        <Button className='btn-primary link-nav w-25 bg-danger'
            style={{height: '38px'}}
            onClick={()=>{
                localStorage.removeItem('cart');
                setCart([]);
            }}
        >Delete</Button>
        <Button className='btn-primary link-nav w-25 bg-success'
            style={{height: '38px'}}
            onClick={handleSubmit}
        >Send</Button>
        </div>
        <div className='d-flex justify-content-center align-items-center w-100'>
            {errorMessage}
        </div>
        <div className="content-dashboard w-100 min-vh-100 d-flex justify-content-center align-items-center flex-column">
            {
                (products === undefined) ? <p>No Products In Carts</p> : product
            }
        </div>
        <Footer/>
    </main>
}
