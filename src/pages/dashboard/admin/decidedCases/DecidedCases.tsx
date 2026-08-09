import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AllDecidedCases from '../../../../components/DecidedCases/AllDecidedCases';
import { CircularLoader } from '../../../../components/Loader';
import type { ApiError, UserState } from '../../../../constants/types';
import useDecidedCaseApis from '../../../../services/decidedCaseService';

const DecidedCases = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  console.log('currentUser:', currentUser);

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryParams = new URLSearchParams(location.search);
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchTrigger, setSearchTrigger] = useState(searchParam || '');
  const limit = limitParam || '10';

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTrigger(searchValue);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { fetchDecidedCases } = useDecidedCaseApis();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['decided-cases', currentPage.toString(), limit, searchTrigger],
    queryFn: () =>
      fetchDecidedCases(currentPage.toString(), limit, searchTrigger),
    placeholderData: (prev) => prev,
  });

  console.log('data:', data);

  const errorMessage =
    isError && axios.isAxiosError<ApiError>(error)
      ? error.response?.data?.message || error.message
      : '';

  const allDecidedCases = data?.data?.cases ?? [];
  const totalDecidedCasesCount = data?.data?.totalCount ?? 0;

  return (
    <div className="">
      {isLoading ? (
        <div className="mt-[20%]">
          <CircularLoader text="Loading Decided Cases..." />
        </div>
      ) : (
        <div className="">
          <AllDecidedCases
            allDecidedCases={allDecidedCases}
            totalDecidedCasesCount={totalDecidedCasesCount}
            searchValue={searchValue}
            userRole={currentUser.role}
            handleKeyPress={handleSearchKeyPress}
            setSearchValue={setSearchValue}
            isLoading={isLoading}
            handlePageChange={handlePageChange}
            errorMessage={errorMessage}
          />
          ;
        </div>
      )}
    </div>
  );
};

export default DecidedCases;
