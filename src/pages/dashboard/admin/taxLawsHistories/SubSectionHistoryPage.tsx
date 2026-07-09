import { useParams } from 'react-router-dom';
import SubSectionHistoryComponent from '../../../../components/Amendment/Histories/SubSectionHistoryComponent';

const SubSectionHistoryPage = () => {
  const { subSectionId, sectionId, chapterId, taxLawId } = useParams();

  if (!subSectionId || !sectionId || !chapterId || !taxLawId) {
    return;
  }

  console.log('chapterId:', chapterId);

  return (
    <SubSectionHistoryComponent
      subSectionId={subSectionId}
      sectionId={sectionId}
      chapterId={chapterId}
      taxLawId={taxLawId}
    />
  );
};

export default SubSectionHistoryPage;
