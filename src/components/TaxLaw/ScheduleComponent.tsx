import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { updateScheduleModalStyle } from '../../constants/styles';
import type { ScheduleResType, UserState } from '../../constants/types';
import { formatLegalContent } from '../../hooks/functions';
import useTaxLawApis from '../../services/taxLawService';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import ReusableModal from '../ReusableModal';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import UpdateScheduleForm from './TaxLawUpdateForms/UpdateScheduleForm';

const ScheduleComponent = ({
  scheduleId,
}: {
  scheduleId: string;
  taxLawId: string;
}) => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const userRole = currentUser?.role;

  const [isScheduleUpdateModalOpen, setIsScheduleUpdateModalOpen] =
    useState(false);

  const { fetchTaxLawScheduleByScheduleId } = useTaxLawApis();

  const { data, isLoading } = useQuery({
    queryKey: ['schedule-details', scheduleId],
    queryFn: () => fetchTaxLawScheduleByScheduleId(scheduleId),
    placeholderData: (prev) => prev,
  });

  const schedule: ScheduleResType = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] mt-[15%]">
        <CircularLoader text="Loading Schedule..." />
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="text-center text-gray-500 mt-[20%]">
        Schedule not found.
      </div>
    );
  }

  return (
    <div className="mb-20">
      <div className="max-w-5xl mx-auto p-6">
        <Separator className="mt-10" />
        <div className="">
          <BackButton />
        </div>
        <Separator />

        <div className="space-y-6 bg-white shadow-sm rounded-2xl p-5 border my-10">
          <p className=" mb-3 text-center font-bold text-2xl">
            <span className="uppercase underline mr-1">Schedule Number:</span>
            <span>{schedule.number}</span>
          </p>
          <div className=" gap-15">
            <div className="">
              <p className=" mb-3">
                <span className="text-xl font-semibold uppercase underline mr-1">
                  Title:
                </span>
                <span className="text-xl">{schedule.title}</span>
              </p>
            </div>

            <div className="">
              <p className=" mb-3">
                <span className="text-xl font-semibold uppercase underline mr-1">
                  Content:
                </span>
                <div className="prose max-w-none">
                  <ReactMarkdown>
                    {formatLegalContent(schedule.content)}
                  </ReactMarkdown>
                </div>
              </p>
            </div>
            {userRole === 'admin' && (
              <div className="">
                <Button
                  onClick={() => {
                    setIsScheduleUpdateModalOpen(true);
                  }}
                  className="cursor-pointer bg-navy-blue"
                >
                  Update Schedule
                </Button>

                <ReusableModal
                  isOpen={isScheduleUpdateModalOpen}
                  onClose={() => setIsScheduleUpdateModalOpen(false)}
                  title="Update Schedule Form"
                  modalStyle={updateScheduleModalStyle}
                >
                  {isScheduleUpdateModalOpen && (
                    <UpdateScheduleForm
                      isModalOpen={isScheduleUpdateModalOpen}
                      setIsModalOpen={setIsScheduleUpdateModalOpen}
                      schedule={schedule}
                    />
                  )}
                </ReusableModal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
