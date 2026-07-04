import { useParams } from 'react-router-dom';
import SectionHistoryComponent from '../../../../components/Amendment/Histories/SectionHistoryComponent';

const SectionHistoryPage = () => {
  const { sectionId, chapterId, taxLawId } = useParams();

  if (!sectionId || !chapterId || !taxLawId) {
    return;
  }

  console.log('chapterId:', chapterId);

  return (
    <SectionHistoryComponent
      sectionId={sectionId}
      chapterId={chapterId}
      taxLawId={taxLawId}
    />
  );
};

export default SectionHistoryPage;
