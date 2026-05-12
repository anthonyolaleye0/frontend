import { useParams } from 'react-router-dom';
import ScheduleComponent from '../../../../components/TaxLaw/ScheduleComponent';

const SchedulePage = () => {
  const { taxLawId, scheduleId } = useParams();

  if (!scheduleId || !taxLawId) {
    return;
  }

  console.log('scheduleId:', scheduleId);
  console.log('taxLawId:', taxLawId);

  return (
    <div>
      <ScheduleComponent scheduleId={scheduleId} taxLawId={taxLawId} />
    </div>
  );
};

export default SchedulePage;
