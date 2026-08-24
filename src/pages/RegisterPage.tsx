import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEye, IoEyeOff, IoMailOutline, IoLockClosedOutline, IoCallOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png'; // Import your exact banner image here

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
import type { RegisterUserPayloadProps } from '../constants/types';
import { joiRegisterValidationSchema } from '../hooks/validation';
import useAuthApis from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const form = useForm<RegisterUserPayloadProps>({
    resolver: joiResolver(joiRegisterValidationSchema, {
      abortEarly: false,
    }),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      whatsappPhoneNumber: '',
      password: '',
      confirmPassword: '',
      businessType: 'Individual',
    },
  });

  const { registerUser } = useAuthApis();

  const { mutateAsync: registerStudentMutation, isPending: loading } =
    useMutation({
      mutationFn: registerUser,
    });

  const onSubmit = async (data: RegisterUserPayloadProps) => {
    try {
      const response = await registerStudentMutation(data);
      if (response) {
        toast.success(response.message || 'Registration successful!');
        navigate('/email-verification');
        form.reset();
        setShowPassword(false);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Registration failed.');
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
        
        {/* Left Side: Exact City Skyline Branded Banner Image */}
        <div className="relative bg-slate-900 overflow-hidden flex items-center justify-center min-h-[440px] lg:min-h-[600px]">
          <img 
            src={smartTaxBanner} 
            alt="Smart Tax Arena Skyline Banner" 
            className="w-full h-full object-cover object-center absolute inset-0" 
          />
        </div>

        {/* Right Side: Registration Form */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <img src={logo} alt="Logo Small" className="h-10 w-auto lg:hidden object-contain" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create Your Account</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
              
              {/* First Name & Last Name Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700">First Name</FormLabel>
                      <FormControl>
                        <Input className="bg-slate-50/50 border-slate-200 h-9 text-sm" placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage className="text-[11px] text-rose-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700">Last Name</FormLabel>
                      <FormControl>
                        <Input className="bg-slate-50/50 border-slate-200 h-9 text-sm" placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage className="text-[11px] text-rose-500" />
                    </FormItem>
                  )}
                />
              </div>

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
                        <Input className="pl-9 bg-slate-50/50 border-slate-200 h-9 text-sm" placeholder="Email" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[11px] text-rose-500" />
                  </FormItem>
                )}
              />

              {/* WhatsApp Phone Number */}
              <FormField
                control={form.control}
                name="whatsappPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-slate-700">WhatsApp #:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400">
                          <IoCallOutline size={16} />
                        </span>
                        <Input className="pl-9 bg-slate-50/50 border-slate-200 h-9 text-sm" placeholder="+234 ___ ___ ____" {...field} />
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

              {/* Terms & Privacy Checkbox */}
              <div className="flex items-center space-x-2 pt-1">
                <input type="checkbox" id="terms" required className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-slate-600">
                  I agree to <span className="text-blue-600 font-medium">Terms & Privacy Policy</span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>

              {/* Footer Sign in navigation link */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Sign In
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

export default RegisterPage;