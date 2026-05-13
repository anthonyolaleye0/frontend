import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { UpdatePartFormProps } from '../../../constants/types';
import useTaxLawApis from '../../../services/taxLawService';
import { Button } from '../../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';

const UpdatePartForm: React.FC<UpdatePartFormProps> = ({
  setIsModalOpen,
  part,
}) => {
  const { updatePart } = useTaxLawApis();
  const queryClient = useQueryClient();

  type FormValues = {
    title: string;
  };
  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
    },
  });

  const { control, handleSubmit } = form;

  useEffect(() => {
    if (part) {
      form.reset({
        title: part.title || '',
      });
    }
  }, [part, form]);

  const { mutateAsync: updatePartMutation, isPending: loading } = useMutation({
    mutationFn: updatePart,

    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ['tax-law-chapter'],
      });

      await queryClient.refetchQueries({
        queryKey: ['tax-law-chapter'],
      });

      toast.success(response.message);
      setIsModalOpen(false);
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data) {
      toast.error('data not available');
      return;
    }

    if (!part.title) {
      toast.error('Part title is required.');
      return;
    }
    try {
      const payload = {
        _id: part._id,
        number: part.number,
        ...data,
      };
      const response = await updatePartMutation(payload);

      if (response) {
        toast.success(response.message);
        setIsModalOpen(false);
        return;
      }
    } catch (error: unknown) {
      console.log('error:', error);
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
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* BUTTONS */}
          <div className="flex gap-3 justify-center">
            <Button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="my-4 bg-red-500 font-normal cursor-pointer h-9 px-4 py-2 w-16 rounded-md text-white hover:bg-red-400"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className={`my-4 cursor-pointer font-normal h-9 w-32 px-4 py-2 rounded-md text-white ${
                part.title === ''
                  ? 'bg-sky-blue'
                  : 'bg-sky-blue hover:bg-navy-blue'
              }`}
            >
              {loading ? 'Updating Part' : 'Update Part'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePartForm;
