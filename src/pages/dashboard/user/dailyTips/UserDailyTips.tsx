import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AllDailyTips from '../../../../components/DailyTips/AllDailyTips';
import { CircularLoader } from '../../../../components/Loader';
import type { ApiError, UserState } from '../../../../constants/types';
import useDailyTipApis from '../../../../services/dailyTipService';

const UserDailyTips = () => {
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

  const { getUserInbox } = useDailyTipApis();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [
      'my-daily-tips',
      currentUser._id,
      currentPage.toString(),
      limit,
      searchTrigger,
    ],
    queryFn: () =>
      getUserInbox(
        currentUser._id,
        currentPage.toString(),
        limit,
        searchTrigger,
      ),
    placeholderData: (prev) => prev,
  });

  console.log('data:', data);

  const errorMessage =
    isError && axios.isAxiosError<ApiError>(error)
      ? error.response?.data?.message || error.message
      : '';

  const allDailyTips = data?.data?.mails ?? [];
  const totalDailyTipsCount = data?.data?.totalCount ?? 0;

  return (
    <div className="">
      {isLoading ? (
        <div className="mt-[20%]">
          <CircularLoader text="Loading Daily tips..." />
        </div>
      ) : (
        <div className="">
          <AllDailyTips
            allDailyTips={allDailyTips}
            totalDailyTipsCount={totalDailyTipsCount}
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

export default UserDailyTips;
