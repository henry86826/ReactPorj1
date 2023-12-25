import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from 'bootstrap'

import CouponModal from "../../components/CouponModal"
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
function AdminCoupon() {

  // 顯示產品列表 10/19
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});

  // 編輯產品資訊
  const [type, setType] = useState('create'); // edit
  const [tempCoupon, setTempCoupon] = useState({});

  // 呼叫 bootstrap modal 10/19
  const couponModal = useRef(null);
  const deleteModal = useRef(null);
  useEffect(()=>{
    // 控制 useRef 的 Modal 實體
    couponModal.current = new Modal('#productModal',{backdrop: 'static'});
    
    deleteModal.current = new Modal('#deleteModal',{backdrop: 'static'});
    getCoupons();
  }, [])

  const getCoupons = async(page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`);
    console.log(res);
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
    console.log('getting prodcuts');
  }

  // 打開&關閉 Modal
  // 透過變數將用來判斷是新增或編輯的 type 及 product set 到 type 跟 tempProduct
  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    couponModal.current.show();
  }

  const closeModal = () => {
    couponModal.current.hide();
  }

  const openDeleteModal = ( product ) => {
    setTempCoupon(product);
    deleteModal.current.show();
  }

  const closeDeleteModal = () => {
    console.log('delete close');
    deleteModal.current.hide();
  }

  const deleteCoupon = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`);
      console.log(res);
      if(res.data.success){
        console.log('成功刪除');
        getCoupons();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-3'>
      <CouponModal 
        closeModal={closeModal} 
        getCoupons={getCoupons}
        tempCoupon={tempCoupon}
        type={type}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id}
      />
      <h3>優惠券列表</h3>
      <hr />
      <div className='text-end'>
        <button type='button' className='btn btn-primary btn-sm' 
          onClick={() => openCouponModal('create', {})}>
          建立新優惠券
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>標題</th>
            <th scope='col'>折扣</th>
            <th scope='col'>到期日</th>
            <th scope='col'>優惠碼</th>
            <th scope='col'>啟用狀態</th>
            <th scope='col'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon)=>{
            return(
              <tr key={coupon.id}>
                <td>{coupon.title}</td>
                <td>{coupon.percent}</td>
                <td>{new Date(coupon.due_date).toDateString()}</td>
                <td>{coupon.code}</td>
                <td>{coupon.is_enabled ? '是': '否'} </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary btn-sm'
                    onClick={() => openCouponModal('edit', coupon)}
                  >
                    編輯
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm ms-2'
                    onClick={()=> openDeleteModal(coupon)}
                  >
                    刪除
                  </button>
                </td>
             </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination 
        pagination={pagination}
        changePage={getCoupons}
      />
      
    </div>
  );
}

export default AdminCoupon;