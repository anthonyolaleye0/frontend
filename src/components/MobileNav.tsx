import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { UserState } from '../constants/types';
import useLogout from '../hooks/useLogout';
import AdminSidebar from './SidebarComponents/AdminSidebar';
import { Button } from './ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = useLogout();

  const closeDrawer = () => setOpen(false);
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {!open ? (
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="absolute top-3 right-3 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
      ) : (
        <SheetClose asChild>
          <Button
            variant="ghost"
            size="default"
            className="text-white relative cursor-pointer z-60 bg-transparent hover:bg-transparent"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </SheetClose>
      )}

      <SheetContent
        side="right"
        className="bg-blue-gray"
        showCloseButton={false}
      >
        <SheetHeader className="bg-white">
          <SheetTitle>Smart Tax Arena</SheetTitle>
        </SheetHeader>

        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </SheetClose>

        <div className="h-15">
          <div>
            {currentUser && currentUser !== null && (
              <div className=" h-full text-black flex flex-col items-start gap-1 pl-2 mt-6 overflow-y-auto">
                {currentUser?.role === 'admin' && (
                  <AdminSidebar closeDrawer={closeDrawer} />
                )}

                <div className="flex flex-col ml-10 gap-4 mt-4">
                  <div className=" rounded-lg ">
                    <motion.button
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      whileTap={{ y: -10 }}
                      className="cursor-pointer bg-transparent px-3.75 font-bold py-1.25 rounded-md hover:bg-navy-blue/25"
                      onClick={() => {
                        handleLogout();
                        closeDrawer();
                      }}
                    >
                      <div className="flex items-center gap-2 ">
                        <span className="text-red-500">LOGOUT</span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
