import { useQuery } from '@tanstack/react-query';
import type { IdParamFetch } from '../../constants/types';
import useUserApis from '../../services/userService';
import BackButton from '../BackButton';
import { CircularLoader } from '../Loader';
import { Separator } from '../ui/separator';

const UserDetails: React.FC<IdParamFetch> = ({ id }) => {
  const { fetchAUser } = useUserApis();

  const { data, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchAUser(id),
    placeholderData: (prev) => prev,
  });

  const aUser = data?.data;
  console.log('aUser:', aUser);

  return (
    <div className="mb-32">
      {isLoading ? (
        <CircularLoader text="Loading Details..." parentClassName="mt-[20%]" />
      ) : !aUser ? (
        <p>User data not found</p>
      ) : (
        <div className="items-center justify-center mt-4 mx-10">
          <Separator />
          <div className="">
            <BackButton />
          </div>
          <Separator />

          <p className="uppercase my-2 text-xl">User Details Page</p>
          <Separator className="mb-3" />

          <div className="border-2 rounded-lg border-gray-200 lg:w-[50vw] gap-3 flex flex-col p-4 text-[14px] lg:text-xl">
            <p className="my-1 text-xl">User Details</p>
            <Separator />

            <div className="border">
              <p className="grid grid-cols-[50px_1fr] md:grid-cols-[150px_1fr] pl-5 my-2 text-[14px] md:text-[13px] lg:text-[16px]">
                <span className="  ">ID</span>
                <span>{aUser?._id.toString()}</span>
              </p>

              <Separator />
              <p className="grid grid-cols-[50px_1fr] md:grid-cols-[150px_1fr] pl-5 my-2 text-[14px] md:text-[13px] lg:text-[16px]">
                <span className="  ">Verified</span>
                <span
                  className={
                    aUser?.status === 'active'
                      ? 'text-green-300'
                      : 'text-red-300'
                  }
                >
                  {aUser?.status === 'active' ? 'YES' : 'NO'}
                </span>
              </p>

              <Separator />
              <p className="grid grid-cols-[50px_1fr] md:grid-cols-[150px_1fr] pl-5 my-2 text-[14px] md:text-[13px] lg:text-[16px]">
                <span className="  ">Status </span>
                <span
                  className={
                    aUser?.status === 'active'
                      ? 'text-green-300 uppercase'
                      : 'text-red-300 uppercase'
                  }
                >
                  {aUser?.status}
                </span>
              </p>

              <Separator />
              <p className="grid grid-cols-[50px_1fr] md:grid-cols-[150px_1fr] pl-5 my-2 text-[14px] md:text-[13px] lg:text-[16px]">
                <span className="  ">Role</span>
                <span className="uppercase">{aUser?.role}</span>
              </p>

              <Separator />

              <p className="grid grid-cols-[50px_1fr] md:grid-cols-[150px_1fr] pl-5 my-2 text-[14px] md:text-[13px] lg:text-[16px]">
                <span className=" ">First Name</span>
                <span className="text-start uppercase">{aUser?.firstName}</span>
              </p>
              <Separator />
              <p className="grid grid-cols-[50px_1fr] md:grid-cols-[150px_1fr] pl-5 my-2 text-[14px] md:text-[13px] lg:text-[16px]">
                <span className=" ">Last Name</span>
                <span className="text-start uppercase">{aUser?.lastName}</span>
              </p>

              <Separator />
              <p className="grid grid-cols-[50px_1fr] md:grid-cols-[150px_1fr] pl-5 my-2 text-[14px] md:text-[13px] lg:text-[16px]">
                <span className="  ">Email</span>
                <span>{aUser?.email}</span>
              </p>

              <Separator />
              <p className="grid grid-cols-[50px_1fr] md:grid-cols-[150px_1fr] pl-5 my-2 text-[14px] md:text-[13px] lg:text-[16px]">
                <span className="  ">Phone</span>
                <span>{aUser?.phoneNumber}</span>
              </p>
            </div>
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default UserDetails;
