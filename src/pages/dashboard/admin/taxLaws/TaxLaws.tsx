import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularLoader } from '../../../../components/Loader';
import AllTaxLaws from '../../../../components/TaxLaw/AllTaxLaws';
import type { ApiError, UserState } from '../../../../constants/types';
import useTaxLawApis from '../../../../services/taxLawService';

const TaxLaws = () => {
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

  const { fetchTaxLaws } = useTaxLawApis();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['tax-laws', currentPage.toString(), limit, searchTrigger],
    queryFn: () => fetchTaxLaws(currentPage.toString(), limit, searchTrigger),
    placeholderData: (prev) => prev,
  });

  const errorMessage =
    isError && axios.isAxiosError<ApiError>(error)
      ? error.response?.data?.message || error.message
      : '';

  const allTaxLaws = data?.data?.taxLaws ?? [];
  const totalTaxLawsCount = data?.data?.totalCount ?? 0;

  return (
    <div className="">
      {isLoading ? (
        <div className="mt-[20%]">
          <CircularLoader text="Loading Tax laws..." />
        </div>
      ) : (
        <div className="">
          <AllTaxLaws
            allTaxLaws={allTaxLaws}
            totalTaxLawsCount={totalTaxLawsCount}
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

export default TaxLaws;
