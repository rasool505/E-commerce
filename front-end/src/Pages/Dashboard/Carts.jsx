import { useEffect, useState } from "react";
import TableComponent from "../../Components/Dashboard/TableComponent";
import { Axios } from "../../Api/AxiosCreate";
import { cartsURL, productsURL } from "../../Api/Api";


export default function Carts() {

  const [carts, setCarts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [reload, setReload] = useState(false)


  //get all Carts
  useEffect(()=>{
    Axios.get(cartsURL)
    .then(data=>{
      setCarts(data.data);
    })
    .catch((err)=>{
      setErrorMessage(err.response.data.message);
      setCarts([]);
    })
  }, [reload]);

  async function handleDelete(id){
    await Axios.delete(`${cartsURL}/${id}`)
    setCarts(cart => cart.filter((item)=>item._id !== id));
    setReload(prev=>!prev);
  }

  const headers = [
    {name: 'Id', key: '_id'},
    {name: 'Client', key: 'user'},
    {name: 'Location', key: 'location'},
    {name: 'Delivery', key: 'assignedTo'},
    {name: 'Products', key: 'products'},
    {name: 'Total Price', key: 'totalPrice'},
    {name: 'Status', key: 'status'},
    {name: 'Created At', key: 'createdAt'},
    {name: 'Updated At', key: 'updatedAt'},

  ];

  return (
    <main className="w-100 min-vh-100 d-flex justify-content-start align-items-center flex-column container-section">
      <TableComponent headers={headers} data={carts} handleDelete={handleDelete} carts={true}/>
      <p style={{color: "var(--error)"}}>{errorMessage}</p>
    </main>
  )
}
