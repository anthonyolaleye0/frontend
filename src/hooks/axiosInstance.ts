// import axios, { type AxiosRequestConfig } from 'axios';
// import { updateAccessToken } from '../redux/authSlice';
// import { store } from '../redux/store';
// import logoutHelper from './logoutHelper';
// import requestNewAccessToken from './requestNewAccessToken';

// const host = import.meta.env.VITE_API_HOST;

// type CustomAxiosRequestConfig = AxiosRequestConfig & {
//   _retry?: boolean;
// };

// const axiosInstance = axios.create({
//   baseURL: host,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// let isLoggingOut = false;
// axiosInstance.interceptors.request.use((config) => {
//   const { user } = store.getState() as { user: { accessToken?: string } };

//   const token = user?.accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;

//     if (originalRequest.url?.includes('/login')) {
//       return Promise.reject(error);
//     }

//     console.log('error.response.status:', error.response.status);

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         console.log('Access token expired. Requesting new access token...');
//         const newAccessToken = await requestNewAccessToken();

//         console.log('axiosInstance newAccessToken:', newAccessToken);

//         if (newAccessToken) {
//           store.dispatch(updateAccessToken(newAccessToken));
//           originalRequest.headers = originalRequest.headers || {};
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axiosInstance(originalRequest);
//         }

//         if (!isLoggingOut) {
//           isLoggingOut = true;
//           logoutHelper();
//           // window.location.href = '/login';
//         }
//         return Promise.reject(error);
//       } catch (refreshError) {
//         console.error(
//           'Refresh token expired or invalid. Logging out...',
//           refreshError,
//         );
//         if (!isLoggingOut) {
//           isLoggingOut = true;
//           logoutHelper();
//           // window.location.href = '/login';
//         }
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// // axiosInstance.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config as CustomAxiosRequestConfig;

// //     // 🚨 IMPORTANT: skip refresh logic for login request
// //     if (originalRequest.url?.includes('/login')) {
// //       return Promise.reject(error);
// //     }

// //     if (
// //       error.response &&
// //       error.response.status === 401 &&
// //       !originalRequest._retry
// //     ) {
// //       originalRequest._retry = true;

// //       try {
// //         console.log('Access token expired. Refreshing...');

// //         const newAccessToken = await requestNewAccessToken();

// //         if (newAccessToken) {
// //           store.dispatch(updateAccessToken(newAccessToken));

// //           originalRequest.headers = originalRequest.headers || {};
// //           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

// //           return axiosInstance(originalRequest);
// //         }

// //         // ❌ refresh failed → logout
// //         if (!isLoggingOut) {
// //           isLoggingOut = true;
// //           logoutHelper();
// //         }

// //         return Promise.reject(error); // ✅ VERY IMPORTANT
// //       } catch (refreshError) {
// //         if (!isLoggingOut) {
// //           isLoggingOut = true;
// //           logoutHelper();
// //         }

// //         return Promise.reject(refreshError); // ✅
// //       }
// //     }

// //     return Promise.reject(error); // ✅ ALWAYS reject
// //   },
// // );

// export default axiosInstance;

import axios, { type AxiosRequestConfig } from 'axios';
import { updateAccessToken } from '../redux/authSlice';
import { store } from '../redux/store';
import logoutHelper from './logoutHelper';
import requestNewAccessToken from './requestNewAccessToken';

const host = import.meta.env.VITE_API_HOST;

type CustomAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

const axiosInstance = axios.create({
  baseURL: host,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // 'x-app-client': appEnum,
  },
});

let isLoggingOut = false;
axiosInstance.interceptors.request.use((config) => {
  const { user } = store.getState() as { user: { accessToken?: string } };

  const token = user?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log('Access token expired. Requesting new access token...');
        const newAccessToken = await requestNewAccessToken();

        console.log('axiosInstance newAccessToken:', newAccessToken);

        if (newAccessToken) {
          store.dispatch(updateAccessToken(newAccessToken));
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else if (newAccessToken === null) {
          if (!isLoggingOut) {
            isLoggingOut = true;
            logoutHelper();
            window.location.href = '/login';
          }
          return;
        }
      } catch (refreshError) {
        console.error(
          'Refresh token expired or invalid. Logging out...',
          refreshError,
        );
        if (!isLoggingOut) {
          isLoggingOut = true;
          logoutHelper();
          window.location.href = '/login';
        }
        return;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
