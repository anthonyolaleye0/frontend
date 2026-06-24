import type {
  AmendChapterPayload,
  AmendPartPayload,
  AmendSectionPayload,
  AmendSubSectionPayload,
} from '../constants/types';
import { createAmendmentRoute } from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useAmendmentApis = () => {
  const amendChapter = async (payload: AmendChapterPayload) => {
    const response = await axiosInstance.post(
      `${createAmendmentRoute}`,
      payload,
    );

    return response.data;
  };
  const amendSection = async (payload: AmendSectionPayload) => {
    const response = await axiosInstance.post(
      `${createAmendmentRoute}`,
      payload,
    );

    return response.data;
  };
  const amendPart = async (payload: AmendPartPayload) => {
    const response = await axiosInstance.post(
      `${createAmendmentRoute}`,
      payload,
    );

    return response.data;
  };
  const amendSubSection = async (payload: AmendSubSectionPayload) => {
    const response = await axiosInstance.post(
      `${createAmendmentRoute}`,
      payload,
    );

    return response.data;
  };

  return { amendPart, amendSection, amendChapter, amendSubSection };
};

export default useAmendmentApis;
