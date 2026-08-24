import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png';
import { Button } from '../components/ui/button';
import { Form, FormControl, FormItem } from '../components/ui/form';
import { Input } from '../components/ui/input';
import useAuthApis from '../services/authService';

type OtpFormValues = {
  code: string;
};

const EmailVerification = () => {
  const { emailVerification } = useAuthApis();
  const navigate = useNavigate();

  const form = useForm<OtpFormValues>();

  const [codes, setCodes] = useState(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const { mutateAsync: emailVerificationMutation, isPending: loading } =
    useMutation({
      mutationFn: emailVerification,
    });

  const sendCode = codes.join('');

  const onSubmit = async () => {
    try {
      if (!sendCode) {
        toast.error('Verification token is required');
        return;
      }

      if (sendCode.length < 6) {
        toast.error(
          `You are supposed to provide 6 digit but you are providing ${sendCode.length}`
        );
        return;
      }

      const response = await emailVerificationMutation(sendCode);
      if (response) {
        toast.success(response?.message || 'Email verified successfully!');
        navigate('/login');
        form.reset();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Verification failed.');
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

        {/* Right Side: Verification Form */}
        <div className="p-6 lg:p-10 flex flex-col justify-center bg-white">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <img src={logo} alt="Logo Small" className="h-10 w-auto lg:hidden object-contain" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Email Verification</h1>
            <p className="text-xs text-slate-500 mt-1">Enter the 6-digit token sent to your email address.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="flex flex-col items-center space-y-3">
                <p className="text-xs font-semibold text-slate-700">Verification Token</p>
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
                          className="w-11 h-11 text-center text-lg bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={code}
                          onChange={(e) => handleChange(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>

              {/* Footer / Resend Link */}
              <div className="text-center pt-4 border-t border-slate-100 space-y-2">
                <p className="text-xs text-slate-500">
                  Didn't receive email verification?{' '}
                  <Link
                    className="text-emerald-600 font-semibold hover:underline"
                    to="/request-email-verification"
                  >
                    Click Here
                  </Link>
                </p>
                <p className="text-xs text-slate-500">
                  Remember your password?{' '}
                  <Link className="text-blue-600 font-semibold hover:underline" to="/login">
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

export default EmailVerification;