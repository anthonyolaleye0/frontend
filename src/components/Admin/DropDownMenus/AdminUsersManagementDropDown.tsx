import { NavLink } from 'react-router-dom';
import type { AdminSidebarProps } from '../../../constants/types';

const AdminUsersManagementDropDown = ({ closeDrawer }: AdminSidebarProps) => {
  return (
    <div className="flex flex-col ml-6 gap-1 mt-2">
      <NavLink
        className={({ isActive }) =>
          [
            'py-1 px-2 rounded-md transition-colors',
            isActive ? 'bg-yellow-700 text-white' : 'hover:bg-yellow-600',
          ].join(' ')
        }
        to="/dashboard/admin/senders"
        onClick={() => closeDrawer?.()}
      >
        Senders
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          [
            'py-1 px-2 rounded-md transition-colors',
            isActive ? 'bg-yellow-700 text-white' : 'hover:bg-yellow-600',
          ].join(' ')
        }
        to="/dashboard/admin/riders"
        onClick={() => closeDrawer?.()}
      >
        Riders
      </NavLink>
      {/* <NavLink to="/dashboard/admin/buyers">Buyers</NavLink> */}
    </div>
  );
};

export default AdminUsersManagementDropDown;
