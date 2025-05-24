import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

interface AccessControlProps extends React.PropsWithChildren {
  resource: string
}

/* RBAC
admin - create update delete read
operator - create read update 
member - read
import, export
*/

export const ROLE_USER: any = {
  admin: ['CAN_CREATE', 'CAN_UPDATE', 'CAN_DELETE', 'CAN_READ', 'CAN_EXPORT'],
  operator: ['CAN_READ', 'CAN_UPDATE', 'CAN_CREATE'],
  member: ['CAN_READ']
}

export const PERMISSION: never = {
  "/dashboard/action/create": 'CAN_CREATE',
  "/dashboard/action/update": 'CAN_UPDATE',
  "/dashboard/action/delete": 'CAN_DELETE',
  "/dashboard/action/read": 'CAN_READ',
  "/report/action/import": 'CAN_IMPORT',
}

function AccessControl({ children, resource }: AccessControlProps) {
  const role: any = useSelector((state: RootState) => state.app.user?.role);
  const cans = ROLE_USER[role] || [];

  if (!role) return null;

  if (!cans.includes(PERMISSION[resource])) return null;
  
  return children
}

export default AccessControl