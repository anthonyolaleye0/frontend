import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { HistoryTimelineType } from '../../../constants/types';
import useTaxLawApis from '../../../services/taxLawService';
import BackButton from '../../BackButton';
import { CircularLoader } from '../../Loader';
import { Separator } from '../../ui/separator';

const SubSectionHistoryComponent = ({
  // sectionId,
  subSectionId,
  // chapterId,
  // taxLawId,
}: {
  subSectionId: string;
  sectionId: string;
  chapterId: string;
  taxLawId: string;
}) => {
  const {
    fetchSubSectionHistoryBySubSectionId,
    fetchTaxLawSubSectionBySubSectionId,
  } = useTaxLawApis();

  // console.log('taxLawId:', taxLawId);
  // console.log('chapterId:', chapterId);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 🔹 Fetch timeline
  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['sub-section-history', subSectionId],
    queryFn: () => fetchSubSectionHistoryBySubSectionId(subSectionId as string),
    enabled: !!subSectionId,
  });

  const timeline = historyData?.data?.data?.timeline || [];

  console.log('historyData?.data?.data:', historyData?.data?.data);
  console.log('timeline:', timeline);

  // Fetch selected version
  const { data: versionData, isLoading: isVersionLoading } = useQuery({
    queryKey: ['sub-section-version', subSectionId, selectedDate],
    queryFn: () =>
      fetchTaxLawSubSectionBySubSectionId(
        subSectionId as string,
        selectedDate || undefined,
      ),
    enabled: !!selectedDate,
  });

  const subSection = versionData?.data;

  if (isHistoryLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <CircularLoader text="Loading History..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <BackButton />
      <Separator className="my-4" />

      <h1 className="text-2xl font-bold mb-6">Sub section History</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ============================= */}
        {/* LEFT: TIMELINE */}
        {/* ============================= */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <div className="flex gap-2">
            <h2 className="font-semibold mb-4">Versions</h2>

            <p className="text-xs mt-1 uppercase italic">
              {historyData?.data?.data?.totalAmendments || 0} changes
            </p>
          </div>

          <div className="space-y-3">
            {timeline.map((item: HistoryTimelineType) => (
              <div
                key={item.effectiveDate}
                onClick={() => setSelectedDate(item.effectiveDate)}
                className={`p-3 rounded-lg border cursor-pointer transition ${
                  selectedDate === item.effectiveDate
                    ? 'bg-navy-blue text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <p className="font-medium">
                  {item.target.level === 'SESSION' &&
                    item.target.path?.sectionNumber}
                  {item.target.level === 'SUBSECTION' &&
                    item.target.path?.subSectionNumber}
                  {item.target.level === 'CHAPTER' &&
                    item.target.path?.chapterNumber}
                </p>
                <p className="text-sm opacity-70">
                  {new Date(item.effectiveDate).toDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================= */}
        {/* RIGHT: PREVIEW */}
        {/* ============================= */}
        <div className="md:col-span-2 bg-white border rounded-2xl p-6 shadow-sm min-h-100">
          {!selectedDate && (
            <div className="text-gray-500 text-center mt-20">
              Select a version to preview
            </div>
          )}

          {isVersionLoading && (
            <div className="flex justify-center items-center h-50">
              <CircularLoader text="Loading version..." />
            </div>
          )}

          {subSection && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Section {subSection.number}
              </h2>

              <p className="text-gray-700 mb-6">{subSection.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubSectionHistoryComponent;
