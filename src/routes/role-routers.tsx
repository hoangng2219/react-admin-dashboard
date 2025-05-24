import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { PATH } from '../configs'

interface RoleRoutesProps extends React.PropsWithChildren {
  requireRoles: string[]
}

function RoleRoutes({ requireRoles, children }: RoleRoutesProps) {
  const roleUser = useSelector((state: RootState) => state.app.user?.role)

  React.useEffect(() => {
    if (!roleUser || requireRoles.length === 0) return;

    const isAccess = requireRoles.includes(roleUser);
    if (!isAccess) {
      window.location.href = PATH.ACCESS_DENIED
    }
  }, [roleUser, requireRoles])

  return (
    <>{children}</>
  )
}

export default RoleRoutes