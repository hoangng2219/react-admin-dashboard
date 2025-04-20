import React from 'react';
import { Navigate } from 'react-router-dom';
import { PATH } from '../configs';

export default function AuthRoutes({ children }: React.PropsWithChildren) {
  const access_token = window.localStorage.getItem('access_token');

  if (!access_token) {
    return <Navigate to={PATH.LOGIN} />
  }

  return children;
}