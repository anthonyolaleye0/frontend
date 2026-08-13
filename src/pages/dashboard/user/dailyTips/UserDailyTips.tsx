import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AllDailyTips from '../../../../components/DailyTips/AllDailyTips';
import { CircularLoader } from '../../../../components/Loader';
import SubscriptionModal from '../../../../components/SubscriptionModal';
import type { ApiError, UserState } from '../../../../constants/types';
import useDailyTipApis from '../../../../services/dailyTipService';

const UserDailyTips = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  console.log('currentUser:', currentUser);

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

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

  const hasActiveSub = Boolean(
    currentUser?.subscription?.hasActiveSubscription,
  );
  const allowedFeatures: string[] =
    currentUser?.subscription?.allowedFeatures || [];
  const hasAccess = hasActiveSub && allowedFeatures.includes('DAILY_TIPS');

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
    enabled: hasAccess && !!currentUser._id,
    placeholderData: (prev) => prev,
  });

  console.log('data:', data);

  const errorMessage =
    isError && axios.isAxiosError<ApiError>(error)
      ? error.response?.data?.message || error.message
      : '';

  const allDailyTips = data?.data?.mails ?? [];
  const totalDailyTipsCount = data?.data?.totalCount ?? 0;

  if (!hasAccess) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[500px]">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-md shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Required 🔒
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            You need an active subscription that includes Daily Tax Tips to
            access this feature.
          </p>
          <button
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md"
          >
            Subscribe Now
          </button>
        </div>

        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          highlightedFeature="DAILY_TIPS"
        />
      </div>
    );
  }

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

      {/* Subscription Modal for manual trigger/upgrade */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        highlightedFeature="DAILY_TIPS"
      />
    </div>
  );
};

export default UserDailyTips;
