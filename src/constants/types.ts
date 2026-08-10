export type TextLoaderProps = {
  text: React.ReactNode;
  className?: string;
};

export type AdminSidebarProps = {
  closeDrawer?: () => void;
};

export type AllUsersProp = SearchProp & {
  totalUsersCount: number;
  allUsers: CurrentUserType[];
  userRole: string;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
};

export type SingleTaxLawDataObj = SingleTaxLawTableType & {
  _id: string;
  title: string;
  year: 2025;
  description: string;
};

export type SingleTaxLawProp = SearchProp & {
  taxLawData: SingleTaxLawDataObj;
  userRole: string;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
  activeTab: 'chapters' | 'schedules';
  setActiveTab: React.Dispatch<React.SetStateAction<'chapters' | 'schedules'>>;

  schedulesData: ScheduleTaxLawTableObjType[];
  schedulesLoading: boolean;
};

export type ChapterTaxLawTableObjType = {
  _id: string;
  taxLaw: string;
  title: string;
  number: string;
  totalParts: number;
  totalSections: number;
  totalSubsections: number;

  parts: [];
};

export type SingleTaxLawTableType = {
  taxLawId: string;
  chapters: ChapterTaxLawTableObjType[];
  // schedules: ScheduleTaxLawTableObjType[];
  totalChapters: number;
  totalParts: number;
  totalSections: number;
  totalSubsections: number;
  totalSchedules: number;
};

export type ApiError = {
  message: string;
};

export type ReusableSingleTaxLawDisplayTableProps = {
  data: SingleTaxLawTableType;
  loading: boolean;
  userRole: string;
  errorMessage?: string;
  searchValue?: string;
  title: string;
  totalRows: number;
  onPageChange: (page: number) => void;
};

export type ScheduleTaxLawTableObjType = {
  _id: string;
  taxLaw: string;
  title: string;
  number: string;
  content: string;
};

export type ReusableScheduleDisplayTableProps = {
  data: ScheduleTaxLawTableObjType[];
  loading: boolean;
  userRole: string;
  errorMessage?: string;
  searchValue?: string;
  title: string;
  totalRows: number;
  onPageChange: (page: number) => void;
};

export type ChapterObjType = {
  _id: string;
  title: string;
  number: string;
};

export type SubSectionObjType = {
  _id: string;
  section: string;
  number: string;
  content: string;
};

export type CreateSubSectionPayload = {
  sectionId: string;
  number: string;
  content: string;
};

export type SectionObjType = {
  _id: string;
  title: string;
  number: string;
  content: string;
  subsections: SubSectionObjType[];
};

export type PartObjectType = {
  _id: string;
  title: string;
  number: string;
};

export type CreatePartPayload = {
  chapterId: string;
  title: string;
  number: string;
};

export type CreateSectionPayload = {
  partId: string;
  title: string;
  number: string;
};
export type CreateChapterPayload = {
  taxLawId: string;
  title: string;
  number: string;
};

export type CreateSchedulePayload = {
  taxLawId: string;
  title: string;
  number: string;
  content: string;
};

export type TaxLawStatsType = { totalTaxLaws: 6 };

export type StructureStatsType = {
  totalChapters: number;
  totalParts: number;
  totalSections: number;
  totalSubsections: number;
  totalSchedules: number;
};

export type UploadStatsType = [{ _id: string; count: number }];
export type UserStatsType = {
  totalUsers: number;
  totalAdmins: number;
  totalRegularUsers: number;
};
export type RecentActivityType = {
  _id: string;
  title: string;
  status: string;
  createdAt: string;
};
export type UploadTrendsType = { count: number; date: string };

export type AmendSectionPayload = {
  target: {
    level: string;
    entityId: string;
    path: {
      sectionNumber: string;
    };
  };
  type: string;
  changes: {
    title: string;
    content: string;
  };
  effectiveDate: Date;
  description: string;
  metadata: {
    financeAct?: string | undefined;
    year?: number | undefined;
  };
};

export type AmendSubSectionPayload = {
  target: {
    level: string;
    entityId: string;
    path: {
      subSectionNumber: string;
    };
  };
  type: string;
  changes: {
    content: string;
  };
  effectiveDate: Date;
  description: string;
  metadata: {
    financeAct?: string | undefined;
    year?: number | undefined;
  };
};

export type AmendPartPayload = {
  target: {
    level: string;
    entityId: string;
    path: {
      partNumber: string;
    };
  };
  type: string;
  changes: {
    title: string;
  };
  effectiveDate: Date;
  description: string;
  metadata: {
    financeAct?: string | undefined;
    year?: number | undefined;
  };
};

export type AmendChapterPayload = {
  target: {
    level: string;
    entityId: string;
    path: {
      chapterNumber: string;
    };
  };
  type: string;
  changes: {
    title: string;
  };
  effectiveDate: Date;
  description: string;
  metadata: {
    financeAct?: string | undefined;
    year?: number | undefined;
  };
};

export type PartObjType = PartObjectType & {
  sections: SectionObjType[];
};

export type UploadTaxLawModalProps = {
  onClose: () => void;
  onUpload: (formData: FormData) => void;
  isLoading: boolean;
};

export type UploadDecidedCaseModalProps = {
  onClose: () => void;
  onUpload: (formData: FormData) => void;
  isLoading: boolean;
};

export type HistoryTimelineType = {
  amendmentId: string;
  description: string;
  effectiveDate: string;
  entityId: string;
  target: {
    level: string;
    entityId: string;
    path?: {
      chapterNumber?: number;
      sectionNumber?: number;
      subSectionNumber?: number;
    };
  };
  metadata: {
    year: Date;
    _id: string;
    financeAct: string;
  };
  type: string;
};

