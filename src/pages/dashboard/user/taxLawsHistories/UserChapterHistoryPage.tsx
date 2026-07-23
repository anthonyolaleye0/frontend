import { useParams } from 'react-router-dom';
import ChapterHistoryComponent from '../../../../components/Amendment/Histories/ChapterHistoryComponent';

const UserChapterHistoryPage = () => {
  const { chapterId, taxLawId } = useParams();

  if (!chapterId || !taxLawId) {
    return;
  }

  console.log('chapterId:', chapterId);

  return <ChapterHistoryComponent chapterId={chapterId} taxLawId={taxLawId} />;
};

export default UserChapterHistoryPage;
