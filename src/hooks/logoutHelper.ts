import { clearUser } from '../redux/authSlice';
import { store } from '../redux/store';

const logoutHelper = () => {
  const dispatch = store.dispatch;

  dispatch(clearUser());
  console.log('All redux stores cleared due to logout...');
};

export default logoutHelper;
