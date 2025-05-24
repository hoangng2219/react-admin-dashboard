import React from "react";
import { PATH, ROLE } from "../configs";
import { Route, Routes } from "react-router-dom"

import { Template1 } from "../layouts/template1";

import AuthRoutes from '../routes/auth-routes';
import GuestRoutes from "../routes/guest-routes";
import Spinner from "../components/spinner";
import RoleRoutes from "./role-routers";

const Dashboard = React.lazy(() => import('../pages/dashboard'));
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const ContactUs = React.lazy(() => import('../pages/contact-us'));
const LandingPage = React.lazy(() => import('../pages/landing-page'));
const EmployeeCreate = React.lazy(() => import('../pages/employee').then(module => ({ default: module.EmployeeCreate })));
const EmployeeList = React.lazy(() => import('../pages/employee').then(module => ({ default: module.EmployeeList })));
const EmployeeEdit = React.lazy(() => import('../pages/employee').then(module => ({ default: module.EmployeeEdit })));
const EmployeeShow = React.lazy(() => import('../pages/employee').then(module => ({ default: module.EmployeeShow })));

const routesConfig = [
  {
    path: PATH.ROOT,
    template: Template1,
    auth: AuthRoutes,
    component: Dashboard,
    requireRoles: [ROLE.ADMIN, ROLE.OPERATOR]
  },
  {
    path: PATH.LOGIN,
    auth: GuestRoutes,
    component: Login
  },
  {
    path: PATH.REGISTER,
    auth: GuestRoutes,
    component: Register
  },
  {
    path: PATH.CONTACT_US,
    component: ContactUs
  },
  {
    path: PATH.EMPLOYEE_LIST,
    component: EmployeeList,
    template: Template1,
    auth: AuthRoutes,
    requireRoles: [ROLE.ADMIN, ROLE.MEMBER, ROLE.OPERATOR]
  },
  {
    path: PATH.ACCESS_DENIED,
    component: () => <div>this access denied</div>
  },
]

function renderRoutes() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Routes>
        {routesConfig.map(route => {
          const Component = route.component;
          const Template = route?.template || React.Fragment;
          const Auth = route?.auth || React.Fragment;

          return (
            <Route 
              path={route.path}
              element={
                <Auth>
                  <Template>
                      <RoleRoutes requireRoles={route?.requireRoles || []}>
                        <Component />
                      </RoleRoutes>
                  </Template>
                </Auth>
              } 
            />
          )
        })}
      </Routes>
    </React.Suspense>
  )
}

export const MainRoutes = () => {
  return renderRoutes()
}