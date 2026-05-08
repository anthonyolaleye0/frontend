import {
  fetchTaxLawByTaxLawIdRoute,
  fetchTaxLawChapterByChapterIdRoute,
  fetchTaxLawSectionBySectionIdRoute,
  fetchTaxLawsRoute,
} from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useTaxLawApis = () => {
  const fetchTaxLawChapterByChapterId = async (chapterId: string) => {
    const response = await axiosInstance.get(
      `${fetchTaxLawChapterByChapterIdRoute}/${chapterId}`,
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
    fetchTaxLawSectionBySectionId,
    fetchTaxLawChapterByChapterId,
    fetchTaxLaws,
    fetchTaxLawByTaxLawId,
  };
};

export default useTaxLawApis;
