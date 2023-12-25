import React, { useEffect, useState, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios';

// Sass 樣式
import '../../stylesheet/Home.scss'

// Swiper 套件
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Mousewheel } from 'swiper/modules';

function Home({navStyle, setNavStyle}) {

  const [products, setProducts] = useState([]);
  const getProducts = async(page = 1) => {
    const produceRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
    console.log(produceRes);
    setProducts(produceRes.data.products);
  }
  console.log(products);
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <>
      
      <div className="homepage" style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <div style={{width:'50%', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <h1>
            探索美麗台灣<br />
            －來場深度旅遊
          </h1>
          <button className='NavLink' style={{backgroundColor:'rgba(52, 140, 49, 0.8)', width:'40%', height:'8%', borderRadius:'0.5rem', borderStyle:'none'}}>
            <NavLink style={{textDecoration:'none', color:"white"}} > 現在開始</NavLink>
          </button>
        </div>
        <div className="row " style={{backgroundSize:'cover',backgroundImage: `url(https://images.unsplash.com/photo-1583395145517-1e3177037600?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,width:'50%', height:'100vh'}}>
        </div>
      </div>
      <div className='introduction'>
        <div className="partOne" style={{width:'100%',height:'60vh', display:'flex', flexDirection:'row', marginTop:'2rem'}}>
          <div className='left' style={{width:'50%', backgroundColor:'', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img style={{objectFit:'cover', width:'80%', height:'90%', marginTop:'2.5%', border:'1px solid', borderRadius:'5px'}} src="https://images.unsplash.com/photo-1598893725512-04a8d70d3e3a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className='right' style={{width:'50%', backgroundColor:'', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <h3>
              台灣不一樣的美，等你探索發現
            </h3>
          </div>
        </div>
        <div className="partTwo" style={{width:'100%',height:'60vh', display:'flex', flexDirection:'row', marginTop:'2rem'}}>
          <div className='left' style={{width:'50%', backgroundColor:'', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <h3>
              專人規劃行程。
            </h3>
            <br />
            <h5>
              我們的行程都是由專人規畫，不再煩惱交通住宿問題
            </h5>
          </div>
          <div className='right' style={{width:'50%', backgroundColor:'', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img style={{objectFit:'cover', width:'80%', height:'90%', marginTop:'2.5%', border:'1px solid', borderRadius:'5px'}} src="https://images.unsplash.com/photo-1610244767159-0f9797ff1926?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
      </div>
      <div className='SwiperIntro'>
        <h1>
          滾動查看我們的行程方案
        </h1>  
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        mousewheel={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 180,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Navigation, Pagination, Mousewheel]}
        className="mySwiper"
        style={{margin:'3rem 0', height:'60vh', "--swiper-pagination-color": "#889F8B", "--swiper-navigation-color": "#889F8B", '--data-swiper-zoom':'3'}}
        navigation={true}
      >
        {products.map((e) => {
          return(
            <SwiperSlide className='Link sliderItemText' key={e.id} style={{height:'100%',width:'500px', position:'relative'}}>
              <Link className='sliderItemText' style={{textDecoration:'none'}} to={`/product/${e.id}`}>
                <img style={{position:'relative', objectFit:'cover', backgroundPosition:'center', backgroundSize:'cover', width:'100%', height:'80%', display:'block'}} src={e.imageUrl} alt="" />
                
                <p className='sliderItemText' style={{height:'20%'}}>{e.title} <br />$NT{e.price}</p>
              </Link>
            </SwiperSlide>
          )
        })}
        {/* <SwiperSlide style={{width:'500px'}}>
          <NavLink>
            <img style={{backgroundPosition:'center',backgroundSize:'cover', width:'100%', height:'100%', display:'block'}} src="https://images.unsplash.com/photo-1583395145517-1e3177037600?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </NavLink>
        </SwiperSlide>
        <SwiperSlide style={{width:'500px'}}>
          <img style={{backgroundPosition:'center',backgroundSize:'cover', width:'100%', height:'100%', display:'block'}} src="https://images.unsplash.com/photo-1598893725512-04a8d70d3e3a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide style={{width:'500px'}}>
          <img style={{backgroundPosition:'center',backgroundSize:'cover', width:'100%', height:'100%', display:'block'}} src="https://images.unsplash.com/photo-1598893725512-04a8d70d3e3a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide style={{width:'500px'}}>
          <img style={{backgroundPosition:'center',backgroundSize:'cover', width:'100%', height:'100%', display:'block'}} src="https://images.unsplash.com/photo-1598893725512-04a8d70d3e3a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide> */}
      </Swiper>
    </>
  )
}

export default Home