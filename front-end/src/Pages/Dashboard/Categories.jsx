import { useEffect, useState } from "react"
import TableComponent from "../../Components/Dashboard/TableComponent"
import { Axios } from "../../Api/AxiosCreate"
import { categoriesURL } from "../../Api/Api"


export default function Categories() {

  const [categories, setCategories] = useState([]);

  //get all categories
  useEffect(()=>{
    Axios.get(categoriesURL)
    .then(data=>setCategories(data.data))
    .catch((error)=>console.log(error))
  }, []);


  async function handleDelete(id){
    await Axios.delete(`${categoriesURL}/${id}`)
    setCategories(category => category.filter((item)=>item._id !== id))
  }

  const headers = [
    {name: 'Id', key: '_id'},
    {name: 'Title', key: 'title'},
    {name: 'Image', key: 'image'},
  ];

  return (
    <main className="w-100 min-vh-100 d-flex justify-content-center container-section">
      <TableComponent headers={headers} data={categories} handleDelete={handleDelete}/>
    </main>
  )
}
