import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { UpdateSubSectionFormProps } from '../../../constants/types';
import { formatLegalContent } from '../../../hooks/functions';
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

const UpdateSubSectionForm: React.FC<UpdateSubSectionFormProps> = ({
  setIsModalOpen,
  subsection,
}) => {
  const { updateSubSection } = useTaxLawApis();
  const queryClient = useQueryClient();

  type FormValues = {
    content: string;
    number: string;
  };
  const form = useForm<FormValues>({
    defaultValues: {
      content: '',
      number: '',
    },
  });

  const { control, handleSubmit } = form;

  useEffect(() => {
    if (subsection) {
      form.reset({
        number: subsection.number || '',
        content: subsection.content || '',
      });
    }
  }, [subsection, form]);

  console.log('subsection.content:', subsection.content);

  const { mutateAsync: updateSubSectionMutation, isPending: loading } =
    useMutation({
      mutationFn: updateSubSection,

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['section-details'],
        });

        await queryClient.refetchQueries({
          queryKey: ['section-details'],
        });
      },
    });

  const onSubmit = async (data: FormValues) => {
    console.log('data:', data);
    if (!data) {
      toast.error('data not available');
      return;
    }

    if (!data.number) {
      toast.error('Section number is required.');
      return;
    }

    if (!data.content) {
      toast.error('Section content is required.');
      return;
    }

    try {
      const payload = {
        _id: subsection._id,
        section: subsection.section,
        // ...data,
        number: data.number,
        content: formatLegalContent(data.content),
      };

      const response = await updateSubSectionMutation(payload);

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
                <FormLabel>Sub Section Number</FormLabel>
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
                <FormLabel>Sub Section Content</FormLabel>
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
              className={`my-4 cursor-pointer font-normal h-9 w-36 px-4 py-2 rounded-md text-white ${
                subsection.content === ''
                  ? 'bg-sky-blue'
                  : 'bg-sky-blue hover:bg-navy-blue'
              }`}
            >
              {loading ? 'Updating Sub Section' : 'Update Sub Section'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateSubSectionForm;
