import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { UpdateChapterFormProps } from '../../../constants/types';
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
const CreatePartForm: React.FC<UpdateChapterFormProps> = ({
  setIsModalOpen,
  chapter,
}) => {
  const { createPart } = useTaxLawApis();
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

  const { mutateAsync: createPartMutation, isPending: loading } = useMutation({
    mutationFn: createPart,

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

    if (!data.title) {
      toast.error('Part title is required.');
      return;
    }
    try {
      const payload = {
        chapterId: chapter._id,
        number: data.number,
        title: data.title,
      };
      const response = await createPartMutation(payload);

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
          <FormField
            control={control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Number</FormLabel>
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
              {loading ? 'Updating Part' : 'Update Part'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePartForm;
