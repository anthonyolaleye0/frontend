// const host = import.meta.env?.VITE_API_HOST;

const loginUserRoute = `/auth/login`;
const registerUserRoute = `/auth/register`;
const requestEmailVerificationRoute = `/auth/resend-email-verification`;
const emailVerificationRoute = `/auth/email-verification`;
const requestAccessTokenRoute = `/auth/request-access-token`;
const verifyUserEmailRoute = `/auth/email-verification/:token`;
const resendEmailVerificationLinkRoute = `/auth/resend-email-verification`;
const forgotPasswordRoute = `/auth/forgot-password`;
const resetPasswordRoute = `/auth/reset-password`;
const logoutUserRoute = `/auth/logout`;

const getAUserRoute = `users/get-a-user-by-id`;
const getAllUsersRoute = `users/get-all-users`;
const fetchTaxLawsRoute = `tax-laws/get-tax-laws`;
const fetchTaxLawByTaxLawIdRoute = `tax-laws/get-tax-law-by-id`;
const fetchSchedulesByTaxLawIdRoute = `tax-laws/get-tax-law-schedules-by-taxLawId`;
const fetchTaxLawChapterByChapterIdRoute = `tax-laws/get-tax-law-chapter-by-chapter-id`;
const updateSubSectionRoute = `tax-laws/update-tax-law-subsection-by-subsection-id`;
const updateSectionRoute = `tax-laws/update-tax-law-section-by-section-id`;
const updateScheduleRoute = `tax-laws/update-tax-law-schedule-by-schedule-id`;

const createSubSectionRoute = `tax-laws/create-tax-law-subsection-in-section-by-section-id`;
const createSectionRoute = `tax-laws/create-tax-law-section-in-part-by-part-id`;

const createAmendmentRoute = `amendments/create-amendment`;

const createChapterRoute = `tax-laws/create-tax-law-chapter-in-taxlaw-by-taxlaw-id`;
const createPartRoute = `tax-laws/create-tax-law-part-in-chapter-by-chapter-id`;
const createScheduleRoute = `tax-laws/create-tax-law-schedule-in-taxlaw-by-taxlaw-id`;
const updateChapterRoute = `tax-laws/update-tax-law-chapter-by-chapter-id`;
const updatePartRoute = `tax-laws/update-tax-law-part-by-part-id`;
const fetchTaxLawSectionBySectionIdRoute = `tax-laws/get-tax-law-section-by-sectionId`;
const fetchTaxLawScheduleByScheduleIdRoute = `tax-laws/get-tax-law-schedule-by-scheduleId`;

export {
  createAmendmentRoute,
  createChapterRoute,
  createPartRoute,
  createScheduleRoute,
  createSectionRoute,
  createSubSectionRoute,
  emailVerificationRoute,
  fetchSchedulesByTaxLawIdRoute,
  fetchTaxLawByTaxLawIdRoute,
  fetchTaxLawChapterByChapterIdRoute,
  fetchTaxLawScheduleByScheduleIdRoute,
  fetchTaxLawSectionBySectionIdRoute,
  fetchTaxLawsRoute,
  forgotPasswordRoute,
  getAllUsersRoute,
  getAUserRoute,
  loginUserRoute,
  logoutUserRoute,
  registerUserRoute,
  requestAccessTokenRoute,
  requestEmailVerificationRoute,
  resendEmailVerificationLinkRoute,
  resetPasswordRoute,
  updateChapterRoute,
  updatePartRoute,
  updateScheduleRoute,
  updateSectionRoute,
  updateSubSectionRoute,
  verifyUserEmailRoute,
};
