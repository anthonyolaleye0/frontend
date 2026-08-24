import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png';
import { CircularLoader } from '../components/Loader';
import { Card, CardContent } from '../components/ui/card';

const ReferralPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const host = import.meta.env.VITE_API_HOST;

  console.log('code:', code);

  useEffect(() => {
    if (code) {
      localStorage.setItem('refCode', code);
      window.location.href = `${host}/leads/ref?ref=${code}`;
    }
  }, [code, host]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 px-4 py-8">
      
      {/* Topmost Navigation Panel with Logo and Links */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-4 text-sm font-medium text-slate-600 px-2 border-0 shadow-none bg-transparent">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center focus:outline-none cursor-pointer"
        >
          <img src={logo} alt="Smart Tax Arena Logo" className="h-10 w-auto object-contain" />
        </button>

        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/support')} className="hover:text-blue-600 transition-colors cursor-pointer">Support</button>
          <button onClick={() => navigate('/about')} className="hover:text-blue-600 transition-colors cursor-pointer">About Us</button>
        </div>
      </div>

      {/* Main Split Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Branded Graphic Banner */}
        <div className="relative bg-slate-900 overflow-hidden flex items-center justify-center min-h-[440px] lg:min-h-[640px]">
          <img 
            src={smartTaxBanner} 
            alt="Smart Tax Arena Skyline Banner" 
            className="w-full h-full object-cover object-center absolute inset-0" 
          />
        </div>

        {/* Right Side: Redirect Loader Content */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white items-center text-center">
          <Card className="border-0 shadow-none bg-transparent p-0 w-full">
            <CardContent className="p-0 flex flex-col items-center justify-center min-h-[300px]">
              <CircularLoader text="Redirecting..." />
              <p className="text-xs text-slate-500 mt-4">Please wait while we direct you to your destination.</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ReferralPage;