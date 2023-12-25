import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

import '../stylesheet/Navbar.scss'
function Navbar({cartData, pathIsHome, setPathIsHome}) {
  console.log('pathIsHome',pathIsHome);
  return (
    <div className="navHead" style={{position: 'absolute', width:'100%', height:'20vh'}}>
      <div className="container" style={{width:'100vw', height:'100%'}}>
        <nav className="navbar px-0 navbar-expand-lg">
          <div className="d-flex" style={{width: '100%',marginTop:'0.5rem'}}>
          <NavLink className="navbar-brand" to="/"
            style={{ top:' 50%', fontWeight:'650'}}>
            <img src="photos/Group1.png" width={'5%'} height={'100%'} alt="" />
            萬里路指南
          </NavLink>
            <div className="collapse navbar-collapse  custom-header-md-open" id="navbarNav" style={{marginRight:'0',marginTop:'0', justifyContent: 'end'}}>
              <ul className="navbar-nav w-30" style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', marginRight:'0'}}>
                <li className="nav-item active">
                  {/* <a className="nav-link ps-0" href="./product.html">Lorem ipsum</a> */}
                  <NavLink className="nav-link navbar" to='/products' style={ pathIsHome ? {margin:'0 auto', justifyContent: 'center', fontWeight:'550', color:'white'} :{margin:'0 auto', justifyContent: 'center', color:'black', fontWeight:'550'}}> 產品列表</NavLink>
                </li>
              </ul>
            </div>
            <NavLink className="nav-link position-relative" to='/cart'style={{marginTop:'0.2rem'}} >
              <i className="bi bi-bag-fill" style={pathIsHome ? {fontSize: '1.25rem', color:'white'} : {fontSize: '1.25rem', color:'black'}} ></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style={{fontSize: '10px'}}>
                {cartData?.carts?.length}
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar