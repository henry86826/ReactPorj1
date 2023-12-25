import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useOutletContext } from 'react-router-dom';

import '../../stylesheet/Products.scss';
import '../../stylesheet/Navbar.scss';
import Pagination from '../../components/Pagination';

  
function Products() {
  const [products, setProducts] = useState([]);
  const [productsCopy, setProductsCopy] = useState([]);
  const [linkText, setLinkText] = useState();
  const [pagination, setPagination] = useState({});
  const [category, setCategory] = useState([]);
  const { getCart } = useOutletContext();
  // 分類陣列
  let cateData = ['全部','北部','南部','東部','中部'];
  console.log();
  const getProducts = async(page = 1) => {
    const produceRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
    const produceResData = produceRes.data.products;
    
    console.log(produceRes);

    const category = [...produceRes.data.products].reduce((a, b) => {
      if(a[`${b.category}`]){
        a[`${b.category}`]++
      }else{
        a[`${b.category}`] = 1
      }
      return a
    },{})
    setCategory(category);

    // 分類數量 values 取得 category 每個 keys 的 value，再用 reduce + unshift 將全部資料加總推到陣列最前
    // const cateData = Object.values(category);
    // cateData.unshift(cateData.reduce((a, b) => {
    //   return a + b
    // }))
    // console.log(cateData);

    // setCategory(cateData);
    console.log(category);
    setProducts(produceRes.data.products);
    setProductsCopy(produceRes.data.products);
    setPagination(produceRes.data.pagination);
  }


  useEffect(()=>{
    getProducts()
  },[])
  return (
    <>
      <div style={{paddingTop: '5rem'}}>
        <div className='categoryBar' style={{height:'13vh', backgroundColor:'rgba(103, 143, 116, 0.6)' , marginBottom:'3rem'}}>
            <ul className='cateList' style={{display:'flex', justifyContent:'center',alignItems:'center', height:'100%', width:'75%'}} >
            {cateData.map((e) => {
              console.log('eee',e)
              return (
                <>
                <p>{category[e]}</p>
                <li className="position-relative categoryList" key={e.id} style={{display:'flex', justifyContent:'center',alignItems:'center', width:'15%', padding:'0'}} >
                  <Link className='position-relative categoryText' style={{fontSize:'1.5rem'}}> { e } </Link>
                </li>
                </>
              )
            })}
            </ul>
        </div>
      <div className="row" style={{marginLeft:'5%',width:'90%'}}>
        {productsCopy.map((product)=>{
          return(
            <div className="col-md-3 ProductItme" key={product.id}>
              <Link className='LinkText' to={`/product/${product.id}`}>
                <div className="card border-0 mb-4 position-relative">
                  <img src={product.imageUrl} className="card-img-top rounded-10 object-cover" height={300} alt="..." />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">
                      {product.title}
                    </h4>
                    <p className="card-text text-muted mb-0">
                      {product.content}
                    </p>
                    <p className="text-muted mt-1">NT$ {product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
        
      </div>
      <nav className="d-flex justify-content-center">
        <Pagination pagination={pagination} changePage={getProducts}/>
      </nav>
    </div>
    </>
  )
}

export default Products