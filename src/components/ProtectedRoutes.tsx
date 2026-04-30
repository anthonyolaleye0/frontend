import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { UserState } from '../constants/types';
import { formattedUserRoleForURL } from '../hooks/functions';

type ProtectedRoutesProps = {
  children?: React.ReactNode;
  allowedRoles: string[];
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  children,
  allowedRoles,
}) => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  if (!currentUser || currentUser === null) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role.toLowerCase())) {
    console.log('role check:', currentUser.role);
    return (
      <Navigate
        to={`/dashboard/${formattedUserRoleForURL(currentUser.role)}/profile`}
        replace
      />
    );
  }

  return <div>{children ? children : <Outlet />}</div>;
};

export default ProtectedRoutes;