export type ChapterResType = {
  _id: string;
  taxLaw: string;
  title: string;
  number: string;
  parts: PartObjType[];
};

export type SectionResType = SectionObjType;

export type UpdateSectionFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  section: SectionObjType;
};

export type AmendSectionFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  section: SectionObjType;
};

export type ScheduleObjType = {
  _id: string;
  taxLaw: string;
  title: string;
  number: string;
  content: string;
};
export type ScheduleResType = ScheduleObjType;

export type UpdateScheduleFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  schedule: ScheduleObjType;
};

export type UpdateSubSectionFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subsection: SubSectionObjType;
};

export type AmendSubSectionFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subsection: SubSectionObjType;
};

export type UpdateChapterFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chapter: ChapterObjType;
};

export type AmendChapterFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chapter: ChapterObjType;
};

export type CreateChapterFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taxLawId: string;
};

export type CreateScheduleFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taxLawId: string;
};

export type UpdatePartFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  part: PartObjType;
};

export type AmendPartFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  part: PartObjType;
};

export type AllTaxLawType = {
  _id: string;
  title: string;
  year: number;
  description: string;
  totalSections: number;
  chapters: ChapterObjType[];
  totalChapters: number;
  totalParts: number;
  totalSubsections: number;
  totalSchedules: number;
};

export type DecidedCaseType = {
  _id: string;
  suitNumber: string;
  title: string;
  judgmentDate: Date;
  court: string;
  keywords: string[];
  relatedTaxLaws: string[];
  fileUrl: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AllDecidedCasesProp = SearchProp & {
  totalDecidedCasesCount: number;
  allDecidedCases: [];
  userRole: string;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
  errorMessage?: string;
};

export type AllTaxLawsProp = SearchProp & {
  totalTaxLawsCount: number;
  allTaxLaws: AllTaxLawType[];
  userRole: string;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
  errorMessage?: string;
};

export type CircularLoaderProps = {
  text?: string;
  textClassName?: string;
  rollerClassName?: string;
  parentClassName?: string;
};

export type LoginUserPayloadProps = {
  email: string;
  password: string;
};

import type { CSSProperties } from 'react';

export type FormDataInput = CommonParams & {
  setValue: (text: string) => void;

  value: string;
  icon?: React.ReactNode;
};

// type ImageProps = {
//   url: string;
//   public_url: string;
// };

type CommonParams = {
  title: string;
  type: string;
  placeholder: string;
  required: boolean;
};

export type UserState = {
  currentUser: CurrentUserType;
  accessToken: string;
  refreshToken: string;
  loading?: boolean;
  error?: null;
};

export type SidebarComponentsProps = {
  toggle?: boolean | undefined;
  sideToggle?: boolean | undefined;
  handleSuperAdminMenuToggle?: () => void;
  handleSideToggle?: () => void;
  superAdminMenuOpen?: boolean | undefined;
  handleAdminMenuToggle?: () => void;
  adminMenuOpen?: boolean | undefined;
  handleTeacherMenuToggle?: () => void;
  teacherMenuOpen?: boolean | undefined;
  handleParentMenuToggle?: () => void;
  parentMenuOpen?: boolean | undefined;
  handleStudentMenuToggle?: () => void;
  studentMenuOpen?: boolean | undefined;
};

export type IdParamFetch = {
  id: string;
};

// type TaxType = 'VAT' | 'PAYE' | 'WHT' | 'CIT' | 'CGT';
// type BusinessType = 'SME' | 'Individual' | 'Consultant';

export type CurrentUserType = {
  _id: string;
  address?: string;
  createdAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  isVerified: boolean;
  whatsappPhoneNumber: string;
  role: string;
  status?: string;
  updatedAt: Date;
  businessType: string;
  taxTypes: string[];
  isWhatsAppVerified: boolean;
  isSubscribedToTips: boolean;
};

type ImgProp = {
  src: string;
  alt: string;
};

export type ImageComponentProps = {
  imageObj: ImgProp | undefined;
  imageStyle: CSSProperties | string;
  imageContainerStyle: CSSProperties | string;
};

export type ReusableModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  modalStyle: string;
};

export type RequestEmailVerificationPayload = {
  email: string;
};

export type EmailVerificationPayload = {
  token: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginFormDataKey = keyof LoginFormData;

export type LoginParams = CommonParams & {
  field: LoginFormDataKey;
};

export type ResetPasswordFormData = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type RegisterUserPayloadProps = LoginFormData & {
  role: string;
  firstName: string;
  lastName: string;
  businessType: 'SME' | 'Individual' | 'Consultant';
  whatsappPhoneNumber: string;
  confirmPassword: string;
};

export type ButtonProps = {
  loading: boolean;
  title: string;
  alternateTitle: string;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  buttonContainerStyle?: CSSProperties | string;
  buttonStyle?: CSSProperties | string;
};

export type SearchProp = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type ReusableDecidedCaseTableProps = {
  data: DecidedCaseType[];
  loading: boolean;
  userRole: string;
  errorMessage?: string;
  title: string;
  totalRows: number;
  onPageChange: (page: number) => void;
};
export type ReusableTaxLawTableProps = {
  data: AllTaxLawType[];
  loading: boolean;
  userRole: string;
  errorMessage?: string;
  title: string;
  totalRows: number;
  onPageChange: (page: number) => void;
};

export type ReusableTableProps = {
  data: CurrentUserType[];
  loading: boolean;
  userRole: string;
  roleToFetch: string;
  title: string;
  totalRows: number;
  onPageChange: (page: number) => void;
};

export type OtherResponsePayloadType = {
  message: string;
  status: number;
  success: boolean;
};

export type ResetPasswordPayloadProps = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type SummaryStatisticsType = {
  totalCounts: number;
  userType: string;
};
