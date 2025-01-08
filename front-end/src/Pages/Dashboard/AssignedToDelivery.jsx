import { useEffect, useState } from "react";
import { cartsURL, dliveryURL} from "../../Api/Api";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Axios } from "../../Api/AxiosCreate";
import Loading from "../../Components/Website/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";


export default function AssignedToDelivery(){

    // states
    const [dliveries, setDliveries] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [reLoad, setReLoad] = useState(false)
    const id = useParams().id;

    // gat all dliveries
    useEffect(()=>{
      Axios.get(`${dliveryURL}`)
      .then(data => setDliveries(data.data))
      .catch(err=>setErrorMessage(err.response.data.message))
    }, [reLoad]);

    const headers = [
        {name: 'Name Of Delivery', key: 'name'},
        {name: 'Amount Of Carts', key: 'amountOfCarts'},
      ];

    const headName = headers.map((name, i)=>(
        <th key={i}>
            {name.name}
        </th>))

    const dileveriesShow = dliveries.map((item, i)=>
    <tr key={i}>
        {headers.map((key, index)=>(
        <td key={index}>
        {
            key.key === "name"
            ? item["name"]
            : key.key === "amountOfCarts"
            && item["amountOfCarts"]
        }
        </td>
        ))}
        <td>
        <FontAwesomeIcon
            fontSize="20px" 
            icon={faCartPlus} 
            cursor={"pointer"}
            onClick={()=>handleSubmit(item._id)}
        />
        </td>
        </tr>
        );

    // handle submit
    async function handleSubmit(assignedTo){
        try{
            setLoading(true);
            const res = await Axios.put(`${cartsURL}/${id}`, {
                assignedTo: assignedTo
            }).then(data=>setReLoad(prev=>!prev))
            setLoading(false);
            window.location.pathname="/dashboard/carts";
        }
        catch(err){
            setErrorMessage(err.response.data.message)
            setLoading(false);
        }
    }

    return(
        <>
        <div className= "conatiner-main">
       <div className="d-flex justify-content-center align-items-center w-100 position-sticky top-0 z-3">
       </div>
       {loading ? <div className= "conatiner-loading gap-4">
         <Loading/>
       </div>
       : <div className="d-flex justify-content-center align-items-end flex-column vh-100 w-100 z-0">
           <div className= "content">
                <div className= "conatiner-form d-flex justify-content-center align-items-center flex-column ">
                <table className="w-75 main-table">
                    <thead>
                        <tr>
                            {headName}
                        </tr>
                    </thead>
                    <tbody>
                        {dileveriesShow.length === 0 ? <tr><td colSpan={12} className="text-center w-100">Loading...</td></tr> : dileveriesShow}
                    </tbody>
                </table>
                <p style={{color: "var(--error)"}}>{errorMessage}</p>
                </div>
            </div>
            </div> }
            </div> 
        </>
    );
}