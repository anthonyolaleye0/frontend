import { useQuery } from '@tanstack/react-query';
import type {
  ChapterResType,
  PartObjType,
  SectionObjType,
  SubSectionObjType,
} from '../../constants/types';
import useTaxLawApis from '../../services/taxLawService';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import { Separator } from '../ui/separator';

const ChapterComponent = ({ chapterId }: { chapterId: string }) => {
  const { fetchTaxLawChapterByChapterId } = useTaxLawApis();

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
        {/* Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold mb-2">Chapter {chapter.number}</h1>
          <p className="text-gray-600 text-lg">{chapter.title}</p>
        </div>

        {/* Parts */}
        <div className="space-y-6">
          {chapter.parts?.map((part: PartObjType) => (
            <div
              key={part._id}
              className="bg-white shadow-sm rounded-2xl p-5 border"
            >
              <h2 className="text-xl font-semibold mb-3">
                Part {part.number}: {part.title}
              </h2>

              {/* Sections */}
              <div className="space-y-4">
                {part.sections?.map((section: SectionObjType) => (
                  <div
                    key={section._id}
                    className="border rounded-xl p-4 hover:shadow transition"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      Section {section.number}: {section.title}
                    </h3>

                    {/* Subsections */}
                    <div className="space-y-2 text-gray-700">
                      {section.subsections?.map((sub: SubSectionObjType) => (
                        <p key={sub._id} className="leading-relaxed">
                          <span className="font-medium">({sub.number})</span>{' '}
                          {sub.content}
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
