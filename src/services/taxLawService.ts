import type {
  ChapterObjType,
  CreateChapterPayload,
  CreatePartPayload,
  CreateSchedulePayload,
  CreateSectionPayload,
  CreateSubSectionPayload,
  PartObjectType,
  ScheduleObjType,
  SectionObjType,
  SubSectionObjType,
} from '../constants/types';
import {
  createChapterRoute,
  createPartRoute,
  createScheduleRoute,
  createSectionRoute,
  createSubSectionRoute,
  fetchSchedulesByTaxLawIdRoute,
  fetchTaxLawByTaxLawIdRoute,
  fetchTaxLawChapterByChapterIdRoute,
  fetchTaxLawScheduleByScheduleIdRoute,
  fetchTaxLawSectionBySectionIdRoute,
  fetchTaxLawsRoute,
  updateChapterRoute,
  updatePartRoute,
  updateScheduleRoute,
  updateSectionRoute,
  updateSubSectionRoute,
} from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useTaxLawApis = () => {
  const fetchTaxLawChapterByChapterId = async (chapterId: string) => {
    const response = await axiosInstance.get(
      `${fetchTaxLawChapterByChapterIdRoute}/${chapterId}`,
    );

    return response.data;
  };

  const updateSection = async (payload: SectionObjType) => {
    const response = await axiosInstance.put(
      `${updateSectionRoute}/${payload._id}`,
      { ...payload },
    );

    return response.data;
  };

  const updateSchedule = async (payload: ScheduleObjType) => {
    const response = await axiosInstance.put(
      `${updateScheduleRoute}/${payload._id}`,
      { ...payload },
    );

    return response.data;
  };

  const createSubSection = async (payload: CreateSubSectionPayload) => {
    const { sectionId, ...others } = payload;

    const response = await axiosInstance.post(
      `${createSubSectionRoute}/${sectionId}`,
      others,
    );

    return response.data;
  };

  const updateSubSection = async (payload: SubSectionObjType) => {
    const response = await axiosInstance.put(
      `${updateSubSectionRoute}/${payload._id}`,
      { ...payload },
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

  const updatePart = async (payload: PartObjectType) => {
    const response = await axiosInstance.put(
      `${updatePartRoute}/${payload._id}`,
      { ...payload },
    );

    return response.data;
  };

  const createChapter = async (payload: CreateChapterPayload) => {
    const { taxLawId, ...others } = payload;

    const response = await axiosInstance.post(
      `${createChapterRoute}/${taxLawId}`,
      others,
    );

    return response.data;
  };

  const createPart = async (payload: CreatePartPayload) => {
    const { chapterId, ...others } = payload;

    const response = await axiosInstance.post(
      `${createPartRoute}/${chapterId}`,
      others,
    );

    return response.data;
  };

  const createSection = async (payload: CreateSectionPayload) => {
    const { partId, ...others } = payload;

    const response = await axiosInstance.post(
      `${createSectionRoute}/${partId}`,
      others,
    );

    return response.data;
  };

  const createSchedule = async (payload: CreateSchedulePayload) => {
    const { taxLawId, ...others } = payload;

    const response = await axiosInstance.post(
      `${createScheduleRoute}/${taxLawId}`,
      others,
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

  const fetchTaxLawScheduleByScheduleId = async (scheduleId: string) => {
    const response = await axiosInstance.get(
      `${fetchTaxLawScheduleByScheduleIdRoute}/${scheduleId}`,
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

  const fetchSchedulesByTaxLawId = async (
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
      `${fetchSchedulesByTaxLawIdRoute}/${taxLawId}`,
      {
        params,
      },
    );

    console.log('axios response:', response);
    return response.data;
  };

  return {
    fetchSchedulesByTaxLawId,
    updateChapter,
    createChapter,
    createPart,
    createSection,
    createSchedule,
    updateSchedule,
    fetchTaxLawSectionBySectionId,
    fetchTaxLawChapterByChapterId,
    fetchTaxLaws,
    updateSection,
    updateSubSection,
    createSubSection,
    fetchTaxLawScheduleByScheduleId,
    updatePart,
    fetchTaxLawByTaxLawId,
  };
};

export default useTaxLawApis;
