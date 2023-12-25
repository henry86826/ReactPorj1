import axios from 'axios';
import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'

function Cart() {
  const { getCart, cartData, isLoading } = useOutletContext();
  // console.log('購物車資料',cartData);
  // console.log('購物車資料長度',cartData.length);
  console.log(isLoading);
  const [ loadingItems, setLoadingItems ] = useState([]);
  const removeCartItem = async(id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
      getCart();
      console.log('刪除品項成功', res);
    } catch (error) {
        console.log('刪除品項失敗', error);
    }
  }

  let updateCartItem = async(item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity
      }
    }
    try {
      setLoadingItems([...loadingItems, item.id]);
      const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`, data);
      getCart();
      setLoadingItems(loadingItems.filter((loadingObject) => { return loadingObject !== item.id }));
      console.log('更新品項成功', res);
    } catch (error) {
        setLoadingItems([...loadingItems, item.id]);
        console.log('更新品項失敗', error);
        setLoadingItems(loadingItems.filter((loadingObject) => { return loadingObject !== item.id }));
    }
  }
    return (
      <div className="container">
        {
          isLoading == true ? null : (
            Object.keys(cartData).length == 0
              ?(
                <div>購物車是空的，請添加商品</div>
              )
              :(
                  <div className="row justify-content-center">
                      <div className="col-md-6 bg-white py-5" style={{minHeight: 'calc(100vh - 56px - 76px)'}}>
                          <div className="d-flex justify-content-between">
                              <h2 className="mt-2">購物車明細</h2>
                          </div>
                          {cartData?.carts?.map((item) => {
                              return (
                              <div className="d-flex mt-4 bg-light" key={item.id}>
                                  <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" style={{width:' 120px', height: '120px', objectFit: 'cover'}} />
                                  <div className="w-100 p-3 position-relative">
                                      <button 
                                          type='button' 
                                          className="btn position-absolute" 
                                          style={{top: '10px', right: '16px'}}
                                          onClick={ () => removeCartItem(item.id) } 
                                      >
                                          <i className="bi bi-x-lg"></i>
                                      </button>
                                      <p className="mb-0 fw-bold">{item.product.title}</p>
                                      <p className="mb-1 text-muted" style={{fontSize: '14px'}}>{item.product.context}</p>
                                      <div className="d-flex justify-content-between align-items-center w-100">
                                          <div className="input-group w-50 align-items-center">
                                            <select name="" className='form-select' id=""
                                              disabled={loadingItems.includes(item.id)}
                                              value={item.qty}
                                              onChange={ (e) => updateCartItem( item, e.target.value * 1 )}
                                            >
                                              {[...(new Array(20))].map((_, index) => {
                                                  return(
                                                      <option key={index} value={index + 1}>{index + 1}</option>
                                                  )
                                              })}
                                            </select>
                                          </div>
                                          <p className="mb-0 ms-auto">NT$ {item.final_total}</p>
                                      </div>
                                  </div>
                              </div>   
                              )
                          })}
                          <table className="table mt-4 text-muted">
                          <tbody>
                              <tr>
                                  <th scope="row" className="border-0 px-0 font-weight-normal">總金額</th>
                                  <td className="text-end border-0 px-0">NT$24,000</td>
                              </tr>
                              <tr>
                                  <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">Lorem ipsum</th>
                                  <td className="text-end border-0 px-0 pt-0">NT$500</td>
                              </tr>
                          </tbody>
                          </table>
                          <div className="d-flex justify-content-between mt-4">
                              <p className="mb-0 h4 fw-bold">總金額</p>
                              <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
                          </div>
                          <Link to="/checkout" className="btn btn-dark w-100 mt-4 rounded-0 py-3">確認商品正確</Link>
                      </div>
                  </div>
                )
              )
        }
      </div>
    )
}
export default Cart;