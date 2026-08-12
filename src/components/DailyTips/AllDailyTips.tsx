import type { AllDailyTipsProp } from '../../constants/types';
import { formattedUserRoleForURL } from '../../hooks/functions';
import BackButton from '../BackButton';
import ReusableDailyTipsTable from '../ReusableDailyTipsTable';
import Search from '../Search';
import { Separator } from '../ui/separator';

const AllDailyTips = ({
  totalDailyTipsCount,
  searchValue,
  userRole,
  handleKeyPress,
  setSearchValue,
  allDailyTips,
  isLoading,
  handlePageChange,
  errorMessage,
}: AllDailyTipsProp) => {
  console.log(totalDailyTipsCount);
  const formattedUserRole = formattedUserRoleForURL(userRole);

  return (
    <div className="mb-20 mx-8">
      <Separator className="mt-10" />

      <BackButton />
      <Separator />

      <p className="uppercase my-3">My Daily Tips</p>
      <Separator />

      <div className="my-5 flex">
        <Search
          searchValue={searchValue}
          handleKeyPress={handleKeyPress}
          setSearchValue={setSearchValue}
        />
      </div>

      <div className="mb-20">
        <ReusableDailyTipsTable
          data={allDailyTips}
          loading={isLoading}
          title="My Daily Tips"
          userRole={formattedUserRole}
          totalRows={totalDailyTipsCount}
          onPageChange={handlePageChange}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default AllDailyTips;
