import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import HomePage from './Pages/Website/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Register from './Pages/Auth/Register';
import Users from './Pages/Dashboard/Users';
import AuthRequird from "./Pages/Auth/AuthRequird"
import Error403 from './Components/Dashboard/Error403';
import Error404 from './Components/Dashboard/Error404';
import UpdateUser from './Pages/Dashboard/UpdateUser';
import AddUser from './Pages/Dashboard/AddUser';
import Categories from './Pages/Dashboard/Categories';
import AddCategory from './Pages/Dashboard/AddCategory';
import UpdateCategory from './Pages/Dashboard/UpdateCategory';
import Products from './Pages/Dashboard/Products';
import AddProduct from './Pages/Dashboard/AddProduct';
import UpdateProduct from './Pages/Dashboard/UpdateProduct';
import Carts from './Pages/Dashboard/Carts';
import AssignedToDelivery from './Pages/Dashboard/AssignedToDelivery';
import DeliveryCarts from './Pages/Dashboard/DeliveryCarts';
import ProductsOfDelivery from './Pages/Dashboard/ProductsOfDelivery';
import EditUser from './Pages/Dashboard/EditUser';
import ProductsShow from './Pages/Website/ProductsShow';
import Ads from './Pages/Dashboard/Ads';
import AddAds from './Pages/Dashboard/AddAds';
import UpdateAds from './Pages/Dashboard/updateAds';
import Product from './Pages/Website/Product';
import Cart from './Pages/Website/Cart';
import MainPage from './Pages/Website/MainPage';


export default function App() {

return (
  <Routes>

    <Route path='/' element={<MainPage/>}/>
    <Route path='*' element={<Error404/>}/>
    <Route path='/403' element={<Error403/>}/>

    <Route path='/home' element={<HomePage/>}>
    <Route path='product/:id' element={<Product/>}/>
    <Route path=':category' element={<ProductsShow/>}/>
    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>

    <Route element={<AuthRequird allowedRole={[0,1,2,3]}/>}>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/dashboard' element={<Dashboard/>}>
      <Route element={<AuthRequird allowedRole={[0]}/>}>
      <Route path='users' element={<Users/>}/>
      <Route path='add/user' element={<AddUser/>}/>
      <Route path='users/:id' element={<UpdateUser/>}/>
      </Route>
      <Route element={<AuthRequird allowedRole={[0,3]}/>}>
      <Route path='categories' element={<Categories/>}/>
      <Route path='add/category' element={<AddCategory/>}/>
      <Route path='categories/:id' element={<UpdateCategory/>}/>
      </Route>
      <Route element={<AuthRequird allowedRole={[0,3]}/>}>
      <Route path='products' element={<Products/>}/>
      <Route path='add/product' element={<AddProduct/>}/>
      <Route path='products/:id' element={<UpdateProduct/>}/>
      </Route>
      <Route element={<AuthRequird allowedRole={[0,3]}/>}>
      <Route path='carts' element={<Carts/>}/>
      <Route path='carts/:id' element={<AssignedToDelivery/>}/>
      </Route>
      <Route element={<AuthRequird allowedRole={[0,2]}/>}>
      <Route path='delivery' element={<DeliveryCarts/>}/>
      <Route path='delivery/:id' element={<ProductsOfDelivery/>}/>
      </Route>
      <Route element={<AuthRequird allowedRole={[0,1,2,3]}/>}>
      <Route path='edit/user' element={<EditUser/>}/>
      <Route path='delivery/:id' element={<ProductsOfDelivery/>}/>
      </Route>
      <Route element={<AuthRequird allowedRole={[0,3]}/>}>
      <Route path='ads' element={<Ads/>}/>
      <Route path='add/ad' element={<AddAds/>}/>
      <Route path='ads/:id' element={<UpdateAds/>}/>
      </Route>
    </Route>
    </Route>
  </Routes>
    );
}
