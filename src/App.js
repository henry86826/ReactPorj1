import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupon from './pages/admin/AdminCoupon';

// 前端畫面
import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Products';
import ProductDetail from './pages/front/ProductDetail';
import ProductsByCate from './pages/front/ProductsByCate';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout';
import Success from './pages/front/Success';

import ScrollToTop from './components/ScrollToTop';

import {useEffect} from 'react';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayout />}>
            <Route path='' element={<Home />}></Route>
            <Route path='products' element={<Products />}></Route>
            <Route path='product/:id' element={<ProductDetail/>}></Route>
            {/* <Route path='products/:category' element={<ProductsByCate/>}></Route> */}
            <Route path='cart' element={<Cart/>}></Route>
            <Route path='checkout' element={<Checkout/>}></Route>
            <Route path='success/:orderId' element={<Success/>}></Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/admin' element={<Dashboard />}>
          {/* {products} */}
          <Route path='products' element={<AdminProducts/>}></Route>
          {/* {Coupons} */}
          <Route path='coupons' element={<AdminCoupon/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
