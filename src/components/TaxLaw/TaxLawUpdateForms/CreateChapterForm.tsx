import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { CreateChapterFormProps } from '../../../constants/types';
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

const CreateChapterForm: React.FC<CreateChapterFormProps> = ({
  setIsModalOpen,
  taxLawId,
}) => {
  const { createChapter } = useTaxLawApis();
  const queryClient = useQueryClient();

  type FormValues = {
    title: string;
    number: string;
  };
  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      number: '',
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync: createChapterMutation, isPending: loading } =
    useMutation({
      mutationFn: createChapter,

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['singleTaxLaw'],
        });

        await queryClient.refetchQueries({
          queryKey: ['singleTaxLaw'],
        });
      },
    });

  const onSubmit = async (data: FormValues) => {
    if (!data) {
      toast.error('data not available');
      return;
    }

    if (!data.title) {
      toast.error('Chapter title is required.');
      return;
    }

    if (!data.number) {
      toast.error('Chapter number is required.');
      return;
    }

    try {
      const payload = {
        taxLawId: taxLawId,
        number: data.number,
        title: data.title,
      };
      const response = await createChapterMutation(payload);

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
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chapter Title</FormLabel>
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
              className={`my-4 cursor-pointer font-normal h-9 w-32 px-4 py-2 rounded-md text-white ${'bg-sky-blue hover:bg-navy-blue'}`}
            >
              {loading ? 'Creating Chapter' : 'Create Chapter'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateChapterForm;
