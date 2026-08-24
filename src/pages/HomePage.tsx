import CallToAction from '../components/HomePage/CallToAction';
import Features from '../components/HomePage/Features';
import FooterSection from '../components/HomePage/FooterSection';
import HowItWorks from '../components/HomePage/HowItWorks';
import Testimonials from '../components/HomePage/Testimonials';
import UseCasesSection from '../components/HomePage/UseCasesSection';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png';

const HomePage = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      
      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center px-4 py-8 md:py-12">
        
        {/* Unified Top Navigation Panel with Larger Logo on the Top-Left */}
        <div className="w-full max-w-5xl flex justify-between items-center mb-4 text-sm font-medium text-slate-600 px-2">
          
          {/* Left section: Increased Logo size + Page Jump Links */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('home')} 
              className="flex items-center focus:outline-none cursor-pointer"
            >
              <img src={logo} alt="Smart Tax Arena Logo" className="h-11 w-auto object-contain" />
            </button>
            <button onClick={() => scrollToSection('home')} className="hover:text-blue-600 transition-colors cursor-pointer hidden sm:inline-block">Home</button>
            <button onClick={() => scrollToSection('use-cases')} className="hover:text-blue-600 transition-colors cursor-pointer hidden md:inline-block">Use Cases</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-blue-600 transition-colors cursor-pointer hidden md:inline-block">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-600 transition-colors cursor-pointer hidden lg:inline-block">How it works</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-blue-600 transition-colors cursor-pointer hidden lg:inline-block">Testimonials</button>
            <button onClick={() => navigate('/contact-us')} className="hover:text-blue-600 transition-colors cursor-pointer hidden lg:inline-block">Contact</button>
          </div>

          {/* Right section: Support & About Us Links */}
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/support')} className="hover:text-blue-600 transition-colors cursor-pointer">Support</button>
            <button onClick={() => navigate('/about')} className="hover:text-blue-600 transition-colors cursor-pointer">About Us</button>
          </div>

        </div>

        {/* Main Split Container Card */}
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side: Branded Graphic Banner Image */}
          <div className="relative bg-slate-900 overflow-hidden flex items-center justify-center min-h-[380px] lg:min-h-[560px]">
            <img 
              src={smartTaxBanner} 
              alt="Smart Tax Arena Banner" 
              className="w-full h-full object-cover object-center absolute inset-0" 
            />
          </div>

          {/* Right Side: Hero Content & CTA Actions */}
          <div className="p-8 lg:p-12 flex flex-col justify-center bg-white text-center lg:text-left space-y-6">
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
              Your Intelligent <span className="text-blue-600">Tax Companion.</span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Empowering individuals, SMEs, and consultants in Nigeria with seamless automated tax compliance, calculations, and expert advisory solutions. Efficient. Secure. Seamless.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-medium px-8 py-3 rounded-xl transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-16 bg-white">
        <UseCasesSection />
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <Features />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <HowItWorks />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <Testimonials />
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-white">
        <CallToAction />
      </section>

      {/* Footer Section */}
      <section id="contact" className="bg-blue-950 text-white pt-16 pb-8">
        <FooterSection />
      </section>
    </div>
  );
};

export default HomePage;