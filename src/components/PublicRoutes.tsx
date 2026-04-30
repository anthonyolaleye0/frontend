import { useSelector } from 'react-redux';
import type { UserState } from '../constants/types';
import { Outlet, Navigate } from 'react-router-dom';
import { roleRedirectMap } from '../hooks/functions';

const PublicRoutes = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const redirectPath = currentUser?.role
    ? roleRedirectMap[currentUser.role] || '/'
    : null;
  return (
    <div>{redirectPath ? <Navigate to={redirectPath} /> : <Outlet />}</div>
  );
};

export default PublicRoutes;
