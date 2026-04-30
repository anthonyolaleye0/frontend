import { LayoutDashboard, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { AdminSidebarProps } from '../../constants/types';

const UserSidebar = ({ closeDrawer }: AdminSidebarProps) => {
  // const [overviewToggle, setOverviewToggle] = useState(false);
  // const [usersMgtToggle, setUsersMgtToggle] = useState(false);

  // const handleOverviewToggle = () => {
  //   setOverviewToggle(!overviewToggle);
  // };

  // const handleUsersMgtToggle = () => {
  //   setUsersMgtToggle(!usersMgtToggle);
  // };

  return (
    <>
      <div className="flex flex-col ml-5 gap-2  hover:bg-skyblue">
        <div className="ml-6 flex flex-col mt-2 gap-1">
          <NavLink
            className={({ isActive }) =>
              [
                'py-1 px-1 rounded-md transition-colors text-black flex items-center gap-1',
                isActive ? 'bg-yellow-700 ' : 'hover:bg-yellow-600',
              ].join(' ')
            }
            to="/dashboard/user/overview"
            onClick={() => closeDrawer?.()}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
        </div>

        <div className="ml-6 flex flex-col mt-2 gap-1">
          <NavLink
            className={({ isActive }) =>
              [
                'py-1 px-1 rounded-md transition-colors text-black flex items-center gap-1',
                isActive ? 'bg-yellow-700 ' : 'hover:bg-yellow-600',
              ].join(' ')
            }
            to="/dashboard/user/profile"
            onClick={() => closeDrawer?.()}
          >
            <User size={18} />
            My Profile
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
