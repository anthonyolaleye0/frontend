import { useParams } from 'react-router-dom';
import UserDetails from '../../../../components/User/UserDetails';

const SingleUserPage = () => {
  const { userId } = useParams<{ userId: string }>();

  console.log('userId inside single student page file:', userId);

  if (!userId) {
    return;
  }

  return <UserDetails id={userId} />;
};

export default SingleUserPage;
