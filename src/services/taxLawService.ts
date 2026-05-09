import type { ChapterObjType, PartObjType } from '../constants/types';
import {
  fetchTaxLawByTaxLawIdRoute,
  fetchTaxLawChapterByChapterIdRoute,
  fetchTaxLawSectionBySectionIdRoute,
  fetchTaxLawsRoute,
  updateChapterRoute,
  updatePartRoute,
} from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useTaxLawApis = () => {
  const fetchTaxLawChapterByChapterId = async (chapterId: string) => {
    const response = await axiosInstance.get(
      `${fetchTaxLawChapterByChapterIdRoute}/${chapterId}`,
    );

    return response.data;
  };

  const updateChapter = async (payload: ChapterObjType) => {
    const response = await axiosInstance.put(
      `${updateChapterRoute}/${payload._id}`,
      { ...payload },
    );

    return response.data;
  };

  const updatePart = async (payload: PartObjType) => {
    const response = await axiosInstance.put(
      `${updatePartRoute}/${payload._id}`,
      { ...payload },
    );

    return response.data;
  };

  const fetchTaxLawSectionBySectionId = async (sectionId: string) => {
    const response = await axiosInstance.get(
      `${fetchTaxLawSectionBySectionIdRoute}/${sectionId}`,
    );

    console.log('response:', response);

    return response.data;
  };

  const fetchTaxLaws = async (
    page?: string,
    limit?: string,
    searchValue?: string,
  ) => {
    console.log('I am being called...Today');
    const params: Record<string, string> = {};

    if (searchValue) params.searchParams = searchValue;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    const response = await axiosInstance.get(fetchTaxLawsRoute, { params });
    return response.data;
  };

  const fetchTaxLawByTaxLawId = async (
    taxLawId: string,
    page?: string,
    limit?: string,
    searchValue?: string,
  ) => {
    console.log('I am being triggered...');
    const params: Record<string, string> = {};

    if (searchValue) params.searchParams = searchValue;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    const response = await axiosInstance.get(
      `${fetchTaxLawByTaxLawIdRoute}/${taxLawId}`,
      {
        params,
      },
    );

    console.log('axios response:', response);
    return response.data;
  };

  return {
    updateChapter,
    fetchTaxLawSectionBySectionId,
    fetchTaxLawChapterByChapterId,
    fetchTaxLaws,
    updatePart,
    fetchTaxLawByTaxLawId,
  };
};

export default useTaxLawApis;
