import React, { useEffect, useState } from 'react'
import Cookie from 'cookie-universal';
import { Navigate, Outlet } from 'react-router-dom';
import { Axios } from '../../Api/AxiosCreate';
import { userURL } from '../../Api/Api';
import Loading from '../../Components/Website/Loading';

export default function AuthRequird({allowedRole}) {
    const cookie = Cookie();
    const token = cookie.get('accessToken');
    const [user, setUser] = useState('');

    useEffect(()=>{
      Axios.get(userURL)
      .then((data)=>setUser(data.data))
      .catch((error)=>console.log(error))
    }, [])
  return <React.Fragment>
   { token ? user === '' ? <Loading/> : allowedRole.includes(user.role) ? <Outlet/> : <Navigate to={'/403'} replace={true}/> : <Navigate to={'/login'} replace={true}/>}
  </React.Fragment>
}
