import { useSelector } from 'react-redux';
import type { SidebarComponentsProps, UserState } from '../constants/types';
import AdminSidebar from './SidebarComponents/AdminSidebar';
import UserSidebar from './SidebarComponents/UserSidebar';

const Sidebar = ({ sideToggle }: SidebarComponentsProps) => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  return (
    <div
      className={[
        sideToggle ? 'w-0' : 'min-w-55',
        'bg-blue-gray pt-10 border-r h-full border-r-gray-700 relative bottom-0 mb-32 transition-all duration-300 hidden md:flex overflow-y-auto',
      ].join(' ')}
    >
      {currentUser?.role === 'admin' && <AdminSidebar />}
      {currentUser?.role === 'user' && <UserSidebar />}
    </div>
  );
};

export default Sidebar;
