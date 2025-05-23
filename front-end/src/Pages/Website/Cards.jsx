import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import emptyBox from '../../assets/empty-box.png';
import Notiflix from 'notiflix';
import { useTranslation } from 'react-i18next';


export default function Cards({title, description, price, stock, images, id}){
  const nav = useNavigate();
  const cookie = Cookie();
  const token = cookie.get('accessToken');
  const user = cookie.get('user');
  const { t, i18n } = useTranslation();
  
    
  let cart = JSON.parse(localStorage.getItem('cart')) || {
    user: user ? user._id : null,
    products: []
  };

  const newProduct = {
    title: title,
    price: price,
    stock: stock,
    image: images, 
    productId: id,
    quantity: 1
  };

  //navigate to product
  function handleClick(){
    nav(`/home/product/${id}`)
  }

  // add to cart
  function handleAddToCard(){
    if (!token) {
      nav('/login');
    }else{
      cart = JSON.parse(localStorage.getItem('cart')) || {
        user: user._id,
        products: []
      };
      const productIndex = cart.products.findIndex(p => p.productId === id);
      if (productIndex !== -1) {
        if (cart.products[productIndex].quantity <= 300 && cart.products[productIndex].quantity >= 1 && cart.products[productIndex].quantity < stock) {
          cart.products[productIndex].quantity += newProduct.quantity;
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
    <Card className='border-card card' style={{ height: '33rem', width: '18rem'}} >
      <Card.Img height='268px' width='286px' style={{objectFit: 'cover'}} variant="top" src={images ? images : emptyBox} onClick={handleClick}/>
      <Card.Body onClick={handleClick} className='flex-grow-1'>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {description}
        </Card.Text>
      </Card.Body>
      <Card.Body className='flex-grow-0 m-1'>
        <div className='d-flex justify-content-between align-items-center m-0'>
        <div className='d-flex justify-content-center align-items-center flex-column m-0'>
        <Card.Text>{t('Stock')}: {stock}</Card.Text>
        <Card.Text>{t('Price')}: {price}</Card.Text>
        </div>
        <Button className='btn btn-primary link-nav w-50' onClick={handleAddToCard}>{t('addtocart')}</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
