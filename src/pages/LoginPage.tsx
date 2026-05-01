import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../assets/images/smartTaxApp-removebg.png';
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
import { joiLoginValidationSchema } from '../hooks/validation';
import { loginSuccess } from '../redux/authSlice';
import useAuthApis from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

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
      console.log('response:', response);

      console.log('I am running here');

      if (response) {
        dispatch(loginSuccess(response?.data));

        console.log('response:', response);
        console.log('response.data.user.role:', response?.data?.user?.role);
        toast.success(response?.message);
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
        console.log(typeof error?.response?.data?.message);
        console.log(error?.response?.data);

        const message = error?.response?.data?.message;
        toast.error(error?.response?.data?.message || 'Login failed.');
        console.error(error.response.data);
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
        console.error('An Error occurred:', error);
        toast.error('An error occurred');
        return;
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-14">
      <p className=" pt-[-200px]">
        <img src={logo} alt="" className="h-32 w-32" />
      </p>

      <Card className="w-100 md:w-125 mt-1">
        <CardHeader>
          <CardTitle className="text-xl text-center -my-2.5">
            Welcome back
          </CardTitle>
          <CardTitle className="text-center text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <span
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3 top-3 cursor-pointer text-gray-500"
                        >
                          {showPassword ? <IoEye /> : <IoEyeOff />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center">
                <Link className="text-sm text-blue-600" to="/forgot-password">
                  Forgot Password?
                </Link>
                <Link className="text-sm text-blue-600" to="/register">
                  Don't have account?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-navy-blue hover:bg-navy-blue active:bg-orange cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <p className="italic text-sm">
            Didn't receive email verification?{' '}
            <Link
              className="text-green-500 font-bold"
              to="/request-email-verification"
            >
              Click Here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
