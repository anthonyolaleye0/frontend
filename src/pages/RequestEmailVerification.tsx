import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../assets/images/smartTaxApp-removebg.png';
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
        console.log('response:', response);
        toast.success(response.message);
        form.reset();
        navigate('/email-verification');
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
    <div className="flex flex-col items-center mt-24">
      <p className=" pt-[-200px] -mb-15">
        <img src={logo} alt="" className="h-32 w-32" />
      </p>

      <Card className="w-100 md:w-125 mt-6">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Request Email Verification
          </CardTitle>
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

              <div className="flex justify-between items-center">
                <Link className="text-sm text-blue-600" to="/login">
                  Have account?
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
                {loading ? (
                  <TextLoader className="text-white" text="Submitting..." />
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <p className="italic text-sm">
            Received email verification token?{' '}
            <Link className="text-green-500 font-bold" to="/email-verification">
              Click Here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RequestEmailVerification;
