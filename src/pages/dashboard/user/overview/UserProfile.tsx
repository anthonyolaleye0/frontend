import { useSelector } from 'react-redux';
import type { UserState } from '../../../../constants/types';

const UserProfile = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  return (
    <div className="w-full flex flex-col gap-4 items-center px-10">
      <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-2 bg-sidebar p-2">
        <div className="w-full md:w-[45%] space-y-2">
          <div className="text-sm flex justify-between">
            <span className="uppercase  font-bold underline">Full Name:</span>
            <span className="capitalize">{`${currentUser?.firstName} ${currentUser?.lastName}`}</span>
          </div>
          <div className="text-sm flex justify-between">
            <span className="uppercase  font-bold underline">Email:</span>
            <span className="">{currentUser?.email}</span>
          </div>
        </div>

        <div className="w-full md:w-[45%] space-y-2">
          <div className="text-sm flex justify-between">
            <span className="uppercase  font-bold underline">Phone:</span>
            <span className="capitalize">{currentUser?.whatsappPhoneNumber || ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
