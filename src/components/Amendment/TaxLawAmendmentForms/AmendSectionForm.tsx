import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { amendmentType, targetLevel } from '../../../constants/enum';
import type { AmendSectionFormProps } from '../../../constants/types';
import { formatLegalContent } from '../../../hooks/functions';
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
import { Textarea } from '../../ui/textarea';

const AmendSectionForm: React.FC<AmendSectionFormProps> = ({
  setIsModalOpen,
  section,
}) => {
  const { amendSection } = useAmendmentApis();
  const queryClient = useQueryClient();

  type FormValues = {
    number: string;
    title: string;
    content: string;
    effectiveDate: string;
    description: string;
    financeAct?: string;
    year?: number;
  };
  const form = useForm<FormValues>({
    defaultValues: {
      number: '',
      title: '',
      content: '',
      effectiveDate: new Date().toISOString().split('T')[0], // today
      description: '',
      financeAct: '',
      year: new Date().getFullYear(),
    },
  });

  const { control, handleSubmit } = form;

  useEffect(() => {
    if (section) {
      form.reset({
        number: section.number || '',
        title: section.title || '',
        content: section.content || '',
        effectiveDate: new Date().toISOString().split('T')[0],
        description: '',
        financeAct: '',
        year: new Date().getFullYear(),
      });
    }
  }, [section, form]);

  const { mutateAsync: amendSectionMutation, isPending: loading } = useMutation(
    {
      mutationFn: amendSection,

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['section-details'],
        });

        await queryClient.refetchQueries({
          queryKey: ['section-details'],
        });
      },
    },
  );

  const onSubmit = async (data: FormValues) => {
    if (!data) {
      toast.error('data not available');
      return;
    }

    if (!section.title) {
      toast.error('Section title is required.');
      return;
    }
    try {
      const payload = {
        target: {
          level: targetLevel.SECTION,
          entityId: section._id,
          path: {
            sectionNumber: section.number,
          },
        },
        type: amendmentType.MODIFY,
        changes: {
          title: data.title,
          content: formatLegalContent(data.content),
        },
        effectiveDate: new Date(data.effectiveDate),
        description: data.description,
        metadata: {
          financeAct: data.financeAct,
          year: data.year,
        },
      };
      const response = await amendSectionMutation(payload);

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
          {/* SECTION NUMBER */}
          <FormField
            control={control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TITLE */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONTENT */}
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Content</FormLabel>
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

          {/* EFFECTIVE DATE */}
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

          {/* DESCRIPTION */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FINANCE ACT */}
          <FormField
            control={control}
            name="financeAct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finance Act (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Finance Act 2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* YEAR */}
          <FormField
            control={control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
              className="my-4 bg-red-500 text-white hover:bg-red-400"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="my-4 bg-sky-blue hover:bg-navy-blue text-white"
            >
              {loading ? 'Amending Section...' : 'Amend Section'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AmendSectionForm;
