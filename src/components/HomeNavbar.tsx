import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../assets/images/smartTaxApp-removebg.png';
import type { UserState } from '../constants/types';
import { roleRedirectMap } from '../hooks/functions';
import MobileNavbar from './MobileNavbar';
import { Button } from './ui/button';

const HomeNavbar = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        const id = visible[0].target.id;
        setActiveSection(id);
      }
    }, options);

    navItems.forEach((item) => {
      if (!item.id) return;
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  const handleNavClick = (id: string) => {
    if (id === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('');
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
          }
        }, 500);
      }
    }
  };

  const handleGetStarted = () => {
    console.log('I want to run portal login');
    console.log('currentUser?.role:', currentUser?.role);

    const role = currentUser?.role;
    const route = role && roleRedirectMap[role];
    console.log('route:', route);

    if (!role || !route || route === undefined) {
      navigate('/login');
    } else if (!roleRedirectMap[role]) {
      toast.error(`${currentUser?.role} is an invalid role.`);
      return;
    } else {
      console.log('I want to navigate to the dashboard');
      navigate(route);
    }
  };

  const headerStyle: React.CSSProperties = {
    height: '70px',
    backgroundColor: isScrolled
      ? 'var(--glass-secondary)'
      : 'var(--glass-secondary)',
    backdropFilter: isScrolled ? 'blur(10px) saturate(150%)' : undefined,
    WebkitBackdropFilter: isScrolled ? 'blur(10px) saturate(150%)' : undefined,
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-b-md

      `}
      style={headerStyle}
    >
      <div className="h-full text-white flex justify-between items-center px-5 max-w-7xl mx-auto">
        {/* LOGO */}
        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => navigate('/')}
          transition={{ duration: 0.2 }}
          className="font-bold text-lg cursor-pointer tracking-wide text-secondary"
        >
          <img src={logo} alt="logo" className="h-25" />
        </motion.button>

        {/* NAVIGATION */}
        <div className="flex items-center gap-5">
          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => handleNavClick(item.id)}
                transition={{ duration: 0.2 }}
                className={`relative cursor-pointer py-1 text-[13px] transition-colors hover:text-navy-blue ${
                  activeSection === item.id
                    ? 'text-navy-blue-foreground'
                    : 'text-gray-50'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 bottom-0 h-0.5 w-full bg-(--color-navy-blue)"
                  />
                )}
              </motion.button>
            ))}
          </motion.nav>

          {/* CTA BUTTON */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleGetStarted}
              size="xs"
              className="bg-(--color-navy-blue) cursor-pointer hover:bg-navy-blue/80 text-white"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <MobileNavbar navItems={navItems} handleNavClick={handleNavClick} />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default HomeNavbar;
