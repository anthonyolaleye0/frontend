import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  amendSectionModalStyle,
  amendSubSectionModalStyle,
  createSectionModalStyle,
  updateSectionModalStyle,
  updateSubSectionModalStyle,
} from '../../constants/styles';
import type {
  SectionResType,
  SubSectionObjType,
  UserState,
} from '../../constants/types';
import { formatLegalContent } from '../../hooks/functions';
import useTaxLawApis from '../../services/taxLawService';
import AmendSectionForm from '../Amendment/TaxLawAmendmentForms/AmendSectionForm';
import AmendSubSectionForm from '../Amendment/TaxLawAmendmentForms/AmendSubSectionForm';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import ReusableModal from '../ReusableModal';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import CreateSubSectionForm from './TaxLawUpdateForms/CreateSubSectionForm';
import UpdateSectionForm from './TaxLawUpdateForms/UpdateSectionForm';
import UpdateSubSectionForm from './TaxLawUpdateForms/UpdateSubSectionForm';

const SectionComponent = ({
  chapterId,
  taxLawId,
  sectionId,
}: {
  chapterId: string;
  taxLawId: string;
  sectionId: string;
}) => {
  const navigate = useNavigate();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const userRole = currentUser?.role;

  const handleViewSectionHistory = () => {
    navigate(
      `/dashboard/admin/tax-laws/${taxLawId}/chapters/${chapterId}/section/${sectionId}/history`,
    );

    return;
  };

  const handleViewSubSectionDetails = (subsectionId: string) => {
    navigate(
      `/dashboard/admin/tax-laws/${taxLawId}/chapters/${chapterId}/section/${sectionId}/subSection/${subsectionId}`,
    );

    return;
  };

  const [isCreateSubSectionModalOpen, setIsCreateSubSectionModalOpen] =
    useState(false);

  const [isSubSectionUpdateModalOpen, setIsSubSectionUpdateModalOpen] =
    useState(false);
  const [isSectionUpdateModalOpen, setIsSectionUpdateModalOpen] =
    useState(false);
  const [isSectionAmendModalOpen, setIsSectionAmendModalOpen] = useState(false);
  const [isAmendSubSectionModalOpen, setIsAmendSubSectionModalOpen] =
    useState(false);
  const [selectedSubSection, setSelectedSubSection] =
    useState<SubSectionObjType | null>(null);

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

        {userRole === 'admin' && (
          <div className="my-5">
            <Button
              onClick={() => {
                setIsCreateSubSectionModalOpen(true);
              }}
              className="cursor-pointer bg-navy-blue"
            >
              Create Sub Section
            </Button>

            <ReusableModal
              isOpen={isCreateSubSectionModalOpen}
              onClose={() => setIsCreateSubSectionModalOpen(false)}
              title="Create Sub Section Form"
              modalStyle={createSectionModalStyle}
            >
              {isCreateSubSectionModalOpen && (
                <CreateSubSectionForm
                  isModalOpen={isCreateSubSectionModalOpen}
                  setIsModalOpen={setIsCreateSubSectionModalOpen}
                  section={section}
                />
              )}
            </ReusableModal>
          </div>
        )}

        <div className="space-y-6 bg-white shadow-sm rounded-2xl p-5 border mb-10">
          <p className=" mb-3 text-center font-bold text-2xl">
            <span className="uppercase underline mr-1">Section Number:</span>
            <span>{section.number}</span>
          </p>
          <div className="flex flex-col gap-1">
            <div className="">
              <p className=" mb-3">
                <span className="text-xl font-semibold uppercase underline mr-1">
                  Title:
                </span>
                <span className="text-xl">{section.title}</span>
              </p>
            </div>

            <div className="flex">
              {userRole === 'admin' && (
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
              )}

              {userRole === 'admin' && (
                <div className="">
                  <Button
                    onClick={() => {
                      setIsSectionAmendModalOpen(true);
                    }}
                    className="cursor-pointer bg-navy-blue"
                  >
                    Amend Section
                  </Button>

                  <ReusableModal
                    isOpen={isSectionAmendModalOpen}
                    onClose={() => setIsSectionAmendModalOpen(false)}
                    title="Amend Section Form"
                    modalStyle={amendSectionModalStyle}
                  >
                    {isSectionAmendModalOpen && (
                      <AmendSectionForm
                        isModalOpen={isSectionAmendModalOpen}
                        setIsModalOpen={setIsSectionAmendModalOpen}
                        section={section}
                      />
                    )}
                  </ReusableModal>
                </div>
              )}

              <Button
                onClick={() => handleViewSectionHistory()}
                className="cursor-pointer bg-navy-blue"
              >
                View History
              </Button>
            </div>
          </div>

          <Separator />
          <div>
            <p className=" mb-3">
              <span className="text-xl font-semibold uppercase underline mr-1">
                Content:
              </span>
              {/* <span>{section.content}</span> */}
              <div className="prose max-w-none">
                <ReactMarkdown>
                  {formatLegalContent(section.content)}
                </ReactMarkdown>
              </div>
            </p>
          </div>
        </div>

        {/* Subsections */}
        <div className="space-y-6">
          {section.subsections.length !== 0 ? (
            section.subsections?.map((subsection: SubSectionObjType) => (
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
                  {/* <span>{subsection.content}</span> */}
                  <div className="prose max-w-none">
                    <ReactMarkdown>
                      {formatLegalContent(subsection.content)}
                    </ReactMarkdown>
                  </div>
                </p>

                <div className="flex">
                  {userRole === 'admin' && (
                    <div className="">
                      <Button
                        onClick={() => {
                          setIsSubSectionUpdateModalOpen(true);
                          setSelectedSubSection(subsection);
                        }}
                        className="cursor-pointer bg-navy-blue"
                      >
                        Update Sub Section
                      </Button>
                    </div>
                  )}

                  {userRole === 'admin' && (
                    <div className="">
                      <Button
                        onClick={() => {
                          setIsAmendSubSectionModalOpen(true);
                          setSelectedSubSection(subsection);
                        }}
                        className="cursor-pointer bg-navy-blue"
                      >
                        Amend Sub Section
                      </Button>
                    </div>
                  )}

                  <Button
                    onClick={() =>
                      handleViewSubSectionDetails(subsection._id.toString())
                    }
                    className="cursor-pointer bg-navy-blue"
                  >
                    View Subsection Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="">
              <p>No sub section for this section</p>
            </div>
          )}

          <ReusableModal
            isOpen={isSubSectionUpdateModalOpen}
            onClose={() => setIsSubSectionUpdateModalOpen(false)}
            title="Update Sub Section Form"
            modalStyle={updateSubSectionModalStyle}
          >
            {isSubSectionUpdateModalOpen && selectedSubSection && (
              <UpdateSubSectionForm
                isModalOpen={isSubSectionUpdateModalOpen}
                setIsModalOpen={setIsSubSectionUpdateModalOpen}
                subsection={selectedSubSection}
              />
            )}
          </ReusableModal>

          <ReusableModal
            isOpen={isAmendSubSectionModalOpen}
            onClose={() => {
              setIsAmendSubSectionModalOpen(false);
              setSelectedSubSection(null);
            }}
            title="Amend Sub Section Form"
            modalStyle={amendSubSectionModalStyle}
          >
            {isAmendSubSectionModalOpen && selectedSubSection && (
              <AmendSubSectionForm
                isModalOpen={isAmendSubSectionModalOpen}
                setIsModalOpen={setIsAmendSubSectionModalOpen}
                subsection={selectedSubSection}
              />
            )}
          </ReusableModal>
        </div>
      </div>
    </div>
  );
};

export default SectionComponent;
