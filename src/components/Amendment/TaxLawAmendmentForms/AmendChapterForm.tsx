import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { amendmentType, targetLevel } from '../../../constants/enum';
import type { AmendChapterFormProps } from '../../../constants/types';
import useAmendmentApis from '../../../services/amendmentService';
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

const AmendChapterForm: React.FC<AmendChapterFormProps> = ({
  setIsModalOpen,
  chapter,
}) => {
  const { amendChapter } = useAmendmentApis();
  const queryClient = useQueryClient();

  type FormValues = {
    title: string;
    effectiveDate: string;
    description: string;
    financeAct?: string;
    year?: number;
  };
  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      effectiveDate: new Date().toISOString().split('T')[0], // today
      description: '',
      financeAct: '',
      year: new Date().getFullYear(),
    },
  });

  const { control, handleSubmit } = form;

  useEffect(() => {
    if (chapter) {
      form.reset({
        title: chapter.title || '',
      });
    }
  }, [chapter, form]);

  const { mutateAsync: amendChapterMutation, isPending: loading } = useMutation(
    {
      mutationFn: amendChapter,

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['tax-law-chapter'],
        });

        await queryClient.refetchQueries({
          queryKey: ['tax-law-chapter'],
        });
      },
    },
  );

  const onSubmit = async (data: FormValues) => {
    if (!data) {
      toast.error('data not available');
      return;
    }

    if (!chapter.title) {
      toast.error('Chapter title is required.');
      return;
    }
    try {
      const payload = {
        target: {
          level: targetLevel.CHAPTER,
          entityId: chapter._id,
          path: {
            chapterNumber: chapter.number,
          },
        },
        type: amendmentType.MODIFY,
        changes: {
          title: data.title,
        },
        effectiveDate: new Date(data.effectiveDate),
        description: data.description,
        metadata: {
          financeAct: data.financeAct,
          year: data.year,
        },
      };
      const response = await amendChapterMutation(payload);

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
                <FormLabel>Chapter Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="effectiveDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Effective Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="border rounded-md p-2 w-full"
                    placeholder="Explain what this amendment does..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="financeAct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finance Act</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Finance Act 2023" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
                chapter.title === ''
                  ? 'bg-sky-blue'
                  : 'bg-sky-blue hover:bg-navy-blue'
              }`}
            >
              {loading ? 'Amending Chapter' : 'Amend Chapter'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AmendChapterForm;
