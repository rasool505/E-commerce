import { useEffect, useState } from "react";
import { Axios } from "../../Api/AxiosCreate";
import { allDeliveryCartsURL, cartCancelledURL, cartDeliveredURL, cartsURL, userURL } from "../../Api/Api";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

export default function DeliveryCarts() {

  const [carts, setCarts] = useState([]);
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    Axios.get(userURL)
    .then((data)=>setUser(data.data))
    .catch((err)=>setErrorMessage(err.response.data.message))
  }, [])

  
  //get all Carts
  useEffect(()=>{
    if (user && user._id) {
        console.log(user._id)
    Axios.get(`${cartsURL}/${allDeliveryCartsURL}/${user._id}`)
    .then(data=>{setCarts(data.data)})
    .catch((err)=>{
      setErrorMessage(err.response.data.message);
      setCarts([]);
    })
    }
  }, [user, reload]);

  console.log(carts)

  // delivered cart
  async function handleDelivered(id){
    await Axios.put(`${cartDeliveredURL}/${id}`)
    setReload(prev=>!prev)
  }

  // cancelled cart
  async function handleCancelled(id){
    await Axios.put(`${cartCancelledURL}/${id}`)
    setReload(prev=>!prev)
  }

  const ProductHeaders = [
    {name: 'Title', key: 'title'},
    {name: 'Price', key: 'price'},
    {name: 'Discount', key: 'discount'},
    {name: 'Quantity', key: 'quantity'},
  ];
  const UserHeaders = [
    {name: 'Client', key: 'name'},
    {name: 'Location', key: 'location'},
    {name: 'Phone', key: 'phone'},
  ];


  const headUser = UserHeaders.map((name, index)=>(
        <th key={index}>
            {name.name}
        </th>
    ))

  const headName = ProductHeaders.map((name, index)=>(
        <th key={index}>
            {name.name}
        </th>
    ))

const productShow = carts.map((item, i)=>(
    item["products"].map((product, index)=>(
      <tr key={index}>
        {
            ProductHeaders.map((key, index)=>(
            <td key={index}>
             {
                key.key === "title"
                ? product["productId"].title
                : key.key === "price"
                ? product["productId"].price
                : key.key === "discount"
                ? product["productId"].discount
                : key.key === "quantity"
                && product['quantity']
             }   
            </td>
            ))
        }
      </tr>
        ))
))

const cartsShow = carts.map((item, i)=>(
<React.Fragment key={i}>
<tr>
{
    UserHeaders.map((key, index)=>(
    <td key={index}>
        {
        key.key === "name"
        ? item["user"].name
        : key.key === "location"
        ? item["user"].location
        : key.key === "phone"
        && item["user"].phone
        }   
    </td>
    ))
}
<td>
    {
        item["status"]
    }
</td>
<td>
    {
        item["totalPrice"]
    }
</td>
<td>
<div className="d-flex justify-content-center align-items-center gap-3">
    <Link to={`${i}`}><FontAwesomeIcon color="#212529" fontSize="20px" icon={faBoxes} cursor={"pointer"}/></Link>
    <FontAwesomeIcon color="#5cb85c" fontSize="20px" icon={faCheck} cursor={"pointer"} onClick={()=>handleDelivered(item._id)}/>
    <FontAwesomeIcon color="#c91432" fontSize="18px" icon={faX} cursor={"pointer"} onClick={()=>handleCancelled(item._id)}/>
</div>
</td>
</tr>
</React.Fragment>
));

  return (
    <main className="w-100 vh-100 d-flex justify-content-start align-items-center container-section flex-column">
      <table className="main-table">
          <thead>
              <tr>
                  {headUser}
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
              {cartsShow.length === 0 ? <tr><td colSpan={12} className="text-center w-100">Loading...</td></tr> : cartsShow}
          </tbody>
      </table>
      <p style={{color: "var(--error)"}}>{errorMessage}</p>
    </main>
  )
}
