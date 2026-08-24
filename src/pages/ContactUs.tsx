import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { IoPersonOutline, IoMailOutline, IoCallOutline, IoChatbubblesOutline } from 'react-icons/io5';

import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const ContactUs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Your message has been sent successfully! We will get back to you soon.');
      setFormData({ firstName: '', lastName: '', email: '', telephone: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 px-4 py-8">
      
      {/* Topmost Navigation Panel with Logo and Links */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-4 text-sm font-medium text-slate-600 px-2 border-0 shadow-none bg-transparent">
        
        {/* Left side: Clickable Logo */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center focus:outline-none cursor-pointer"
        >
          <img src={logo} alt="Smart Tax Arena Logo" className="h-10 w-auto object-contain" />
        </button>

        {/* Right side: Support & About Us Links */}
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

        {/* Right Side: Contact Form */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Get in Touch</h1>
            <p className="text-xs text-slate-500 mt-1">Have questions about tax compliance or advisory? We'd love to hear from you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* First Name & Last Name Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <IoPersonOutline size={15} />
                  </span>
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="pl-9 bg-slate-50/50 border-slate-200 h-9 text-sm" 
                    placeholder="First Name" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">
                    <IoPersonOutline size={15} />
                  </span>
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="pl-9 bg-slate-50/50 border-slate-200 h-9 text-sm" 
                    placeholder="Last Name" 
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">
                  <IoMailOutline size={15} />
                </span>
                <Input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-9 bg-slate-50/50 border-slate-200 h-9 text-sm" 
                  placeholder="name@example.com" 
                />
              </div>
            </div>

            {/* Telephone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Telephone Number</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">
                  <IoCallOutline size={15} />
                </span>
                <Input 
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="pl-9 bg-slate-50/50 border-slate-200 h-9 text-sm" 
                  placeholder="+234 ..." 
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">
                  <IoChatbubblesOutline size={15} />
                </span>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="pl-9 pt-2 bg-slate-50/50 border border-slate-200 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                  placeholder="Type your message here..." 
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2"
              disabled={loading}
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </Button>

            {/* Footer Navigation Link */}
            <div className="text-center pt-3">
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <Link className="text-blue-600 font-semibold hover:underline" to="/login">
                  Sign In
                </Link>
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;