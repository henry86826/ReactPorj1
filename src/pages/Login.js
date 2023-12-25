import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigation = useNavigate();
  const [data, setData] = useState({
    username:'qqqq123@fakemail.com',
    password:'@#$wsxcde'
  });
  
  const [loginState, setLoginState] = useState({});

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setData({...data,[name]: value});
  }

  const submit = async(e) => {
    try {
      const res = await axios.post(`/v2/admin/signin`, data);
      // cookie 設定 > 取得 token
      const { token, expired } = res.data;
      // cookie 設定 > 儲存 token from MDN
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
  
      // 畫面跳轉判斷
      if(res.data.success)
      navigation('/admin/products');
    } 
    catch (error) {
     console.log(error);
     setLoginState(error.response.data);
    }
  }
  
  // 取得產品列表 移到 AdminProducts 內 10/18
  // useEffect(()=>{
  //   (async()=>{
  //     // cookie 設定 > 取出 token from MDN
  //     const token = document.cookie
  //       .split(';')
  //       .find((row) => row.startsWith('hexToken='))
  //       ?.split('=')[1];
  //     // 使用 axios 預設值將 token 補上
  //     axios.defaults.headers.common['Authorization'] = token;

  //     const produceRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`);
  //     console.log(produceRes);
  //   })()
  // }, [])

  return (<div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>登入帳號</h2>

        <div className={`alert alert-danger ${loginState.message ? 'd-block' : 'd-none'}`} role="alert">
          {loginState.message}
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label w-100">
            Email
            <input id="email" className="form-control" name="username" type="email" placeholder="Email Address" onChange={handleChange}  defaultValue={data.username}/>
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label w-100">
            密碼
            <input type="password" className="form-control"  name="password" id="password" placeholder="name@example.com" onChange={handleChange} defaultValue={data.password}/>
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={submit}>登入</button>
      </div>
    </div>
  </div>)
}

export default Login;