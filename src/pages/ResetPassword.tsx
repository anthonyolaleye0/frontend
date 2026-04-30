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
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import type { ResetPasswordPayloadProps } from '../constants/types';
import { joiResetPasswordValidationSchema } from '../hooks/validation';
import useAuthApis from '../services/authService';

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
      confirm_password: '',
      token: '',
    },
  });

  console.log('Form errors:', form.formState.errors);
  useEffect(() => {
    const errors = form.formState.errors;
    if (errors.password) {
      toast.error(errors.password.message as string);
    }
    if (errors.confirm_password) {
      toast.error(errors.confirm_password.message as string);
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

    if (newCodes.every((v) => v !== '')) {
      const fullCode = newCodes.join('');
      console.log('Submitted Code:', fullCode);
    }
    form.setValue('token', newCodes.join(''), { shouldValidate: true });
  };

  const { resetPassword } = useAuthApis();

  const { mutateAsync: resetPasswordMutation, isPending: loading } =
    useMutation({
      mutationFn: resetPassword,
    });

  const onSubmit = async (data: ResetPasswordPayloadProps) => {
    // const fullCode = codes.join('');
    const payload = { ...data };
    console.log('Onsubmit being called.');
    try {
      const response = await resetPasswordMutation(payload);
      if (response) {
        console.log('response:', response);
        toast.success(response.message);
        navigate('/login');
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
    <div className="flex flex-col items-center min-h-screen p-4 ">
      <Card className="w-100 md:w-125 mt-20">
        <CardHeader>
          <CardTitle className="text-center underline italic text-xl -mb-6.25">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-1.5"
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
                        className="w-12 h-12 text-center text-xl border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirm_password"
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
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-navy-blue hover:bg-navy-blue active:bg-orange cursor-pointer"
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
  );
};

export default ResetPassword;
