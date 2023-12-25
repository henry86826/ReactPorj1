import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';

import '../../stylesheet/FrontLayout.css';


function FrontLayout() {
  console.log('useloca',useLocation().pathname);
  const info = useLocation()?.pathname;
  console.log('layout info',info);
  const [pathIsHome, setPathIsHome] = useState(true);
  const [cartData, setCartData] = useState({});
  // 購物車讀取效果
  const [ isLoading, setIsLoading ] = useState(false);
  const getCart = async() => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
      console.log('取得購物車資料', res);
      console.log('購物車 res',res);
      setCartData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log('取得購物車資料錯誤', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);
  // 1130 用 useLocation 判斷 pathname 來做 nav 不同樣式
  useEffect(()=>{
    if(info !== '/'){
      setPathIsHome(false);
    }else{
      setPathIsHome(true);
    }
  },[info])

  // 切換頁面到最頂端
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[info])

  return (
    <>
    <Navbar cartData={cartData} pathIsHome={pathIsHome} setPathIsHome={setPathIsHome}/>
    <Outlet context={{ getCart, cartData, isLoading }}/>
    <div className="bg-dark">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between text-white py-4">
          <p className="mb-0">此網站為練習使用，所有圖片皆來自 Unsplash</p>
          <br />
          <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
          
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossOrigin="anonymous"></script>
    </>
  )
}

export default FrontLayout