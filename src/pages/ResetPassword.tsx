import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { TextLoader } from '../components/Loader';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import type { ResetPasswordPayloadProps } from '../constants/types';
import { joiResetPasswordValidationSchema } from '../hooks/validation';
import useAuthApis from '../services/authService';

import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [codes, setCodes] = useState(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const form = useForm<ResetPasswordPayloadProps>({
    resolver: joiResolver(joiResetPasswordValidationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: '',
    },
  });

  useEffect(() => {
    const errors = form.formState.errors;
    if (errors.password) {
      toast.error(errors.password.message as string);
    }
    if (errors.confirmPassword) {
      toast.error(errors.confirmPassword.message as string);
    }
    if (errors.token) {
      toast.error(errors.token.message as string);
    }
  }, [form.formState.errors]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    form.setValue('token', newCodes.join(''), { shouldValidate: true });
  };

  const { resetPassword } = useAuthApis();

  const { mutateAsync: resetPasswordMutation, isPending: loading } =
    useMutation({
      mutationFn: resetPassword,
    });

  const onSubmit = async (data: ResetPasswordPayloadProps) => {
    const payload = { ...data };
    try {
      const response = await resetPasswordMutation(payload);
      if (response) {
        toast.success(response.message);
        navigate('/login');
        form.reset();
        setShowPassword(false);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
        if (
          error?.response?.data?.message.includes(
            'Token not found or token has expired',
          )
        ) {
          navigate('/forgot-password');
          return;
        }
      } else {
        toast.error('An error occurred');
      }
    }
  };

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

        {/* Right Side: Form Card Content */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white">
          <Card className="border-0 shadow-none bg-transparent p-0">
            <CardHeader className="p-0 mb-6 text-center">
              <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
                Reset Password
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">Enter the 6-digit code sent to your email and your new password.</p>
            </CardHeader>
            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="flex gap-2 justify-center">
                    {codes.map((code, index) => (
                      <FormItem key={index}>
                        <FormControl>
                          <Input
                            ref={(el) => {
                              inputsRef.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="w-11 h-11 text-center text-xl border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                            value={code}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                          />
                        </FormControl>
                      </FormItem>
                    ))}
                  </div>

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-700">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              className="bg-slate-50/50 border-slate-200 h-9 text-sm pr-10"
                              placeholder="Enter new password"
                              {...field}
                            />
                            <span
                              onClick={handleShowPassword}
                              className="absolute right-3 top-2.5 cursor-pointer text-slate-400 hover:text-slate-600"
                            >
                              {showPassword ? <IoEye size={18} /> : <IoEyeOff size={18} />}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-700">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? 'text' : 'password'}
                              className="bg-slate-50/50 border-slate-200 h-9 text-sm pr-10"
                              placeholder="Confirm new password"
                              {...field}
                            />
                            <span
                              onClick={handleShowConfirmPassword}
                              className="absolute right-3 top-2.5 cursor-pointer text-slate-400 hover:text-slate-600"
                            >
                              {showConfirmPassword ? <IoEye size={18} /> : <IoEyeOff size={18} />}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <TextLoader className="text-white" text="Submitting..." />
                    ) : (
                      'Reset Password'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;