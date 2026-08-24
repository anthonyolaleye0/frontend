import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEye, IoEyeOff, IoMailOutline, IoLockClosedOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png';

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
import { joiLoginValidationSchema } from '../hooks/validation';
import { loginSuccess } from '../redux/authSlice';
import useAuthApis from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const form = useForm<LoginUserPayloadProps>({
    resolver: joiResolver(joiLoginValidationSchema),
    mode: 'onBlur',
  });

  const { loginUser } = useAuthApis();

  const { mutateAsync: loginUserMutation, isPending: loading } = useMutation({
    mutationFn: loginUser,
  });

  const onSubmit = async (data: LoginUserPayloadProps) => {
    try {
      const response = await loginUserMutation(data);

      if (response) {
        dispatch(loginSuccess(response?.data));
        toast.success(response?.message || 'Login successful!');
        
        switch (response?.data?.user?.role) {
          case 'user':
            navigate('/dashboard/user/overview');
            break;
          case 'admin':
            navigate('/dashboard/admin/overview');
            break;
          default:
            break;
        }
        form.reset();
        setShowPassword(false);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error?.response?.data?.message;
        toast.error(message || 'Login failed.');
        
        const shouldRedirect =
          typeof message === 'string'
            ? message.includes('Please verify your email to proceed')
            : Array.isArray(message)
              ? message.some((msg) =>
                  msg.includes('Please verify your email to proceed'),
                )
              : false;

        if (shouldRedirect) {
          navigate('/email-verification');
        }
        return;
      } else {
        toast.error('An unexpected error occurred. Please try again.');
        return;
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

        {/* Right Side: Login Form */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <img src={logo} alt="Logo Small" className="h-10 w-auto lg:hidden object-contain" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-xs text-slate-500 mt-1">Please enter your details to sign in.</p>
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-slate-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <IoLockClosedOutline size={16} />
                        </span>
                        <Input
                          className="pl-9 pr-9 bg-slate-50/50 border-slate-200 h-9 text-sm"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={handleShowPassword}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                          {showPassword ? <IoEye size={16} /> : <IoEyeOff size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[11px] text-rose-500" />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <div className="flex justify-end items-center pt-1">
                <Link className="text-xs font-medium text-blue-600 hover:underline" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-1"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </Button>

              {/* Register & Verification Navigation Footers */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                    Sign Up
                  </Link>
                </p>
                <p className="text-xs text-slate-500">
                  Didn't receive email verification?{' '}
                  <Link className="text-emerald-600 font-semibold hover:underline" to="/request-email-verification">
                    Resend Link
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

export default LoginPage;