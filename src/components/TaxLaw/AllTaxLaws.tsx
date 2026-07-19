import { useState } from 'react';
import type { AllTaxLawsProp } from '../../constants/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { formattedUserRoleForURL } from '../../hooks/functions';
import useTaxLawApis from '../../services/taxLawService';
import BackButton from '../BackButton';
import ReusableTaxLawTable from '../ReusableTaxLawTable';
import Search from '../Search';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import CreateTaxLawModal from './CreateTaxLawModal';

const AllTaxLaws = ({
  totalTaxLawsCount,
  searchValue,
  userRole,
  handleKeyPress,
  setSearchValue,
  allTaxLaws,
  isLoading,
  handlePageChange,
  errorMessage,
}: AllTaxLawsProp) => {
  const formattedUserRole = formattedUserRoleForURL(userRole);
  const { createTaxLaw } = useTaxLawApis();

  const [isModalOpen, setIsModalOpen] = useState(false); // 👈 NEW

  const queryClient = useQueryClient();

  const { mutateAsync: createTaxLawMutation, isPending } = useMutation({
    mutationFn: createTaxLaw,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['tax-law'] });
      await queryClient.refetchQueries({ queryKey: ['tax-law'] });

      toast.success(response.message);
      setIsModalOpen(false);
    },
  });

  const handleCreate = async (payload: { title: string }) => {
    try {
      await createTaxLawMutation(payload);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred');
      }
    }
  };

  return (
    <div className="mb-20 mx-8">
      <Separator className="mt-10" />

      <BackButton />
      <Separator />

      <p className="uppercase my-3">All Tax Laws</p>
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
          onClick={() => setIsModalOpen(true)} // 👈 OPEN MODAL
          className="cursor-pointer bg-navy-blue"
        >
          Create Tax Law
        </Button>
      )}

      {/* 👇 MODAL */}
      {isModalOpen && (
        <CreateTaxLawModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
          isLoading={isPending}
        />
      )}

      <div className="mb-20">
        <ReusableTaxLawTable
          data={allTaxLaws}
          loading={isLoading}
          title="All Tax Laws"
          userRole={formattedUserRole}
          totalRows={totalTaxLawsCount}
          onPageChange={handlePageChange}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default AllTaxLaws;
