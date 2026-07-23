import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  amendChapterModalStyle,
  createPartModalStyle,
  createSectionModalStyle,
  updateChapterModalStyle,
} from '../../constants/styles';
import type {
  ChapterResType,
  PartObjType,
  SectionObjType,
  SubSectionObjType,
  UserState,
} from '../../constants/types';
import { formatLegalContent } from '../../hooks/functions';
import useTaxLawApis from '../../services/taxLawService';
import AmendChapterForm from '../Amendment/TaxLawAmendmentForms/AmendChapterForm';
import AmendPartForm from '../Amendment/TaxLawAmendmentForms/AmendPartForm';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import ReusableModal from '../ReusableModal';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import CreatePartForm from './TaxLawUpdateForms/CreatePartForm';
import CreateSectionForm from './TaxLawUpdateForms/CreateSectionForm';
import UpdateChapterForm from './TaxLawUpdateForms/UpdateChapterForm';
import UpdatePartForm from './TaxLawUpdateForms/UpdatePartForm';

const ChapterComponent = ({
  chapterId,
  taxLawId,
}: {
  chapterId: string;
  taxLawId: string;
}) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const userRole = currentUser?.role;

  const { fetchTaxLawChapterByChapterId } = useTaxLawApis();

  const handleViewChapterHistory = (chapterId: string, taxLawId: string) => {
    navigate(
      `/dashboard/${userRole}/tax-laws/${taxLawId}/chapters/${chapterId}/history`,
    );

    return;
  };

  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] =
    useState(false);
  const [isCreatePartModalOpen, setIsCreatePartModalOpen] = useState(false);
  const [isChapterUpdateModalOpen, setIsChapterUpdateModalOpen] =
    useState(false);
  const [isChapterAmendModalOpen, setIsChapterAmendModalOpen] = useState(false);

  const [isUpdatePartModalOpen, setIsUpdatePartModalOpen] = useState(false);
  const [isAmendPartModalOpen, setIsAmendPartModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['tax-law-chapter', chapterId],
    queryFn: () => fetchTaxLawChapterByChapterId(chapterId),
    placeholderData: (prev) => prev,
  });

  const chapter: ChapterResType = data?.data;

  console.log('chapter:', chapter);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] mt-[20%]">
        <CircularLoader text="Loading Chapter..." />
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="text-center text-gray-500 mt-10">Chapter not found.</div>
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
                setIsCreatePartModalOpen(true);
              }}
              className="cursor-pointer bg-navy-blue"
            >
              Create Part
            </Button>

            <ReusableModal
              isOpen={isCreatePartModalOpen}
              onClose={() => setIsCreatePartModalOpen(false)}
              title="Create Part Form"
              modalStyle={createPartModalStyle}
            >
              {isCreatePartModalOpen && (
                <CreatePartForm
                  isModalOpen={isCreatePartModalOpen}
                  setIsModalOpen={setIsCreatePartModalOpen}
                  chapter={chapter}
                />
              )}
            </ReusableModal>
          </div>
        )}

        {/* Header */}
        <div className="my-8 border-b pb-4 bg-white shadow-sm rounded-2xl p-5 border">
          <div className="flex flex-col gap-4">
            <div className="flex">
              {userRole === 'admin' && (
                <div className="">
                  <Button
                    onClick={() => {
                      setIsChapterUpdateModalOpen(true);
                    }}
                    className="cursor-pointer bg-navy-blue"
                  >
                    Update Chapter
                  </Button>

                  <ReusableModal
                    isOpen={isChapterUpdateModalOpen}
                    onClose={() => setIsChapterUpdateModalOpen(false)}
                    title="Update Chapter Form"
                    modalStyle={updateChapterModalStyle}
                  >
                    {isChapterUpdateModalOpen && (
                      <UpdateChapterForm
                        isModalOpen={isChapterUpdateModalOpen}
                        setIsModalOpen={setIsChapterUpdateModalOpen}
                        chapter={chapter}
                      />
                    )}
                  </ReusableModal>
                </div>
              )}

              {userRole === 'admin' && (
                <div className="">
                  <Button
                    onClick={() => {
                      setIsChapterAmendModalOpen(true);
                    }}
                    className="cursor-pointer bg-navy-blue"
                  >
                    Amend Chapter
                  </Button>

                  <ReusableModal
                    isOpen={isChapterAmendModalOpen}
                    onClose={() => setIsChapterAmendModalOpen(false)}
                    title="Amend Chapter Form"
                    modalStyle={amendChapterModalStyle}
                  >
                    {isChapterAmendModalOpen && (
                      <AmendChapterForm
                        isModalOpen={isChapterAmendModalOpen}
                        setIsModalOpen={setIsChapterAmendModalOpen}
                        chapter={chapter}
                      />
                    )}
                  </ReusableModal>
                </div>
              )}

              <Button
                onClick={() => handleViewChapterHistory(chapterId, taxLawId)}
                className="cursor-pointer bg-navy-blue"
              >
                View History
              </Button>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Chapter {chapter.number}
            </h1>
          </div>
          <p className="text-gray-600 text-lg">{chapter.title}</p>
        </div>

        {/* Parts */}
        <div className="space-y-6">
          {chapter.parts?.map((part: PartObjType) => (
            <div
              key={part._id}
              className="bg-white shadow-sm rounded-2xl p-5 border"
            >
              {userRole === 'admin' && (
                <div className="">
                  <Button
                    onClick={() => {
                      setIsCreateSectionModalOpen(true);
                    }}
                    className="cursor-pointer bg-navy-blue"
                  >
                    Create Section
                  </Button>

                  <ReusableModal
                    isOpen={isCreateSectionModalOpen}
                    onClose={() => setIsCreateSectionModalOpen(false)}
                    title="Create Section Form"
                    modalStyle={createSectionModalStyle}
                  >
                    {isCreateSectionModalOpen && (
                      <CreateSectionForm
                        isModalOpen={isCreateSectionModalOpen}
                        setIsModalOpen={setIsCreateSectionModalOpen}
                        part={part}
                      />
                    )}
                  </ReusableModal>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold mb-3">
                  Part {part.number}: {part.title}
                </h2>

                <div className="flex">
                  {userRole === 'admin' && (
                    <div className="">
                      <Button
                        onClick={() => {
                          setIsUpdatePartModalOpen(true);
                        }}
                        className="cursor-pointer bg-navy-blue"
                      >
                        Update Part
                      </Button>

                      <ReusableModal
                        isOpen={isUpdatePartModalOpen}
                        onClose={() => setIsUpdatePartModalOpen(false)}
                        title="Update Part Form"
                        modalStyle={updateChapterModalStyle}
                      >
                        {isUpdatePartModalOpen && (
                          <UpdatePartForm
                            isModalOpen={isUpdatePartModalOpen}
                            setIsModalOpen={setIsUpdatePartModalOpen}
                            part={part}
                          />
                        )}
                      </ReusableModal>
                    </div>
                  )}

                  {userRole === 'admin' && (
                    <div className="">
                      <Button
                        onClick={() => {
                          setIsAmendPartModalOpen(true);
                        }}
                        className="cursor-pointer bg-navy-blue"
                      >
                        Amend Part
                      </Button>

                      <ReusableModal
                        isOpen={isAmendPartModalOpen}
                        onClose={() => setIsAmendPartModalOpen(false)}
                        title="Amend Part Form"
                        modalStyle={updateChapterModalStyle}
                      >
                        {isAmendPartModalOpen && (
                          <AmendPartForm
                            isModalOpen={isAmendPartModalOpen}
                            setIsModalOpen={setIsAmendPartModalOpen}
                            part={part}
                          />
                        )}
                      </ReusableModal>
                    </div>
                  )}
                </div>
              </div>

              <div className="my-2">
                <Separator />
              </div>

              {/* Sections */}
              <div className="space-y-4">
                {part.sections?.map((section: SectionObjType) => (
                  <div
                    key={section._id}
                    className="border rounded-xl p-4 hover:shadow transition"
                  >
                    <Link
                      to={`/dashboard/${userRole}/tax-laws/${taxLawId}/chapters/${chapterId}/section/${section?._id}`}
                      className="cursor-pointer bg-gray-200"
                    >
                      <h3 className="font-semibold text-lg mb-2">
                        Section {section.number}: {section.title}
                      </h3>
                    </Link>

                    {/* Subsections */}
                    <div className="space-y-2 text-gray-700">
                      {section.subsections?.map((sub: SubSectionObjType) => (
                        <p key={sub._id} className="leading-relaxed">
                          <span className="font-medium">({sub.number})</span>{' '}
                          <div className="prose max-w-none">
                            <ReactMarkdown>
                              {formatLegalContent(sub.content)}
                            </ReactMarkdown>
                          </div>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterComponent;
