import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import type { AllDecidedCasesProp } from '../../constants/types';
import { formattedUserRoleForURL } from '../../hooks/functions';
import useDecidedCaseApis from '../../services/decidedCaseService';
import BackButton from '../BackButton';
import ReusableDecidedCaseTable from '../ReusableDecidedCaseTable';
import Search from '../Search';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import UploadDecidedCaseModal from './UploadDecidedCaseModal';

const AllDecidedCases = ({
  totalDecidedCasesCount,
  searchValue,
  userRole,
  handleKeyPress,
  setSearchValue,
  allDecidedCases,
  isLoading,
  handlePageChange,
  errorMessage,
}: AllDecidedCasesProp) => {
  console.log(totalDecidedCasesCount);
  const formattedUserRole = formattedUserRoleForURL(userRole);
  const { uploadDecidedCase } = useDecidedCaseApis();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: uploadDecidedCaseMutation, isPending } = useMutation({
    mutationFn: (formData: FormData) => uploadDecidedCase(formData),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['decided-cases'] });
      await queryClient.refetchQueries({ queryKey: ['decided-cases'] });

      toast.success(response?.message || 'Decided case uploaded successfully');
      setIsModalOpen(false);
    },
  });

  // Updated signature to accept FormData
  const handleUpload = async (formData: FormData) => {
    try {
      await uploadDecidedCaseMutation(formData);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Upload failed');
      } else {
        toast.error('An error occurred during upload');
      }
    }
  };

  return (
    <div className="mb-20 mx-8">
      <Separator className="mt-10" />

      <BackButton />
      <Separator />

      <p className="uppercase my-3">All Decided Cases</p>
      <Separator />

      <div className="my-5 flex">
        <Search
          searchValue={searchValue}
          handleKeyPress={handleKeyPress}
          setSearchValue={setSearchValue}
        />
      </div>

      {userRole === 'admin' && (
        <Button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer bg-navy-blue"
        >
          Upload Decided Case
        </Button>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <UploadDecidedCaseModal
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
          isLoading={isPending}
        />
      )}

      <div className="mb-20">
        <ReusableDecidedCaseTable
          data={allDecidedCases}
          loading={isLoading}
          title="All Decided Cases"
          userRole={formattedUserRole}
          totalRows={totalDecidedCasesCount}
          onPageChange={handlePageChange}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default AllDecidedCases;
