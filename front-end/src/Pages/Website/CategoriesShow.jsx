import React, { useEffect, useState } from 'react';
import { AxiosNoToken } from '../../Api/AxiosCreate';
import { categoriesURL } from '../../Api/Api';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function CategoriesShow() {

    const [categories, setCategories] = useState([]);
    const controller = new AbortController();
    const signal = controller.signal;
    const navTo = useNavigate();
    const { t, i18n } = useTranslation();
    

    useEffect(()=>{
            AxiosNoToken.get(categoriesURL, {signal})
            .then(data=>{
                setCategories(data.data);
                navTo(data.data[0]._id);
            })
            .catch(error=> console.log(error))

        return () => {
            controller.abort();
        };
    },[])
    
    const show = categories.map((element, i)=>(
        <NavLink key={i} to={element._id} className="category-name">{element.title}</NavLink>
    ))

    return (
    <div className='nav-category'>
        {t('Categories')}:
        {show}
    </div>
    )
}
