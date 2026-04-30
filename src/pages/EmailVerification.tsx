import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { CardFooter } from '../components/ui/card';
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

    if (newCodes.every((v) => v !== '')) {
      const fullCode = newCodes.join('');
      console.log('Submitted Code:', fullCode);
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

  console.log('code:', codes);
  console.log('sendCode:', sendCode.length);

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
      console.log('sendCode when calling backend:', sendCode);
      const response = await emailVerificationMutation(sendCode);
      if (response) {
        console.log('response:', response);
        toast.success(response?.message);
        navigate('/login');
        form.reset();
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
    <div className="flex justify-center gap-2 mt-4">
      <div className="md:w-125 w-95 mt-14 px-8 border rounded-lg py-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center">
              <p className="mb-5 -mt-5 text-2xl underline font-bold ">
                Email Verification
              </p>
              <p className="mb-1 text-start">
                Enter the 6-digit token sent to your email address
              </p>
            </div>

            <div className="flex gap-2 justify-center flex-col">
              <div className="">
                <p className="mb-2 font-bold  underline">Verification token</p>
              </div>

              <div className="flex gap-2 justify-start">
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
            </div>

            <div className="flex flex-col items-center">
              <Button
                type="submit"
                className="w-full bg-navy-blue hover:bg-navy-blue active:bg-orange cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </form>
          <CardFooter className="flex flex-col items-start gap-2">
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
        </Form>
      </div>
    </div>
  );
};

export default EmailVerification;
