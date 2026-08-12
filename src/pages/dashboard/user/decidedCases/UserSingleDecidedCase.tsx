import { useParams } from 'react-router-dom';
import SingleDecidedCaseComponent from '../../../../components/DecidedCases/SingleDecidedCaseComponent';

const UserSingleDecidedCase = () => {
  const { decidedCaseId } = useParams();

  if (!decidedCaseId) {
    return;
  }
  return <SingleDecidedCaseComponent id={decidedCaseId} />;
};

export default UserSingleDecidedCase;
