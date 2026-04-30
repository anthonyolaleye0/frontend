import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { IdParamFetch, UserState } from '../../constants/types';
import useTaxLawApis from '../../services/taxLawService';
import SingleTaxLawDisplay from './SingleTaxLaw/SingleTaxLawDisplay';

const SingleTaxLawComponent: React.FC<IdParamFetch> = ({ id }) => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const { fetchTaxLawByTaxLawId } = useTaxLawApis();

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

  const { data, isLoading } = useQuery({
    queryKey: [
      'singleTaxLaw',
      id,
      currentPage.toString(),
      limit,
      searchTrigger,
    ],
    queryFn: () =>
      fetchTaxLawByTaxLawId(id, currentPage.toString(), limit, searchTrigger),
  });

  const taxLawData = data?.data;

  console.log('data:', data);
  console.log('taxLawData:', taxLawData);
  console.log('searchValue:', searchValue);
  console.log('setSearchValue:', setSearchValue);
  return (
    <SingleTaxLawDisplay
      searchValue={searchValue}
      userRole={currentUser.role}
      handleKeyPress={handleSearchKeyPress}
      setSearchValue={setSearchValue}
      taxLawData={taxLawData}
      isLoading={isLoading}
      handlePageChange={handlePageChange}
    />
  );
};

export default SingleTaxLawComponent;
