import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../assets/images/smartTaxApp-removebg.png';
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
import type { RegisterUserPayloadProps } from '../constants/types';
import { joiRegisterValidationSchema } from '../hooks/validation';
import useAuthApis from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
      console.log('data:', data);

      const response = await registerStudentMutation(data);
      if (response) {
        console.log('response:', response);
        toast.success(response.message);
        navigate('/email-verification');
        form.reset();
        setShowPassword(false);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An Error occurred:', error);
        toast.error('An error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pb-20 pt-10">
      <p className=" pt-[-200px] -mt-10 -mb-5">
        <img src={logo} alt="" className="h-28 w-28" />
      </p>
      <Card className="w-100 md:w-125 mt-1">
        <CardHeader>
          <CardTitle className="text-center underline italic text-[15px] -mb-3 -mt-2">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) =>
                console.log('Validation errors:', errors),
              )}
              className="space-y-1.5"
            >
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FIrst Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="whatsappPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Whatsapp number."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2 rounded">
                        <option value="Individual">Individual</option>
                        <option value="SME">SME</option>
                        <option value="Consultant">Consultant</option>
                      </select>
                    </FormControl>
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
                          onClick={handleShowPassword}
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

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <span
                          onClick={handleShowConfirmPassword}
                          className="absolute right-3 top-3 cursor-pointer text-gray-500"
                        >
                          {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
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
                <Link className="text-sm text-blue-600" to="/login">
                  Have account?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-navy-blue hover:bg-navy-blue active:bg-orange cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
