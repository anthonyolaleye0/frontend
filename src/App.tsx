import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomeNavbar from './components/HomeNavbar';
import FooterSection from './components/HomePage/FooterSection';
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import Sidebar from './components/Sidebar';
import type { UserState } from './constants/types';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/dashboard/admin/overview/AdminDashboard';
import AdminProfile from './pages/dashboard/admin/overview/AdminProfile';
import ChapterPage from './pages/dashboard/admin/taxLaws/ChapterPage';
import SchedulePage from './pages/dashboard/admin/taxLaws/SchedulePage';
import SectionPage from './pages/dashboard/admin/taxLaws/SectionPage';
import SingleTaxLaw from './pages/dashboard/admin/taxLaws/SingleTaxLaw';
import TaxLaws from './pages/dashboard/admin/taxLaws/TaxLaws';
import SingleUserPage from './pages/dashboard/admin/users/SingleUserPage';
import Users from './pages/dashboard/admin/users/Users';
import UserDashboard from './pages/dashboard/user/overview/UserDashboard';
import UserProfile from './pages/dashboard/user/overview/UserProfile';
import EmailVerification from './pages/EmailVerification';
import Faq from './pages/Faq';
import ForgotPassword from './pages/ForgotPassword';
import HelpCenter from './pages/HelpCenter';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReferralPage from './pages/ReferralPage';
import RegisterPage from './pages/RegisterPage';
import RequestEmailVerification from './pages/RequestEmailVerification';
import ResetPassword from './pages/ResetPassword';
import Services from './pages/Services';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const handleSideToggle = () => {
    setSideToggle(!sideToggle);
  };

  const location = useLocation();

  const useHomeNavbarRoutes = ['/privacy-policy', '/terms', '/faq'];

  const hideNavbaRoutes = [
    '/',
    '/login',
    '/request-email-verification',
    '/email-verification',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/privacy-policy',
    '/terms',
    '/faq',
  ];

  const hideNavbar = hideNavbaRoutes.includes(location.pathname);
  const useHomeNavbar = useHomeNavbarRoutes.includes(location.pathname);
  const hideSidebarRoutes = ['/'];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar handleSideToggle={handleSideToggle} />}
      {useHomeNavbar && <HomeNavbar />}
      <div className="flex h-screen">
        {currentUser && !hideSidebar && <Sidebar sideToggle={sideToggle} />}
        <div className="grow overflow-y-auto">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicRoutes />}>
              <Route element={<LoginPage />} path="/login" />
              <Route element={<RegisterPage />} path="/register" />
              <Route
                element={<RequestEmailVerification />}
                path="/request-email-verification"
              />
              <Route
                element={<EmailVerification />}
                path="/email-verification"
              />
              <Route element={<ForgotPassword />} path="/forgot-password" />
              <Route element={<ResetPassword />} path="/reset-password" />
              <Route element={<ReferralPage />} path="/ref/:code" />
            </Route>

            {/* PROTECTED ROUTES */}
            {/* USER */}
            <Route element={<ProtectedRoutes allowedRoles={['user']} />}>
              <Route element={<UserProfile />} path="/dashboard/user/profile" />

              <Route
                element={<UserDashboard />}
                path="/dashboard/user/overview"
              />
            </Route>

            {/* ADMIN */}
            <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
              {/* ADMIN */}
              <Route
                element={<AdminProfile />}
                path="/dashboard/admin/profile"
              />

              <Route
                element={<ChapterPage />}
                path="/dashboard/admin/tax-laws/:taxLawId/chapters/:chapterId"
              />

              <Route
                element={<SectionPage />}
                path="/dashboard/admin/tax-laws/:taxLawId/chapters/:chapterId/section/:sectionId"
              />

              <Route
                element={<SchedulePage />}
                path="/dashboard/admin/tax-laws/:taxLawId/schedules/:scheduleId"
              />

              <Route element={<TaxLaws />} path="/dashboard/admin/tax-laws" />
              <Route
                element={<SingleTaxLaw />}
                path="/dashboard/admin/tax-laws/:taxLawId"
              />

              <Route
                element={<AdminDashboard />}
                path="/dashboard/admin/overview"
              />

              <Route element={<Users />} path="/dashboard/admin/users" />
              <Route
                element={<SingleUserPage />}
                path="/dashboard/admin/users/:userId"
              />
              {/* <Route element={<Payments />} path="/dashboard/admin/payments" />  */}
            </Route>

            <Route element={<TermsAndConditions />} path="/terms" />
            <Route element={<PrivacyPolicy />} path="/privacy-policy" />
            <Route element={<HelpCenter />} path="/help" />
            <Route element={<Faq />} path="/faq" />
            <Route element={<ContactUs />} path="/contact-us" />
            <Route element={<Services />} path="/services" />
            <Route element={<HomePage />} path="/" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </div>
      </div>
      {useHomeNavbar && <FooterSection />}
    </>
  );
}

export default App;
