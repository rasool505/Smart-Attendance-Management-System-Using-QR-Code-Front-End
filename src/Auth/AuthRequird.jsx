import React from 'react'
import PropTypes from 'prop-types';
import Cookie from 'cookie-universal';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '@/Components/atom/Loading';

export default function AuthRequird({allowedRole}) {
    const cookie = Cookie();
    const token = cookie.get('accessToken');
    const userRole = cookie.get('userRole');

  return <React.Fragment>
    { token ?  userRole === '' ? <Loading/> : allowedRole.includes(userRole) ? <Outlet/> : <Navigate to={'/403'} replace={true}/> : <Navigate to={'/login'} replace={true}/>}
  </React.Fragment>
}
