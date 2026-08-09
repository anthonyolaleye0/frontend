import {
  fetchDecidedCasesRoute,
  uploadDecidedCaseRoute,
} from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useDecidedCaseApis = () => {
  const uploadDecidedCase = async (formData: FormData) => {
    const response = await axiosInstance.post(
      `${uploadDecidedCaseRoute}`,
      formData,
      {
        headers: {
          // Let browser set it automatically
          'Content-Type': undefined,
        },
      },
    );

    return response.data;
  };

  const fetchDecidedCases = async (
    page?: string,
    limit?: string,
    searchValue?: string,
  ) => {
    console.log('I am being called...Today');
    const params: Record<string, string> = {};

    if (searchValue) params.searchParams = searchValue;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    const response = await axiosInstance.get(fetchDecidedCasesRoute, {
      params,
    });

    console.log('response:', response);
    return response.data;
  };

  return { fetchDecidedCases, uploadDecidedCase };
};

export default useDecidedCaseApis;
