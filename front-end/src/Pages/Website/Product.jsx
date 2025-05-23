import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../../Api/AxiosCreate';
import { productURL } from '../../Api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import emptyBox from '../../assets/empty-box.png';
import Cookie from 'cookie-universal';
import Notiflix from 'notiflix';
import { useTranslation } from 'react-i18next';




export default function Product(){
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [product, setProduct] = useState();
    const {id} = useParams();
    const cookie = Cookie();
    const token = cookie.get('accessToken');
    const user = cookie.get('user');
    const nav = useNavigate();
    const { t, i18n } = useTranslation();

    
    let products = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || {
        user: user ? user._id : null,
        products: []
    };
    
    if(cart){
        products = cart.products;
    }
    
    cart = JSON.parse(localStorage.getItem('cart'))|| {
        user: user ? user._id : null,
        products: []
    };
    const i = cart.products.findIndex(p => p.productId === id);
    let quantity = 0;
    if(products.length > 0 && i !== -1){
        quantity = products[i].quantity || 1;
    }
    const [amount, setAmount] = useState(parseInt(quantity)||1);

    // get product
    useEffect(()=>{
        Axios.get(`${productURL}/${id}`)
        .then(data=>setProduct(data.data))
        .catch(err=>console.log(err))
    },[])


     // chang page number from keys arrows
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                setIndex(prev=> prev < 2 ? prev + 1 : prev)
            } else if (event.key === 'ArrowLeft') {
                setIndex(prev=> prev > 0 ? prev - 1 : prev)
            }
        };

        window.addEventListener('keydown', handleKeyDown, { signal });
        // window.addEventListener('keydown', handleKeyDown);
            return () => {
                controller.abort(); // abort the request when the component unmounts
            // window.removeEventListener('keydown', handleKeyDown);
            };
        }, []);

    function addToCart(){
        if (!token) {
            nav('/login');
        } else{
        //default values
        const newProduct = {
            title: product !== undefined && product.title,
            price: product !== undefined && product.price,
            stock: product !== undefined && product.stock,
            image: product !== undefined  && product.images[0], 
            productId: id,
            quantity: amount
        };

        if(cart.products.length == 0){
            localStorage.setItem('cart', JSON.stringify({
                user: user ? user._id : null,
                products: []
            }));
        }
        cart = JSON.parse(localStorage.getItem('cart'));
        const i = cart.products.findIndex(p => p.productId === id);
        if (i !== -1) {
            if (cart.products[i].quantity <= 300 && cart.products[i].quantity >= 1 && cart.products[i].quantity < product.stock) {
                cart.products[i].quantity = amount;
                //alert
                Notiflix.Notify.success('Product added to cart', {
                    position: "center-top",
                    timeout: 2000,
                    clickToClose: false,
                    cssAnimation: true,
                    cssAnimationDuration: 400,
                    cssAnimationStyle: "zoom",
                });
            } else{
                //alert
                Notiflix.Notify.failure('Product is out of stock', {
                    position: "center-top",
                    timeout: 2000,
                    clickToClose: false,
                    cssAnimation: true,
                    cssAnimationDuration: 400,
                    cssAnimationStyle: "zoom",
                });
            }
        } else {
            cart.products.push(newProduct);
        }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (
    <main style={{color: 'white'}} className='main-product-show'>

        <div className='d-flex justify-content-center align-items-center gap-3 flex-column'>

        <div className='d-flex justify-content-center align-items-center flex-column gap-3'>
        <img className='border-card' style={{width: '300px', height: '300px', objectFit: 'cover'}}
            src={ product?.images[index] === undefined? emptyBox :  product.images[index]} onClick={()=>setOpen(prev=>!prev)}/>
        <div className='d-flex justify-content-between align-items-center gap-3'>
        <img className={index === 0 ? 'select-border-card' : 'border-card'} style={{width: '80px', height: '80px', objectFit: 'cover'}}
            src={ product?.images[0] === undefined? emptyBox :  product.images[0]} onClick={()=>setIndex(0)}/>
        <img className={index === 1 ? 'select-border-card' : 'border-card'} style={{width: '80px', height: '80px', objectFit: 'cover'}}
            src={ product?.images[1] === undefined? emptyBox :  product.images[1]} onClick={()=>setIndex(1)}/>
        <img className={index === 2 ? 'select-border-card' : 'border-card'} style={{width: '80px', height: '80px', objectFit: 'cover'}}
            src={ product?.images[2] === undefined? emptyBox :  product.images[2]} onClick={()=>setIndex(2)}/>
        </div>
        </div>

        <div className='d-flex justify-content-center align-items-center gap-3 flex-column h-auto'>
            <h1>{[product !== undefined && product.title]}</h1>
            <div>
            <p className=' fw-bold'>{t('Price')}: {[product !== undefined && product.price]}$</p>
            <p className=' fw-bold'>{t('Stock')}: {[product !== undefined && product.stock]}</p>
            <p className=' fw-bold'>{t('TotalPrice')}: {[product !== undefined && (product.price * amount)]}$</p>
            </div>

            <div className='d-flex align-items-center gap-2 flex-column w-100'>
                    
                    <Button className='btn-primary link-nav w-100'
                    style={{height: '38px'}}
                    onClick={addToCart}
                    >
                        {t('addtocart')}
                    </Button>

                    <div className='d-flex justify-content-center align-items-center w-100'>
                    <Button className='btn-primary link-nav w-25' 
                    onClick={()=>setAmount(prev=> prev > 1 ? prev - 1 : prev)}>
                    <FontAwesomeIcon icon={faMinus}/></Button>
                    
                    <p className='m-2'>{amount}</p>

                    <Button className='btn-primary link-nav w-25' 
                    onClick={()=>setAmount(prev=> prev < 300 && prev < product.stock ? prev + 1 :  prev)}>
                    <FontAwesomeIcon icon={faPlus}/></Button>

                    </div>
                </div>

        </div>
        <details className='text-start text-wrap'>
        <summary>{t('About')}</summary>
        {[product !== undefined && product.description]}
        </details>

        </div>

        <div className='w-100 h-100 position-absolute image-show' style={{display: !open ? 'none' : 'block'}}>
        <div className='w-100 h-auto d-flex justify-content-end' style={{height: '80px'}}><Button className='btn btn-primary link-nav m-3' style={{width: '40px'}} onClick={()=>setOpen(false)}><FontAwesomeIcon icon={faX}/></Button></div>
        <div className='d-flex justify-content-start align-items-start h-100 w-100 gap-3 text-center'>
            <div className='w-100 d-flex gap-3 justify-content-center align-items-center'>
            <Button className='btn-primary link-nav' disabled={index === 0} style={{height: '80px', width: '40px'}} onClick={()=>{
                if (index > 0) {
                    setIndex(prev=>prev-1)
                }
            }}><FontAwesomeIcon icon={faAngleLeft}/></Button>
            <img className='border-card big-img' style={{userSelect: 'none'}} src={[product?.images[index] || emptyBox]}/>
            <Button className='btn-primary link-nav' disabled={index === 2} style={{height: '80px', width: '40px'}} onClick={()=>{
                if (index < 2) {
                    setIndex(prev=>prev+1)
                }
            }}><FontAwesomeIcon icon={faAngleRight}/></Button>
            </div>
        </div>
        </div>
    </main>
    )
}
