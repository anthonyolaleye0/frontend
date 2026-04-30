import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularLoader } from '../components/Loader';

const ReferralPage = () => {
  const { code } = useParams();

  const host = import.meta.env.VITE_API_HOST;

  console.log('code');

  useEffect(() => {
    if (code) {
      localStorage.setItem('refCode', code);
      window.location.href = `${host}/leads/ref?ref=${code}`;
    }
  }, [code]);
  return (
    <>
      <div className="mt-[15%]">
        <CircularLoader text="Redirecting to Whatsapp" />
      </div>
    </>
  );
};

export default ReferralPage;
// http://localhost:5173/ref/KB-F36ZNZDI
