import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from 'bootstrap'

import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
function AdminProducts() {

  // 顯示產品列表 10/19
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  // 編輯產品資訊
  const [type, setType] = useState('create'); // edit
  const [tempProduct, setTempProduct] = useState({});

  // 呼叫 bootstrap modal 10/19
  const productModal = useRef(null);
  const deleteModal = useRef(null);
  useEffect(()=>{
    // 控制 useRef 的 Modal 實體
    productModal.current = new Modal('#productModal',{backdrop: 'static'});
    
    deleteModal.current = new Modal('#deleteModal',{backdrop: 'static'});
    getProducts();
  }, [])

  const getProducts = async(page = 1) => {
    const produceRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`);
    console.log(produceRes);
    setProducts(produceRes.data.products);
    setPagination(produceRes.data.pagination);
    console.log('getting prodcuts');
  }

  // 打開&關閉 Modal
  // 透過變數將用來判斷是新增或編輯的 type 及 product set 到 type 跟 tempProduct
  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  }

  const closeProductModal = () => {
    productModal.current.hide();
  }

  const openDeleteModal = ( product ) => {
    setTempProduct(product);
    deleteModal.current.show();
  }

  const closeDeleteModal = () => {
    console.log('delete close');
    deleteModal.current.hide();
  }

  const deleteProduct = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`);
      console.log(res);
      if(res.data.success){
        console.log('成功刪除');
        getProducts();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-3'>
      <ProductModal 
        closeProductModal={closeProductModal} 
        getProducts={getProducts}
        tempProduct={tempProduct}
        type={type}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={tempProduct.title}
        handleDelete={deleteProduct}
        id={tempProduct.id}
      />
      <h3>產品列表</h3>
      <hr />
      <div className='text-end'>
        <button type='button' className='btn btn-primary btn-sm' 
          onClick={() => openProductModal('create', {})}>
          建立新商品
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>分類</th>
            <th scope='col'>名稱</th>
            <th scope='col'>售價</th>
            <th scope='col'>啟用狀態</th>
            <th scope='col'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product)=>{
            return(
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? '是': '否'} </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary btn-sm'
                    onClick={() => openProductModal('edit', product)}
                  >
                    編輯
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm ms-2'
                    onClick={()=> openDeleteModal(product)}
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
        changePage={getProducts}
      />
      
    </div>
  );
}

export default AdminProducts;