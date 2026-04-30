import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AllUsers from '../../../../components/User/AllUsers';
import type { UserState } from '../../../../constants/types';
import useUserApis from '../../../../services/userService';

const Users = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  console.log('currentUser:', currentUser);

  const { fetchAllUsers } = useUserApis();

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryParams = new URLSearchParams(location.search);
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchTrigger, setSearchTrigger] = useState(searchParam || '');
  const limit = limitParam || '10';

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTrigger(searchValue);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['users', currentPage.toString(), limit, searchTrigger],
    queryFn: () => fetchAllUsers(currentPage.toString(), limit, searchTrigger),
    placeholderData: (prev) => prev,
  });

  const allUsers = data?.data?.userObj ?? [];
  const totalUsersCount = data?.data?.totalCount ?? 0;

  return (
    <AllUsers
      totalUsersCount={totalUsersCount}
      searchValue={searchValue}
      userRole={currentUser.role}
      handleKeyPress={handleSearchKeyPress}
      setSearchValue={setSearchValue}
      allUsers={allUsers}
      isLoading={isLoading}
      handlePageChange={handlePageChange}
    />
  );
};

export default Users;
