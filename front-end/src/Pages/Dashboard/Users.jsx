import { useEffect, useState } from "react"
import TableComponent from "../../Components/Dashboard/TableComponent"
import { Axios } from "../../Api/AxiosCreate"
import { usersURL, userURL } from "../../Api/Api"


export default function Users() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  //get all users
  useEffect(()=>{
    Axios.get(usersURL)
    .then(data=>setUsers(data.data))
    .catch((error)=>console.log(error))
  }, []);

  //get user 
  useEffect(()=>{
    Axios.get(userURL)
    .then((data)=>setCurrentUser(data.data))
    .catch((error)=>console.log(error))
  }, []);

  async function handleDelete(id){
    await Axios.delete(`${usersURL}/${id}`)
    setUsers(users => users.filter((user)=>user._id !== id))
  }

  const headers = [
    {name: 'Id', key: '_id'},
    {name: 'Name', key: 'name'},
    {name: 'Email', key: 'email'},
    {name: 'Role', key: 'role'},
  ];

  return (
    <main className="w-100 vh-100 d-flex justify-content-center container-section">
      <TableComponent headers={headers} data={users} currentUser={currentUser} handleDelete={handleDelete}/>
    </main>
  )
}
