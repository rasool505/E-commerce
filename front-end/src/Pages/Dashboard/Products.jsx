import { useEffect, useState } from "react";
import TableComponent from "../../Components/Dashboard/TableComponent";
import { Axios } from "../../Api/AxiosCreate";
import { productsURL } from "../../Api/Api";


export default function Products() {

  const [products, setProducts] = useState([]);

  //get all categories
  useEffect(()=>{
    Axios.get(productsURL)
    .then(data=>setProducts(data.data))
    .catch((error)=>console.log(error))
  }, []);

  async function handleDelete(id){
    await Axios.delete(`${productsURL}/${id}`)
    setProducts(product => product.filter((item)=>item._id !== id))
  }

  const headers = [
    {name: 'Id', key: '_id'},
    {name: 'Title', key: 'title'},
    {name: 'Category', key: 'categoryId'},
    {name: 'Stock', key: 'stock'},
    {name: 'Price', key: 'price'},
    {name: 'Discount', key: 'discount'},
    {name: 'Available', key: 'available'},
  ];


  return (
    <main className="w-100 min-vh-100 d-flex justify-content-center container-section">
      <TableComponent headers={headers} data={products} handleDelete={handleDelete}/>
    </main>
  )
}
