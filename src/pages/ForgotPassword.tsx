import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { IoMailOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png';
import { TextLoader } from '../components/Loader';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import type { LoginUserPayloadProps } from '../constants/types';
import { joiForgotValidationSchema } from '../hooks/validation';
import useAuthApis from '../services/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm<Omit<LoginUserPayloadProps, 'password'>>({
    resolver: joiResolver(joiForgotValidationSchema),
  });

  const { forgotPassword } = useAuthApis();

  const { mutateAsync: forgotPasswordMutation, isPending: loading } =
    useMutation({
      mutationFn: forgotPassword,
    });

  const onSubmit = async (data: Omit<LoginUserPayloadProps, 'password'>) => {
    try {
      const response = await forgotPasswordMutation(data);
      if (response) {
        toast.success(response.message || 'Password reset instructions sent!');
        form.reset();
        navigate('/reset-password');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'An error occurred.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 px-4 py-8">
      {/* Top Navigation Links */}
      <div className="w-full max-w-5xl flex justify-end items-center gap-6 mb-4 text-sm font-medium text-slate-600 px-2">
        <button onClick={() => navigate('/support')} className="hover:text-blue-600 transition-colors cursor-pointer">Support</button>
        <button onClick={() => navigate('/about')} className="hover:text-blue-600 transition-colors cursor-pointer">About Us</button>
      </div>

      {/* Main Split Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Branded Graphic Banner */}
        <div className="relative bg-slate-900 overflow-hidden flex items-center justify-center min-h-[440px] lg:min-h-[600px]">
          <img 
            src={smartTaxBanner} 
            alt="Smart Tax Arena Skyline Banner" 
            className="w-full h-full object-cover object-center absolute inset-0" 
          />
        </div>

        {/* Right Side: Forgot Password Form */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <img src={logo} alt="Logo Small" className="h-10 w-auto lg:hidden object-contain" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Forgot Password</h1>
            <p className="text-xs text-slate-500 mt-1">Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-slate-700">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <IoMailOutline size={16} />
                        </span>
                        <Input className="pl-9 bg-slate-50/50 border-slate-200 h-9 text-sm" placeholder="Enter your email" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[11px] text-rose-500" />
                  </FormItem>
                )}
              />

              {/* Navigation Links (Login / Register) */}
              <div className="flex justify-between items-center pt-1">
                <Link className="text-xs font-medium text-blue-600 hover:underline" to="/login">
                  Remember password? Sign In
                </Link>
                <Link className="text-xs font-medium text-blue-600 hover:underline" to="/register">
                  Don't have an account?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-1"
                disabled={loading}
              >
                {loading ? (
                  <TextLoader className="text-white" text="Submitting..." />
                ) : (
                  'Submit'
                )}
              </Button>

              {/* Email Verification Footer Link */}
              <div className="text-center pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Didn't receive email verification?{' '}
                  <Link
                    className="text-emerald-600 font-semibold hover:underline"
                    to="/request-email-verification"
                  >
                    Click Here
                  </Link>
                </p>
              </div>

            </form>
          </Form>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;