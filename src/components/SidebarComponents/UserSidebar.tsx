import { CircleDollarSign, LayoutDashboard, User } from 'lucide-react';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import type { AdminSidebarProps } from '../../constants/types';
import { Button } from '../ui/button';
import UserDailyTipsDropDown from '../User/DropDownMenus/UserDailyTipsDropDown';
import UserDecidedCasesDropDown from '../User/DropDownMenus/UserDecidedCasesDropDown';
import UserTaxLawDropDown from '../User/DropDownMenus/UserTaxLawDropDown';

const UserSidebar = ({ closeDrawer }: AdminSidebarProps) => {
  // const [overviewToggle, setOverviewToggle] = useState(false);
  // const [usersMgtToggle, setUsersMgtToggle] = useState(false);

  // const handleOverviewToggle = () => {
  //   setOverviewToggle(!overviewToggle);
  // };

  // const handleUsersMgtToggle = () => {
  //   setUsersMgtToggle(!usersMgtToggle);
  // };
  const [taxLawToggle, setTaxLawToggle] = useState(false);
  const [decidedCasesToggle, setDecidedCasesToggle] = useState(false);
  const [dailyTipsToggle, setDailyTipsToggle] = useState(false);

  const handleTaxLawToggle = () => {
    setTaxLawToggle(!taxLawToggle);
  };

  const handleDecidedCasesToggle = () => {
    setDecidedCasesToggle(!decidedCasesToggle);
  };

  const handleDailyTipsToggle = () => {
    setDailyTipsToggle(!dailyTipsToggle);
  };

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

        <div>
          <Button
            className="cursor-pointer bg-teal text-black hover:bg-skyblue w-full px-4"
            onClick={handleTaxLawToggle}
          >
            <div className="grid grid-cols-[1fr_80px] w-full">
              <div className="flex items-center gap-1 text-start">
                <span>
                  <CircleDollarSign size={18} />
                </span>
                <span>Tax Laws</span>
              </div>{' '}
              {taxLawToggle ? (
                <IoIosArrowDown className="text-xl justify-self-end " />
              ) : (
                <IoIosArrowUp className="text-xl justify-self-end " />
              )}
            </div>
          </Button>
          {taxLawToggle && <UserTaxLawDropDown closeDrawer={closeDrawer} />}
        </div>

        <div>
          <Button
            className="cursor-pointer bg-teal text-black hover:bg-skyblue w-full px-4"
            onClick={handleDecidedCasesToggle}
          >
            <div className="grid grid-cols-[1fr_50px] w-full">
              <div className="flex items-center gap-1 text-start">
                <span>
                  <CircleDollarSign size={18} />
                </span>
                <span>Decided Cases</span>
              </div>{' '}
              {decidedCasesToggle ? (
                <IoIosArrowDown className="text-xl justify-self-end " />
              ) : (
                <IoIosArrowUp className="text-xl justify-self-end " />
              )}
            </div>
          </Button>
          {decidedCasesToggle && (
            <UserDecidedCasesDropDown closeDrawer={closeDrawer} />
          )}
        </div>

        <div>
          <Button
            className="cursor-pointer bg-teal text-black hover:bg-skyblue w-full px-4"
            onClick={handleDailyTipsToggle}
          >
            <div className="grid grid-cols-[1fr_50px] w-full">
              <div className="flex items-center gap-1 text-start">
                <span>
                  <CircleDollarSign size={18} />
                </span>
                <span>Daily Tips</span>
              </div>{' '}
              {dailyTipsToggle ? (
                <IoIosArrowDown className="text-xl justify-self-end " />
              ) : (
                <IoIosArrowUp className="text-xl justify-self-end " />
              )}
            </div>
          </Button>
          {dailyTipsToggle && (
            <UserDailyTipsDropDown closeDrawer={closeDrawer} />
          )}
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
