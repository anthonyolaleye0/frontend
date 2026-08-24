import { 
  LayoutDashboard, 
  Users, 
  Scale, 
  BookOpen, 
  Lightbulb, 
  UserCircle, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { AdminSidebarProps } from '../../constants/types';
import DailyTipsDropDown from '../Admin/DropDownMenus/DailyTipsDropDown';
import DecidedCasesDropDown from '../Admin/DropDownMenus/DecidedCasesDropDown';
import TaxLawManagementDropDown from '../Admin/DropDownMenus/TaxLawManagementDropDown';
import { Button } from '../ui/button';

const AdminSidebar = ({ closeDrawer }: AdminSidebarProps) => {
  const [taxLawToggle, setTaxLawToggle] = useState(false);
  const [decidedCasesToggle, setDecidedCasesToggle] = useState(false);
  const [dailyTipsToggle, setDailyTipsToggle] = useState(false);

  return (
    <div className="flex flex-col gap-2 py-4 px-3 w-full text-slate-700">
      
      {/* Section Header */}
      <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Navigation
      </div>

      {/* Dashboard Link */}
      <NavLink
        to="/dashboard/admin/overview"
        onClick={() => closeDrawer?.()}
        className={({ isActive }) =>
          [
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
            isActive 
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          ].join(' ')
        }
      >
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>

      {/* Users Link */}
      <NavLink
        to="/dashboard/admin/users"
        onClick={() => closeDrawer?.()}
        className={({ isActive }) =>
          [
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
            isActive 
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          ].join(' ')
        }
      >
        <Users size={18} />
        <span>Users Management</span>
      </NavLink>

      {/* Section Divider */}
      <div className="pt-4 pb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Content Management
      </div>

      {/* Tax Laws Dropdown */}
      <div className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-between px-3 py-2.5 h-auto text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl cursor-pointer"
          onClick={() => setTaxLawToggle(!taxLawToggle)}
        >
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-slate-500" />
            <span>Tax Laws</span>
          </div>
          {taxLawToggle ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </Button>
        {taxLawToggle && (
          <div className="pl-3 pt-1">
            <TaxLawManagementDropDown closeDrawer={closeDrawer} />
          </div>
        )}
      </div>

      {/* Decided Cases Dropdown */}
      <div className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-between px-3 py-2.5 h-auto text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl cursor-pointer"
          onClick={() => setDecidedCasesToggle(!decidedCasesToggle)}
        >
          <div className="flex items-center gap-3">
            <Scale size={18} className="text-slate-500" />
            <span>Decided Cases</span>
          </div>
          {decidedCasesToggle ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </Button>
        {decidedCasesToggle && (
          <div className="pl-3 pt-1">
            <DecidedCasesDropDown closeDrawer={closeDrawer} />
          </div>
        )}
      </div>

      {/* Daily Tips Dropdown */}
      <div className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-between px-3 py-2.5 h-auto text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl cursor-pointer"
          onClick={() => setDailyTipsToggle(!dailyTipsToggle)}
        >
          <div className="flex items-center gap-3">
            <Lightbulb size={18} className="text-slate-500" />
            <span>Daily Tips</span>
          </div>
          {dailyTipsToggle ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </Button>
        {dailyTipsToggle && (
          <div className="pl-3 pt-1">
            <DailyTipsDropDown closeDrawer={closeDrawer} />
          </div>
        )}
      </div>

      {/* Section Divider */}
      <div className="pt-4 pb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Preferences
      </div>

      {/* My Profile Link */}
      <NavLink
        to="/dashboard/admin/profile"
        onClick={() => closeDrawer?.()}
        className={({ isActive }) =>
          [
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
            isActive 
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          ].join(' ')
        }
      >
        <UserCircle size={18} />
        <span>My Profile</span>
      </NavLink>

    </div>
  );
};

export default AdminSidebar;