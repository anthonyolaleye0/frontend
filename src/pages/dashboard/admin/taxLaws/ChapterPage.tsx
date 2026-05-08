import { useParams } from 'react-router-dom';
import ChapterComponent from '../../../../components/TaxLaw/ChapterComponent';

const ChapterPage = () => {
  const { chapterId, taxLawId } = useParams();

  if (!chapterId || !taxLawId) {
    return;
  }

  console.log('chapterId:', chapterId);
  console.log('taxLawId:', taxLawId);

  return (
    <div>
      <ChapterComponent chapterId={chapterId} taxLawId={taxLawId} />
    </div>
  );
};

export default ChapterPage;
