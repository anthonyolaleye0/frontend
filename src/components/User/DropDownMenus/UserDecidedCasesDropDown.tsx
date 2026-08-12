import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { AdminSidebarProps } from '../../../constants/types';

const UserDecidedCasesDropDown = ({ closeDrawer }: AdminSidebarProps) => {
  return (
    <div className="flex flex-col ml-6 gap-1 mt-2">
      <NavLink
        className={({ isActive }) =>
          [
            'py-1 rounded-md transition-colors flex gap-1 items-center',
            isActive ? 'bg-yellow-700 text-white' : 'hover:bg-yellow-600',
          ].join(' ')
        }
        to="/dashboard/user/decided-cases"
        onClick={() => closeDrawer?.()}
      >
        <ArrowRight size={18} />
        Decided Cases
      </NavLink>
    </div>
  );
};

export default UserDecidedCasesDropDown;
