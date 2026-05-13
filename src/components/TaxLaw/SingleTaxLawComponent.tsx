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

  const { fetchTaxLawByTaxLawId, fetchSchedulesByTaxLawId } = useTaxLawApis();

  const [activeTab, setActiveTab] = useState<'chapters' | 'schedules'>(
    'chapters',
  );
  const [searchValue, setSearchValue] = useState('');
  const [chapterPage, setChapterPage] = useState<number>(1);
  const [schedulePage, setSchedulePage] = useState<number>(1);

  const queryParams = new URLSearchParams(location.search);
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchTrigger, setSearchTrigger] = useState(searchParam || '');
  const limit = limitParam || '10';

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTrigger(searchValue);
      if (activeTab === 'chapters') {
        setChapterPage(1);
      } else {
        setSchedulePage(1);
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (activeTab === 'chapters') {
      setChapterPage(page);
    } else {
      setSchedulePage(page);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      'singleTaxLaw',
      id,
      chapterPage.toString(),
      limit,
      searchTrigger,
    ],
    queryFn: () =>
      fetchTaxLawByTaxLawId(id, chapterPage.toString(), limit, searchTrigger),
  });

  // Schedule query
  const { data: schedulesData, isLoading: schedulesLoading } = useQuery({
    queryKey: [
      'taxLawSchedules',
      id,
      schedulePage.toString(),
      limit,
      searchTrigger,
    ],
    queryFn: () =>
      fetchSchedulesByTaxLawId(
        id,
        schedulePage.toString(),
        limit,
        searchTrigger,
      ),
    enabled: activeTab === 'schedules', // ONLY RUN WHEN CLICKED
  });

  const taxLawData = data?.data;

  console.log('data:', data);
  console.log('taxLawData:', taxLawData);
  console.log('searchValue:', searchValue);
  console.log('setSearchValue:', setSearchValue);
  console.log('schedulesData:', schedulesData);
  return (
    <SingleTaxLawDisplay
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      schedulesData={schedulesData?.data?.schedules}
      schedulesLoading={schedulesLoading}
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
