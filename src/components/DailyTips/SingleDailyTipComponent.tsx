import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import ReactMarkdown from 'react-markdown';
import type { IdParamFetch } from '../../constants/types';
import { formatLegalContent } from '../../hooks/functions';
import useDailyTipApis from '../../services/dailyTipService';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import { Separator } from '../ui/separator';

const SingleDailyTipComponent: React.FC<IdParamFetch> = ({ id }) => {
  const { getDailyTipById } = useDailyTipApis();
  const {
    data: tipData,
    isLoading: isMetadataLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['daily-tip', id],
    queryFn: () => getDailyTipById(id),
    enabled: !!id,
  });

  const dailyTip = tipData?.data || tipData;

  console.log('tipData:', tipData);
  console.log('dailyTip:', dailyTip);

  if (isMetadataLoading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[400px]">
        <CircularLoader text="Loading message details..." />
      </div>
    );
  }

  if (isError || !dailyTip) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return (
      <div className="p-8">
        <BackButton />
        <div className="mt-6 text-red-500 font-semibold">
          {axiosError?.response?.data?.message ||
            'Failed to load daily tip details.'}
        </div>
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

        <div className="space-y-6 bg-white mt-10 shadow-sm rounded-2xl p-5 border mb-10">
          <p className=" mb-3 text-center font-bold text-2xl">
            <span className="uppercase underline mr-1">Title:</span>
            <span>{dailyTip?.tipId?.title}</span>
          </p>

          <Separator />
          <div>
            <p className=" mb-3">
              <span className="text-xl font-semibold uppercase underline mr-1">
                Content:
              </span>
              {/* <span>{section.content}</span> */}
              <div className="prose max-w-none">
                <ReactMarkdown>
                  {formatLegalContent(dailyTip?.tipId?.content)}
                </ReactMarkdown>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDailyTipComponent;
