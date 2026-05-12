import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  updateSectionModalStyle,
  updateSubSectionModalStyle,
} from '../../constants/styles';
import type { SectionResType, SubSectionObjType } from '../../constants/types';
import useTaxLawApis from '../../services/taxLawService';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import ReusableModal from '../ReusableModal';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import UpdateSectionForm from './TaxLawUpdateForms/UpdateSectionForm';
import UpdateSubSectionForm from './TaxLawUpdateForms/UpdateSubSectionForm';

const SectionComponent = ({
  sectionId,
}: {
  chapterId: string;
  taxLawId: string;
  sectionId: string;
}) => {
  const [isSubSectionUpdateModalOpen, setIsSubSectionUpdateModalOpen] =
    useState(false);
  const [isSectionUpdateModalOpen, setIsSectionUpdateModalOpen] =
    useState(false);

  const { fetchTaxLawSectionBySectionId } = useTaxLawApis();

  const { data, isLoading } = useQuery({
    queryKey: ['section-details', sectionId],
    queryFn: () => fetchTaxLawSectionBySectionId(sectionId),
    placeholderData: (prev) => prev,
  });

  const section: SectionResType = data?.data;

  console.log('section:', section);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] mt-[15%]">
        <CircularLoader text="Loading Section..." />
      </div>
    );
  }

  if (!section) {
    return (
      <div className="text-center text-gray-500 mt-[20%]">
        Section not found.
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
            <span className="uppercase underline mr-1">Section Number:</span>
            <span>{section.number}</span>
          </p>
          <div className="flex gap-15">
            <div className="">
              <p className=" mb-3">
                <span className="text-xl font-semibold uppercase underline mr-1">
                  Title:
                </span>
                <span className="text-xl">{section.title}</span>
              </p>
            </div>
            <div className="">
              <Button
                onClick={() => {
                  setIsSectionUpdateModalOpen(true);
                }}
                className="cursor-pointer bg-navy-blue"
              >
                Update Section
              </Button>

              <ReusableModal
                isOpen={isSectionUpdateModalOpen}
                onClose={() => setIsSectionUpdateModalOpen(false)}
                title="Update Section Form"
                modalStyle={updateSectionModalStyle}
              >
                {isSectionUpdateModalOpen && (
                  <UpdateSectionForm
                    isModalOpen={isSectionUpdateModalOpen}
                    setIsModalOpen={setIsSectionUpdateModalOpen}
                    section={section}
                  />
                )}
              </ReusableModal>
            </div>
          </div>

          <Separator />
          <div>
            <p className=" mb-3">
              <span className="text-xl font-semibold uppercase underline mr-1">
                Content:
              </span>
              <span>{section.content}</span>
            </p>
          </div>
        </div>

        {/* Subsections */}
        <div className="space-y-6">
          {section.subsections?.map((subsection: SubSectionObjType) => (
            <div
              key={subsection._id}
              className="bg-white shadow-sm rounded-2xl p-5 border"
            >
              <p className=" mb-3 text-center font-bold text-2xl">
                <span className="uppercase underline mr-1">
                  Sub Section Number:
                </span>
                <span>{subsection.number}</span>
              </p>

              <Separator />

              <p className=" my-3">
                <span className="text-xl font-semibold uppercase underline mr-1">
                  Content:
                </span>
                <span>{subsection.content}</span>
              </p>

              <div className="">
                <Button
                  onClick={() => {
                    setIsSubSectionUpdateModalOpen(true);
                  }}
                  className="cursor-pointer bg-navy-blue"
                >
                  Update Sub Section
                </Button>

                <ReusableModal
                  isOpen={isSubSectionUpdateModalOpen}
                  onClose={() => setIsSubSectionUpdateModalOpen(false)}
                  title="Update Sub Section Form"
                  modalStyle={updateSubSectionModalStyle}
                >
                  {isSubSectionUpdateModalOpen && (
                    <UpdateSubSectionForm
                      isModalOpen={isSubSectionUpdateModalOpen}
                      setIsModalOpen={setIsSubSectionUpdateModalOpen}
                      subsection={subsection}
                    />
                  )}
                </ReusableModal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionComponent;
