import {
  getSubscriptionPlansRoute,
  initializePaymentRoute,
} from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useSubscriptionApis = () => {
  const initializePayment = async (planId: string) => {
    console.log('planId:', planId);
    const response = await axiosInstance.post(
      `${initializePaymentRoute}/${planId}`,
    );

    return response.data;
  };

  const getSubscriptionPlans = async () => {
    const response = await axiosInstance.get(`${getSubscriptionPlansRoute}`);

    return response.data;
  };

  return { initializePayment, getSubscriptionPlans };
};

export default useSubscriptionApis;
