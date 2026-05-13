import type { SingleTaxLawProp } from '../../../constants/types';
import { formattedUserRoleForURL } from '../../../hooks/functions';
import BackButton from '../../BackButton';
import ReusableScheduleDisplayTable from '../../ReusableScheduleDisplayTable';
import ReusableSingleTaxLawDisplayTable from '../../ReusableSingleTaxLawDisplayTable';
import Search from '../../Search';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

const SingleTaxLawDisplay = ({
  activeTab,
  setActiveTab,
  schedulesData,
  schedulesLoading,
  searchValue,
  userRole,
  handleKeyPress,
  setSearchValue,
  taxLawData,
  isLoading,
  handlePageChange,
}: SingleTaxLawProp) => {
  const formattedUserRole = formattedUserRoleForURL(userRole);

  console.log('taxLawData:', taxLawData);

  const data = {
    taxLawId: taxLawData?._id,
    chapters: taxLawData?.chapters,
    totalChapters: taxLawData?.totalChapters,
    totalParts: taxLawData?.totalParts,
    totalSections: taxLawData?.totalSections,
    totalSubsections: taxLawData?.totalSubsections,
    totalSchedules: taxLawData?.totalSchedules,
  };
  return (
    <div className="mb-20 mx-8">
      <Separator className="mt-10" />
      <div className="">
        <BackButton />
      </div>
      <Separator />

      <p className="uppercase my-3">All Tax Law Chapters</p>
      <Separator />

      <div className="my-5">
        <div className="flex gap-2">
          <p className="uppercase font-semibold">Title:</p>
          <p>{taxLawData?.title}</p>
        </div>
        <div className="flex gap-2">
          <p className="uppercase font-semibold">Year:</p>
          <p>{taxLawData?.year}</p>
        </div>
        <div className="flex gap-2">
          <p className="uppercase font-semibold">Description:</p>
          <p>{taxLawData?.description}</p>
        </div>
        <div className="flex gap-2">
          <p className="uppercase font-semibold">Total Schedules:</p>
          <p>{taxLawData?.totalSchedules}</p>
        </div>
      </div>

      <div className="my-5 flex">
        <Search
          searchValue={searchValue}
          handleKeyPress={handleKeyPress}
          setSearchValue={setSearchValue}
        />
      </div>

      <div className="flex gap-4 my-6">
        <Button
          onClick={() => setActiveTab('chapters')}
          className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium ${
            activeTab === 'chapters'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Chapters
        </Button>

        <Button
          onClick={() => setActiveTab('schedules')}
          className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium ${
            activeTab === 'schedules'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Schedules
        </Button>
      </div>

      <div className="mb-20">
        {activeTab === 'chapters' && (
          <ReusableSingleTaxLawDisplayTable
            data={data}
            searchValue={searchValue}
            loading={isLoading}
            title="Chapters Table"
            userRole={formattedUserRole}
            totalRows={30}
            onPageChange={handlePageChange}
          />
        )}

        {activeTab === 'schedules' && (
          <ReusableScheduleDisplayTable
            data={schedulesData}
            searchValue={searchValue}
            loading={schedulesLoading}
            title="Schedules Table"
            userRole={formattedUserRole}
            totalRows={30}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default SingleTaxLawDisplay;
