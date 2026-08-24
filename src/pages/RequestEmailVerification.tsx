import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import logo from '../assets/images/smartTaxApp-removebg.png';
import smartTaxBanner from '../assets/images/smartTaxBanner.png';
import { TextLoader } from '../components/Loader';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
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
import type { LoginUserPayloadProps } from '../constants/types';
import { joiForgotValidationSchema } from '../hooks/validation';
import useAuthApis from '../services/authService';

const RequestEmailVerification = () => {
  const navigate = useNavigate();

  const form = useForm<Omit<LoginUserPayloadProps, 'password'>>({
    resolver: joiResolver(joiForgotValidationSchema),
  });

  const { requestEmailVerification } = useAuthApis();

  const { mutateAsync: requestEmailVerificationMutation, isPending: loading } =
    useMutation({
      mutationFn: requestEmailVerification,
    });

  const onSubmit = async (data: Omit<LoginUserPayloadProps, 'password'>) => {
    try {
      const response = await requestEmailVerificationMutation(data);
      if (response) {
        toast.success(response.message);
        form.reset();
        navigate('/email-verification');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
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
                Request Email Verification
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">Enter your registered email address to receive a verification code.</p>
            </CardHeader>
            <CardContent className="p-0">
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
                          <Input 
                            placeholder="Enter your email." 
                            className="bg-slate-50/50 border-slate-200 h-9 text-sm"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between items-center text-xs">
                    <Link className="text-blue-600 hover:underline font-medium" to="/login">
                      Have account?
                    </Link>
                    <Link className="text-blue-600 hover:underline font-medium" to="/register">
                      Don't have account?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <TextLoader className="text-white" text="Submitting..." />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-2 p-0 pt-6">
              <p className="text-xs text-slate-500">
                Received email verification token?{' '}
                <Link className="text-green-600 font-semibold hover:underline" to="/email-verification">
                  Click Here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default RequestEmailVerification;