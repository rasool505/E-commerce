import { useEffect, useState } from "react"
import TableComponent from "../../Components/Dashboard/TableComponent"
import { Axios } from "../../Api/AxiosCreate"
import { adsURL } from "../../Api/Api"


export default function Ads() {

  const [ads, setAds] = useState([]);

  //get all categories
  useEffect(()=>{
    Axios.get(adsURL)
    .then(data=>setAds(data.data))
    .catch((error)=>console.log(error))
  }, []);


  async function handleDelete(id){
    await Axios.delete(`${adsURL}/${id}`)
    setAds(ad => ad.filter((item)=>item._id !== id))
  }

  const headers = [
    {name: 'ID', key: '_id'},
    {name: 'Description', key: 'description'},
    {name: 'Available', key: 'available'},
    {name: 'Image', key: 'image'},

  ];

  return (
    <main className="w-100 min-vh-100 d-flex justify-content-center container-section">
      <TableComponent headers={headers} data={ads} handleDelete={handleDelete}/>
    </main>
  )
}
