import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Axios } from '../../Api/AxiosCreate';
import { adsURL, productsURL, userURL } from '../../Api/Api';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Cards from './Cards';
import Card from 'react-bootstrap/Card';
import Cookie from 'cookie-universal';


export default function ProductsShow() {

    const id = useParams().category;
    const [products, setProducts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [query, setQuery] = useState('');

    const [page, setPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [ads, setAds] = useState([]);
    const cookie = Cookie();
    const user = cookie.get('user');

    //refs
    const leftArrow = useRef(null);
    const rightArrow = useRef(null);

    //filter items
    useEffect(()=>{
        if(products.results !== undefined){
            setFilteredItems(products.results.filter(item => {
                return item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
            }))
        }
    },[products, query])

    // get user
    useEffect(()=>{
        if(!user){
        Axios.get(userURL)
        .then((data)=>{localStorage.setItem('cart', JSON.stringify({
            user:  data.data._id,
            products: []
        }));
        cookie.set('user', data.data);
        setErrorMessage('');
        })
        .catch((error)=>setErrorMessage(error.response.data.message))
        }
    },[])


    // chang page number from keys arrows
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                if(rightArrow.current){
                    rightArrow.current.click();
                }
            } else if (event.key === 'ArrowLeft') {
                if(leftArrow.current){
                    leftArrow.current.click();
                }
            }
          };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
    
    // get products
    useEffect(()=>{
        (async function fetchProducts(){
            try{
            const res = await Axios(`${productsURL}/${id}?page=${page}&limit=${8}`);
                setProducts(res.data);
                setErrorMessage('');
            }
            catch(error){
                setErrorMessage(error.response.data.message)
                setProducts([]);
            }
        })()
    },[id, page]);
    
    // get ads
    useEffect(()=>{
        Axios(`${adsURL}`)
        .then(data=>{
            setAds(data.data);
            setErrorMessage('');
        })
        .catch(error=>{
            setErrorMessage(error.response.data.message);
        })
    },[]);
    
    const ad = ads.map((el, i)=>(
        el.available && <Card key={i} className='big-card border-card'>
        <Card.Img style={{objectFit: 'cover', objectPosition: 'center'}} width={"100%"} height={"350px"} variant="top" src={el.image} />
        <Card.Body>
        <Card.Text style={{fontWeight: 'bold'}}>
            {el.description}
        </Card.Text>
        </Card.Body>
        </Card>
    ))
        
    async function NextPage(){
        if(products.next['page']){
            setPage(products.next['page']);
        }
    }
    async function PreviousPage(){
        if(products.previous['page']){
            setPage(products.previous['page']);
        }
    }

    //show products
    let cardsShow = filteredItems.map((card, i)=>(
            <Cards key={i} id={card._id} title={card.title} description={card.description} price={card.price} stock={card.stock} images={card.images[0]}/>
        ))
    
    return (
        <main className='d-flex flex-column gap-0'>
        <div className='d-flex justify-content-center align-items-center w-100 pt-3 gap-1'>
        <input 
        value={query}
        onChange={(e)=> setQuery(e.target.value)}
        type="text"
        className='w-50 p-2 search-bar'
        placeholder='Search...'
        autoFocus
        />
        </div>
        <div className='w-100 p-3 d-flex justify-content-center align-items-center'>
            {ad}
        </div>
        <div className='min-vh-100 vw-100 p-3 container-cards justify-content-center'>
            {errorMessage === '' ? cardsShow : <div className='vw-100 d-flex justify-content-center align-items-center'><p className=' text-white'>{errorMessage}</p></div>}
        </div>
        <div className='d-flex justify-content-center align-items-center gap-3 p-3'>
            {products.previous && 
            <Button ref={leftArrow} className='d-flex justify-content-center align-items-center flex-row gap-3 btn btn-primary link-nav' onClick={PreviousPage}>
                <FontAwesomeIcon icon={faAngleLeft}/>
                <p>{!products.next && parseInt(products.previous['page']) !== 1 ? parseInt(products.previous['page']) -1 : parseInt(products.previous['page'])}</p>
            </Button>}
            {products.next && 
            <Button ref={rightArrow} className='d-flex justify-content-center align-items-center flex-row gap-3 btn btn-primary link-nav' onClick={NextPage}>
                <p>{parseInt(products.next['page']) === 2 ? parseInt(products.next['page']) : parseInt(products.next['page']) - 1}</p>
                <FontAwesomeIcon icon={faAngleRight}/>
            </Button>}
        </div>
        </main>
    )
}
