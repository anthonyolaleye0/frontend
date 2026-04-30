// import { useQueryClient } from '@tanstack/react-query';

const AdminDashboard = () => {
  // const queryClient = useQueryClient();

  // queryClient.prefetchQuery({
  //   queryKey: ['session'],
  //   queryFn: async () => {
  //     const response = await fetchActiveSession();
  //     return response.session;
  //   },
  // });
  return (
    <div>
      This is where we will have statistics of the things going on in the
      application. Will be done last. You can go to My Profile to see what has
      been done there
    </div>
  );
};

export default AdminDashboard;
