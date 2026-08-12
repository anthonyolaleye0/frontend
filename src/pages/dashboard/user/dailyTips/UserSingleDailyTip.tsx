import { useParams } from 'react-router-dom';
import SingleDailyTipComponent from '../../../../components/DailyTips/SingleDailyTipComponent';

const UserSingleDailyTip = () => {
  const { dailyTipId } = useParams();

  if (!dailyTipId) {
    return;
  }

  return <SingleDailyTipComponent id={dailyTipId} />;
};

export default UserSingleDailyTip;
