import type { AllUsersProp } from '../../constants/types';
import { formattedUserRoleForURL } from '../../hooks/functions';
import BackButton from '../BackButton';
import ReusableTable from '../ReusableTable';
import Search from '../Search';
import { Separator } from '../ui/separator';

const AllUsers = ({
  totalUsersCount,
  searchValue,
  userRole,
  handleKeyPress,
  setSearchValue,
  allUsers,
  isLoading,
  handlePageChange,
}: AllUsersProp) => {
  const formattedUserRole = formattedUserRoleForURL(userRole);
  // const dispatch = useDispatch();

  console.log('allUsers file:', allUsers);
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   const prefetchData = async () => {
  //     await Promise.all([
  //       queryClient.prefetchQuery({
  //         queryKey: ['subjects'],
  //         queryFn: async () => {
  //           const response = await fetchAllSubjects();
  //           return response.subjects;
  //         },
  //       }),
  //       queryClient.prefetchQuery({
  //         queryKey: ['classes'],
  //         queryFn: async () => {
  //           const response = await fetchAllClasses();
  //           dispatch(fetchAllClassesSuccess(response));
  //           return response.classes;
  //         },
  //       }),
  //     ]);
  //   };

  //   prefetchData();
  // }, [queryClient]);
  return (
    <div className="mb-20 mx-8">
      <Separator className="mt-10" />
      <div className="">
        <BackButton />
      </div>
      <Separator />

      <p className="uppercase my-3">All Users</p>
      <Separator />

      <div className="my-5 flex">
        <Search
          searchValue={searchValue}
          handleKeyPress={handleKeyPress}
          setSearchValue={setSearchValue}
        />
      </div>

      <div className="mb-20">
        <ReusableTable
          data={allUsers}
          loading={isLoading}
          title="All Users"
          roleToFetch="users"
          userRole={formattedUserRole}
          totalRows={totalUsersCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllUsers;
