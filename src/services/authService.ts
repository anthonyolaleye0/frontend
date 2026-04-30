import { useSelector } from 'react-redux';
import type {
  LoginFormData,
  RegisterUserPayloadProps,
  RequestEmailVerificationPayload,
  ResetPasswordFormData,
  UserState,
} from '../constants/types';
import {
  emailVerificationRoute,
  forgotPasswordRoute,
  loginUserRoute,
  logoutUserRoute,
  registerUserRoute,
  requestEmailVerificationRoute,
  resetPasswordRoute,
} from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useAuthApis = () => {
  const { refreshToken } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const emailVerification = async (token: string) => {
    const response = await axiosInstance.get(
      `${emailVerificationRoute}/${token}`,
    );
    // console.log(response);
    return response.data;
  };

  const loginUser = async (dataObj: LoginFormData) => {
    const response = await axiosInstance.post(`${loginUserRoute}`, dataObj);
    console.log('response:', response);
    console.log('response.data:', response?.data);
    return response?.data;
    // try {
    // } catch (error: any) {
    //   console.log('ERROR FULL:', error);
    //   console.log('ERROR RESPONSE:', error?.response);
    //   console.log('ERROR DATA:', error?.response?.data);

    //   throw error; // VERY IMPORTANT for react-query
    // }
  };

  const logoutUser = async () => {
    const response = await axiosInstance.post(
      `${logoutUserRoute}`,
      {},
      {
        headers: {
          'x-refresh-token': refreshToken,
        },
      },
    );
    console.log(response);
    return response.data;
  };

  const registerUser = async (data: RegisterUserPayloadProps) => {
    console.log('API register data:', data);
    const response = await axiosInstance.post(`${registerUserRoute}`, data);
    console.log(response);
    return response.data;
  };

  const requestEmailVerification = async (
    data: RequestEmailVerificationPayload,
  ) => {
    console.log('API register data:', data);
    const response = await axiosInstance.post(
      `${requestEmailVerificationRoute}`,
      data,
    );
    console.log(response);
    return response.data;
  };

  const resetPassword = async (data: ResetPasswordFormData) => {
    console.log('API reset password data:', data);
    const response = await axiosInstance.post(`${resetPasswordRoute}`, data);
    console.log(response);
    return response.data;
  };

  const forgotPassword = async (data: Omit<LoginFormData, 'password'>) => {
    console.log('API register data:', data);
    const response = await axiosInstance.post(`${forgotPasswordRoute}`, data);
    console.log(response);
    return response.data;
  };

  return {
    forgotPassword,
    resetPassword,
    emailVerification,
    registerUser,
    loginUser,
    logoutUser,
    requestEmailVerification,
  };
};

export default useAuthApis;
