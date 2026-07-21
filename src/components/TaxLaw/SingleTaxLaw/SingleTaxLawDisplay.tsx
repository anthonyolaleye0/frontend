import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { createChapterModalStyle } from '../../../constants/styles';
import type { SingleTaxLawProp } from '../../../constants/types';
import { formattedUserRoleForURL } from '../../../hooks/functions';
import useTaxLawApis from '../../../services/taxLawService';
import BackButton from '../../BackButton';
import ReusableModal from '../../ReusableModal';
import ReusableScheduleDisplayTable from '../../ReusableScheduleDisplayTable';
import ReusableSingleTaxLawDisplayTable from '../../ReusableSingleTaxLawDisplayTable';
import Search from '../../Search';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import CreateChapterForm from '../TaxLawUpdateForms/CreateChapterForm';
import CreateScheduleForm from '../TaxLawUpdateForms/CreateScheduleForm';

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

  const { uploadTaxLaw } = useTaxLawApis();

  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isCreateChapterModalOpen, setIsCreateChapterModalOpen] =
    useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  console.log('taxLawData:', taxLawData);
  console.log('taxLawData?._id:', taxLawData?._id);

  const data = {
    taxLawId: taxLawData?._id,
    chapters: taxLawData?.chapters,
    totalChapters: taxLawData?.totalChapters,
    totalParts: taxLawData?.totalParts,
    totalSections: taxLawData?.totalSections,
    totalSubsections: taxLawData?.totalSubsections,
    totalSchedules: taxLawData?.totalSchedules,
  };

  const hasChapters =
    Array.isArray(taxLawData?.chapters) && taxLawData.chapters.length > 0;

  const renderForm = () => {
    switch (activeTab) {
      case 'chapters':
        return (
          <CreateChapterForm
            isModalOpen={isCreateChapterModalOpen}
            setIsModalOpen={setIsCreateChapterModalOpen}
            taxLawId={taxLawData._id}
          />
        );

      case 'schedules':
        return (
          <CreateScheduleForm
            isModalOpen={isCreateChapterModalOpen}
            setIsModalOpen={setIsCreateChapterModalOpen}
            taxLawId={taxLawData._id}
          />
        );

      default:
        return null;
    }
  };

  const uploadTaxLawMutation = useMutation({
    mutationFn: ({
      taxLawId,
      formData,
    }: {
      taxLawId: string;
      formData: FormData;
    }) => uploadTaxLaw(taxLawId, formData),

    onSuccess: () => {
      toast.success('Document uploaded successfully');

      queryClient.invalidateQueries({
        queryKey: ['getSingleTaxLaw', taxLawData._id],
      });
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || 'Upload failed');
      } else {
        toast.error('Something went wrong');
      }
    },
  });

  const handleSubmit = async () => {
    if (!file) {
      toast.error('File is required');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('taxLawId', taxLawData._id);

    uploadTaxLawMutation.mutate({
      taxLawId: taxLawData._id,
      formData,
    });

    setFile(null);
  };

  return (
    <div className="mb-20 mx-8">
      <Separator className="mt-10" />
      <div className="">
        <BackButton />
      </div>
      <Separator />

      <p className="uppercase my-3">{`All Tax Law ${activeTab}`}</p>
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

      <div className="flex gap-2">
        {userRole === 'admin' && (
          <div className="flex flex-col gap-2">
            <Button
              className="cursor-pointer bg-navy-blue w-52"
              onClick={handleButtonClick}
            >
              Upload Tax Law Files
            </Button>

            <div className="flex gap-3 mb-5">
              {file && (
                <span className="text-sm text-navy-blue border px-2 rounded text-center flex items-center">
                  Selected: {file.name}
                </span>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              {/* Actions */}
              {file && (
                <div className="flex justify-end gap-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => setFile(null)}
                    variant="outline"
                  >
                    Cancel
                  </Button>

                  <Button
                    className="cursor-pointer"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              )}
            </div>

            <div className="">
              {file && (
                <p className="text-red-500">
                  Max file size: 10MB, For best results, upload files under 5MB.
                </p>
              )}
            </div>
          </div>
        )}

        {hasChapters && userRole === 'admin' && (
          <div className="">
            <Button
              onClick={() => {
                setIsCreateChapterModalOpen(true);
              }}
              className="cursor-pointer bg-navy-blue"
            >{`Create ${activeTab === 'chapters' ? 'Chapter' : 'Schedule'}`}</Button>

            <ReusableModal
              isOpen={isCreateChapterModalOpen}
              onClose={() => setIsCreateChapterModalOpen(false)}
              title={
                activeTab === 'chapters'
                  ? 'Create Chapter Form'
                  : 'Create Schedule Form'
              }
              modalStyle={createChapterModalStyle}
            >
              {isCreateChapterModalOpen && renderForm()}
            </ReusableModal>
          </div>
        )}
      </div>

      {!hasChapters && (
        <div className="flex flex-col items-center justify-center py-16 border rounded-md bg-gray-50">
          <p className="text-lg font-semibold mb-2">No document uploaded yet</p>

          <p className="text-gray-500 mb-4">
            Upload a tax law document to generate chapters, sections and
            schedules.
          </p>
        </div>
      )}

      <div className="mb-20">
        {hasChapters && activeTab === 'chapters' && (
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
