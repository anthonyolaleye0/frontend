import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import ImageComponent from '../../../../components/ImageComponent';
import { Button } from '../../../../components/ui/button';
import {
  profileImageContainerStyle,
  profileImageStyle,
} from '../../../../constants/styles';
import type { UserState } from '../../../../constants/types';

const UserProfile = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );
  console.log('currentUser:', currentUser);
  const imageObj = currentUser.profileImage && {
    src: currentUser.profileImage.url,
    alt: `${currentUser.firstName}`,
  };

  const handleCopyRefCode = async () => {
    if (!currentUser?.referralCode) return;

    const referralUrl = `${window.location.origin}/register?ref=${currentUser.referralCode}`;

    console.log('referralUrl:', referralUrl);
    try {
      const data = await navigator.clipboard.writeText(referralUrl);
      console.log('data:', data);
      toast.success('Referral Link copied. You can now share with friends.');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An Error occurred:', error);
        toast.error('An error occurred');
      }
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 items-center px-10">
      <div className="">
        <ImageComponent
          imageObj={imageObj}
          imageStyle={profileImageStyle}
          imageContainerStyle={profileImageContainerStyle}
        />
      </div>

      <div className="">
        <Button
          onClick={handleCopyRefCode}
          className="cursor-pointer w-32 bg-navy-blue"
        >
          Refer User
        </Button>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-2 bg-sidebar p-2">
        <div className="w-full md:w-[45%] space-y-2">
          <div className="text-sm flex justify-between">
            <span className="uppercase  font-bold underline">Full Name:</span>
            <span className="capitalize">{`${currentUser.firstName} ${currentUser.lastName}`}</span>
          </div>
          <div className="text-sm flex justify-between">
            <span className="uppercase  font-bold underline">Email:</span>
            <span className="">{currentUser.email}</span>
          </div>
        </div>

        <div className="w-full md:w-[45%] space-y-2">
          <div className="text-sm flex justify-between">
            <span className="uppercase  font-bold underline">Phone:</span>
            <span className="capitalize">{currentUser.phoneNumber || ''}</span>
          </div>
          <div className="text-sm flex justify-between">
            <span className="uppercase  font-bold underline">
              Refferal Code:
            </span>
            <span className="capitalize">{currentUser.referralCode || ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
