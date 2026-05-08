import { useParams } from 'react-router-dom';
import SectionComponent from '../../../../components/TaxLaw/SectionComponent';

const SectionPage = () => {
  const { chapterId, taxLawId, sectionId } = useParams();

  if (!chapterId || !taxLawId || !sectionId) {
    return;
  }

  console.log('chapterId:', chapterId);
  console.log('taxLawId:', taxLawId);
  console.log('sectionId:', sectionId);
  return (
    <div>
      <SectionComponent
        sectionId={sectionId}
        chapterId={chapterId}
        taxLawId={taxLawId}
      />
    </div>
  );
};

export default SectionPage;
