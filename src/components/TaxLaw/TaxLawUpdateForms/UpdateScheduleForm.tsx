import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { UpdateScheduleFormProps } from '../../../constants/types';
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
import { Textarea } from '../../ui/textarea';

const UpdateScheduleForm: React.FC<UpdateScheduleFormProps> = ({
  setIsModalOpen,
  schedule,
}) => {
  const { updateSchedule } = useTaxLawApis();
  const queryClient = useQueryClient();

  type FormValues = {
    number: string;
    title: string;
    content: string;
  };
  const form = useForm<FormValues>({
    defaultValues: {
      number: '',
      title: '',
      content: '',
    },
  });

  const { control, handleSubmit } = form;

  useEffect(() => {
    if (schedule) {
      form.reset({
        number: schedule.number || '',
        title: schedule.title || '',
        content: schedule.content || '',
      });
    }
  }, [schedule, form]);

  const { mutateAsync: updateScheduleMutation, isPending: loading } =
    useMutation({
      mutationFn: updateSchedule,

      onSuccess: async (response) => {
        await queryClient.invalidateQueries({
          queryKey: ['schedule-details', schedule._id],
        });

        await queryClient.refetchQueries({
          queryKey: ['schedule-details'],
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

    if (!schedule.title) {
      toast.error('Schedule title is required.');
      return;
    }
    try {
      const payload = {
        _id: schedule._id,
        taxLaw: schedule.taxLaw,
        ...data,
      };
      const response = await updateScheduleMutation(payload);

      if (response) {
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
                <FormLabel>Schedule Number</FormLabel>
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
                <FormLabel>Schedule Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule Content</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-40 overflow-y-auto resize-none"
                  />
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
                schedule.title === ''
                  ? 'bg-sky-blue'
                  : 'bg-sky-blue hover:bg-navy-blue'
              }`}
            >
              {loading ? 'Updating Schedule' : 'Update Schedule'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateScheduleForm;
