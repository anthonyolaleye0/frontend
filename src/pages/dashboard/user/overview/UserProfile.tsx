import { useSelector } from 'react-redux';
import BackButton from '../../../../components/BackButton';
import { Separator } from '../../../../components/ui/separator';
import type { UserState } from '../../../../constants/types';

const UserProfile = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  return (
    // <div className="w-full flex flex-col gap-4 items-center px-10">
    //   <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-2 bg-sidebar p-2">
    //     <div className="w-full md:w-[45%] space-y-2">
    //       <div className="text-sm flex justify-between">
    //         <span className="uppercase  font-bold underline">Full Name:</span>
    //         <span className="capitalize">{`${currentUser?.firstName} ${currentUser?.lastName}`}</span>
    //       </div>
    //       <div className="text-sm flex justify-between">
    //         <span className="uppercase  font-bold underline">Email:</span>
    //         <span className="">{currentUser?.email}</span>
    //       </div>
    //     </div>

    //     <div className="w-full md:w-[45%] space-y-2">
    //       <div className="text-sm flex justify-between">
    //         <span className="uppercase  font-bold underline">Phone:</span>
    //         <span className="capitalize">{currentUser?.whatsappPhoneNumber || ''}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full min-h-screen mb-32 flex flex-col px-4 py-6 bg-gray-50">
      <Separator className="mt-10" />
      <div className="">
        <BackButton />
      </div>
      <Separator />
      <p className="my-3 uppercase">User Profile Page</p>
      <Separator className="mb-6" />

      <div className="flex flex-col lg:flex-row gap-5 md:gap-7 items-center lg:items-start">
        <div className="flex flex-col mb-5 w-[45vw] md:w-[45%] lg:w-[55%]">
          <div className="flex flex-col items-center text-center mb-1 w-full border-2 p-4 rounded-lg h-[48vh] md:h-[55vh]">
            {/* <ImageComponent
              imageObj={imageObj}
              imageStyle={profileImageStyle}
              imageContainerStyle={profileImageContainerStyle}
            /> */}
            <h2 className="text-[16px] font-semibold text-gray-800 capitalize">
              {`${currentUser?.firstName} ${currentUser?.lastName}`}
            </h2>
            <h2 className="text-[13px] text-gray-800 capitalize">
              {currentUser?.role}
            </h2>
            <h2
              className={[
                currentUser?.isVerified
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-400 text-red-800',
                'text-[12px] capitalize py-1 px-2 mb-3 rounded-lg font-semibold',
              ].join(' ')}
            >
              {currentUser?.isVerified ? 'Verified' : 'Not Verified'}
            </h2>
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="w-full bg-white border-2 shadow-lg rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          <h3 className="text-lg md:text-xl font-semibold border-b pb-2 text-gray-700">
            Bio Data
          </h3>

          <div className="grid grid-cols-1 gap-4 lg:gap-2">
            <ProfileField
              label="User ID"
              value={currentUser?._id.toString() || 'N/A'}
            />

            <ProfileField
              label="Email"
              value={currentUser?.email || 'N/A'}
              style="lowercase"
            />

            <ProfileField
              label="Phone"
              value={currentUser?.whatsappPhoneNumber || 'N/A'}
            />
            <ProfileField
              label="Status"
              value={currentUser?.status || 'N/A'}
              style={`${currentUser?.status === 'active' && 'text-green-500'}`}
            />

            <ProfileField label="Role" value={currentUser?.role} />

            <ProfileField label="First Name" value={currentUser?.firstName} />

            <ProfileField label="Last Name" value={currentUser?.lastName} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  label,
  value,
  style,
}: {
  label: string;
  value: string;
  style?: string;
}) => (
  <div className="flex flex-col sm:flex-row sm:justify-between border-b pb-2">
    <span className="text-sm text-gray-600 tracking-wide">{label}:</span>
    <span
      className={[
        'text-sm text-gray-800 mt-1 sm:mt-0 break-all capitalize',
        style,
      ].join(' ')}
    >
      {value}
    </span>
  </div>
);

export default UserProfile;
