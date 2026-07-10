import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { amendSubSectionModalStyle } from '../../constants/styles';
import type { SubSectionObjType, UserState } from '../../constants/types';
import { formatLegalContent } from '../../hooks/functions';
import useTaxLawApis from '../../services/taxLawService';
import AmendSubSectionForm from '../Amendment/TaxLawAmendmentForms/AmendSubSectionForm';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import ReusableModal from '../ReusableModal';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const SubSectionComponent = ({
  chapterId,
  taxLawId,
  sectionId,
  subSectionId,
}: {
  chapterId: string;
  taxLawId: string;
  sectionId: string;
  subSectionId: string;
}) => {
  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const userRole = currentUser?.role;

  const handleViewSubSectionHistory = () => {
    navigate(
      `/dashboard/admin/tax-laws/${taxLawId}/chapters/${chapterId}/section/${sectionId}/subsection/${subSectionId}/history`,
    );

    return;
  };

  const [isAmendSubSectionModalOpen, setIsAmendSubSectionModalOpen] =
    useState(false);

  const { fetchTaxLawSubSectionBySubSectionId } = useTaxLawApis();

  const { data, isLoading } = useQuery({
    queryKey: ['sub-section-details', subSectionId],
    queryFn: () => fetchTaxLawSubSectionBySubSectionId(subSectionId),
    placeholderData: (prev) => prev,
  });

  const subSection: SubSectionObjType = data?.data;

  console.log('subSection:', subSection);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] mt-[15%]">
        <CircularLoader text="Loading Section..." />
      </div>
    );
  }

  if (!subSection) {
    return (
      <div className="text-center text-gray-500 mt-[20%]">
        Sub section not found.
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

        {/* Subsections */}
        <div className="space-y-6">
          <div
            key={subSection._id}
            className="bg-white shadow-sm rounded-2xl p-5 border"
          >
            <p className=" mb-3 text-center font-bold text-2xl">
              <span className="uppercase underline mr-1">
                Sub Section Number:
              </span>
              <span>{subSection.number}</span>
            </p>

            <Separator />

            <p className=" my-3">
              <span className="text-xl font-semibold uppercase underline mr-1">
                Content:
              </span>
              {/* <span>{subsection.content}</span> */}
              <div className="prose max-w-none">
                <ReactMarkdown>
                  {formatLegalContent(subSection.content)}
                </ReactMarkdown>
              </div>
            </p>

            <div className="flex">
              {userRole === 'admin' && (
                <div className="">
                  <Button
                    onClick={() => {
                      setIsAmendSubSectionModalOpen(true);
                    }}
                    className="cursor-pointer bg-navy-blue"
                  >
                    Amend Sub Section
                  </Button>
                </div>
              )}

              <Button
                onClick={() => handleViewSubSectionHistory()}
                className="cursor-pointer bg-navy-blue"
              >
                View Subsection History
              </Button>
            </div>
          </div>

          <ReusableModal
            isOpen={isAmendSubSectionModalOpen}
            onClose={() => {
              setIsAmendSubSectionModalOpen(false);
            }}
            title="Amend Sub Section Form"
            modalStyle={amendSubSectionModalStyle}
          >
            {isAmendSubSectionModalOpen && (
              <AmendSubSectionForm
                isModalOpen={isAmendSubSectionModalOpen}
                setIsModalOpen={setIsAmendSubSectionModalOpen}
                subsection={subSection}
              />
            )}
          </ReusableModal>
        </div>
      </div>
    </div>
  );
};

export default SubSectionComponent;
