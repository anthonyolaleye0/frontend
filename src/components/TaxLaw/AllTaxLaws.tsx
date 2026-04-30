import type { AllTaxLawsProp } from '../../constants/types';

import { formattedUserRoleForURL } from '../../hooks/functions';
import BackButton from '../BackButton';
import ReusableTaxLawTable from '../ReusableTaxLawTable';
import Search from '../Search';
import { Separator } from '../ui/separator';

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

  return (
    <div className="mb-20 mx-8">
      <Separator className="mt-10" />
      <div className="">
        <BackButton />
      </div>
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
