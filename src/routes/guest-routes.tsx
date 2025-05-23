import React from 'react';
import { Navigate } from 'react-router-dom';
import { PATH } from '../configs';

export default function GuestRoutes({ children }: React.PropsWithChildren) {
  const access_token = window.localStorage.getItem('access_token');

  if (access_token) {
    return <Navigate to={PATH.ROOT} />
  }

  return children;
}