import { Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { UserState } from '../constants/types';
import { roleRedirectMap } from '../hooks/functions';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

type NavItem = {
  id: string;
  label: string;
};
type Props = {
  navItems: NavItem[];
  handleNavClick: (id: string) => void;
};
const MobileNavbar = ({ navItems, handleNavClick }: Props) => {
  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const handlePortalLogin = () => {
    console.log('I want to run portal login');
    console.log('currentUser?.role:', currentUser?.role);

    const role = currentUser?.role;
    const route = role && roleRedirectMap[role];
    console.log('route:', route);

    if (!role || !route || route === undefined) {
      navigate('/login');
    } else {
      navigate(route);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-secondary">
        <SheetHeader className="bg-white">
          <SheetTitle>Kay Brooks</SheetTitle>
        </SheetHeader>

        <div className="lg:hidden absolute top-17.5 left-0 right-0 bg-(--glass-secondary) backdrop-blur-md text-white p-6 space-y-5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block cursor-pointer w-full text-left text-lg font-medium hover:text-(--color-secondary)"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-gray-600">
            <>
              <Button
                // onClick={() => navigate('/login')}
                onClick={handlePortalLogin}
                size="sm"
                className="bg-(--color-navy-blue) hover:bg-navy-blue/80 text-white"
              >
                Portal Login
              </Button>
            </>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
