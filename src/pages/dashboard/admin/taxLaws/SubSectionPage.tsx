import { useParams } from 'react-router-dom';
import SubSectionComponent from '../../../../components/TaxLaw/SubSectionComponent';

const SubSectionPage = () => {
  const { chapterId, taxLawId, sectionId, subSectionId } = useParams();

  if (!chapterId || !taxLawId || !sectionId || !subSectionId) {
    return;
  }

  console.log('chapterId:', chapterId);
  console.log('taxLawId:', taxLawId);
  console.log('sectionId:', sectionId);
  console.log('subSectionId:', subSectionId);
  return (
    <div>
      <SubSectionComponent
        subSectionId={subSectionId}
        sectionId={sectionId}
        chapterId={chapterId}
        taxLawId={taxLawId}
      />
    </div>
  );
};

export default SubSectionPage;
