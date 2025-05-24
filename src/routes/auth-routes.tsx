import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { PATH } from '../configs';
import { httpRequest } from '../services/initRequest';
import { setUser } from '../redux/app.slice';

export default function AuthRoutes({ children }: React.PropsWithChildren) {
  const dispatch = useDispatch();
  const [isAuthenticate, setIsAuthenticate] = React.useState(false);
  const access_token = window.localStorage.getItem('access_token');

  React.useEffect(() => {
    if (!access_token) return;

    async function getMe() {
      try {
         const data: any = await httpRequest('/api/auth', {
          method: 'POST'
        });
        const dataUser: any = data?.user.user.user;
        dispatch(setUser(dataUser));
        setIsAuthenticate(true);
      } catch (err) {
        console.log('getMe err: ', err)
      }
    }
    getMe();
  }, [access_token])

  if (!access_token) {
    return <Navigate to={PATH.LOGIN} />
  }

  if (!isAuthenticate) return null;

  return children;
}