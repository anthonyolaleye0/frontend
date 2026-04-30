import { NavLink } from 'react-router-dom';
import type { AdminSidebarProps } from '../../../constants/types';

const AdminOverviewDropDown = ({ closeDrawer }: AdminSidebarProps) => {
  return (
    <div className="ml-6 flex flex-col gap-1 mt-2">
      <NavLink
        className={({ isActive }) =>
          [
            'py-1 px-2 rounded-md transition-colors',
            isActive ? 'bg-yellow-700 text-white' : 'hover:bg-yellow-600',
          ].join(' ')
        }
        to="/dashboard/admin/overview"
        onClick={() => closeDrawer?.()}
      >
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          [
            'py-1 px-2 rounded-md transition-colors',
            isActive ? 'bg-yellow-700 text-white' : 'hover:bg-yellow-600',
          ].join(' ')
        }
        to="/dashboard/admin/overview/profile"
        onClick={() => closeDrawer?.()}
      >
        My Profile
      </NavLink>
    </div>
  );
};

export default AdminOverviewDropDown;
