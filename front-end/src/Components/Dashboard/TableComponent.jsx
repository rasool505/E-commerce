import React from 'react'
import { Table } from 'react-bootstrap'
import "./TableComponent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrash, faTruckPlane, faX } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function TableComponent({headers, data, currentUser, handleDelete, carts}) {
    const cart = carts || false;
    const current = currentUser || {
        _id: '',
        name: ''
    };
    const headName = headers.map((name, i)=>(
        <th key={i}>
            {name.name}
        </th>))
    const dataShow = data.map((item, i)=>(
    <tr key={i}>
    {headers.map((key, index)=>(
        <td key={index}>
            {
            key.key === '_id'
            ? i + 1
            : item[key.key] === 0 && key.key === "role"
            ? 'Admin' 
            : item[key.key] === 1 && key.key === "role"
            ? 'User' 
            : item[key.key] === 2 && key.key === "role"
            ? 'Delivery'
            : item[key.key] === 3 && key.key === "role"
            ? 'Writer'
            : item[key.key] === true
            ? 'available' 
            : item[key.key] === false
            ? 'unavailable' 
            : key.key === "createdAt"
            ? new Date(item[key.key]).toISOString().split('T')[0]
            : key.key === "updatedAt"
            ? new Date(item[key.key]).toISOString().split('T')[0]
            : key.key === "products" &&  item[key.key] !== null
            ? item[key.key].length
            : key.key === "user" &&  item[key.key] !== null
            ? item[key.key].name
            : key.key === "location" &&  item["user"].location !== null
            ? item["user"].location
            : key.key === "assignedTo" &&  item[key.key] !== null
            ? item[key.key].name
            : key.key === "image"
            ? <img width={"60px"} style={{objectFit: "cover"}} src={item[key.key]}/>
            : key.key === "categoryId" &&  item[key.key] !== null
            ? item[key.key].title
            : item[key.key] === null
            ? "Not Found"
            : item[key.key]
            }
        </td> ))}
    <td>
    <div className="d-flex justify-content-center align-items-center gap-3">
        
        {
            cart
            ? <Link to={`${item._id}`}><FontAwesomeIcon color="#424c56" fontSize="20px" icon={faTruckPlane} cursor={"pointer"}/></Link>
            : <Link to={`${item._id}`}><FontAwesomeIcon color="#424c56" fontSize="20px" icon={faPenToSquare} cursor={"pointer"}/></Link>
        }
        
        {
            <FontAwesomeIcon 
            fontSize="20px" 
            color={ (current._id !== item._id) ? "#a01531" : "#a7aeaf" }
            icon={faTrash} 
            cursor={ (current._id !== item._id) ? "pointer" : {}}
            onClick={ (current._id !== item._id) ? ()=>handleDelete(item._id) : ()=>{}}
            />
        }
    </div>
    </td>
    </tr>
    ));

  return (
    // striped bordered hover
    <table   className='main-table'>
        <thead>
            <tr>
                {headName}
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {dataShow.length === 0 ? <tr><td colSpan={12} className="text-center w-100">Loading...</td></tr> : dataShow}
        </tbody>
    </table>
  )
}
