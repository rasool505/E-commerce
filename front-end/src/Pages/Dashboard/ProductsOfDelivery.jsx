import { useEffect, useState } from "react";
import { Axios } from "../../Api/AxiosCreate";
import { allDeliveryCartsURL, cartsURL, userURL } from "../../Api/Api";
import { Table } from "react-bootstrap";
import React from "react";
import { useParams } from "react-router-dom";

export default function ProductsOfDelivery() {

    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const id = useParams().id;

    useEffect(()=>{
    Axios.get(userURL)
    .then((data)=>setUser(data.data))
    .catch((err)=>setErrorMessage(err.response.data.message))
    }, [])


    //get all Carts
    useEffect(()=>{
    if (user && user._id) {
    Axios.get(`${cartsURL}/${allDeliveryCartsURL}/${user._id}`)
    .then(data=>{
        let list = []
        const products = data.data
        products.forEach(element => {
            list.push(element.products)
        });
        setProducts(list[id])
    })
    .catch((err)=>{
        setErrorMessage(err.response.data.message);
        setCarts([]);
    })
    }
    }, [user]);


    const ProductHeaders = [
    {name: 'Title', key: 'title'},
    {name: 'Price', key: 'price'},
    {name: 'Discount', key: 'discount'},
    {name: 'Quantity', key: 'quantity'},
    ];

    const headName = ProductHeaders.map((name, index)=>(
        <th key={index}>
            {name.name}
        </th>
    ))
    
    const productShow = products.map((product, i)=>(
        <tr key={i}>
            <td> { product["productId"].title } </td>
            <td> { product["productId"].price } </td>
            <td> { product["productId"].discount } </td>
            <td> { product["quantity"] } </td>
        </tr>
    ))

    return (
        <main className="w-100 vh-100 d-flex justify-content-start align-items-center container-section flex-column">
                <table className="main-table">
                    <thead>
                        <tr>
                            {headName}
                        </tr>
                    </thead>
                    <tbody>
                        {productShow.length === 0 ? <tr><td colSpan={12} className="text-center w-100">Loading...</td></tr> : productShow}
                    </tbody>
                </table>
                <p style={{color: "var(--error)"}}>{errorMessage}</p>
        </main>
    )
}
