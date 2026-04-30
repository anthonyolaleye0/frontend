import axios from 'axios';
import { appEnum } from '../constants/enum';
import { store } from '../redux/store';
import { requestAccessTokenRoute } from './ApiRoutes';

const host = import.meta.env?.VITE_API_HOST;

const requestNewAccessToken = async () => {
  console.log('I am requesting for a new access token...');
  const { user } = store.getState() as { user: { refreshToken?: string } };
  const refreshToken = user?.refreshToken;
  try {
    const response = await axios.post(
      `${host}${requestAccessTokenRoute}`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-app-client': appEnum,
        },
      }
    );

    console.log('requestNewAccessToken response:', response);
    return response.data || null;
  } catch (error) {
    console.error('requestNewAccessToken error:', error);
    return null;
  }
};

export default requestNewAccessToken;
