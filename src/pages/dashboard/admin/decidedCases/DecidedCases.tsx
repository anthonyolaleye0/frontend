import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Scale, AlertTriangle } from 'lucide-react';
import AllDecidedCases from '../../../../components/DecidedCases/AllDecidedCases';
import FooterSection from '../../../../components/HomePage/FooterSection';
import { CircularLoader } from '../../../../components/Loader';
import logo from '../../../../assets/images/smartTaxApp-removebg.png';
import type { ApiError, UserState } from '../../../../constants/types';
import useDecidedCaseApis from '../../../../services/decidedCaseService';

const DecidedCases = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user,
  );

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

  const { fetchDecidedCases } = useDecidedCaseApis();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['decided-cases', currentPage.toString(), limit, searchTrigger],
    queryFn: () =>
      fetchDecidedCases(currentPage.toString(), limit, searchTrigger),
    placeholderData: (prev) => prev,
  });

  const errorMessage =
    isError && axios.isAxiosError<ApiError>(error)
      ? error.response?.data?.message || error.message
      : '';

  const allDecidedCases = data?.data?.cases ?? [];
  const totalDecidedCasesCount = data?.data?.totalCount ?? 0;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Single Navigation Header */}
      <nav className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center focus:outline-none cursor-pointer"
          >
            <img src={logo} alt="Smart Tax Arena Logo" className="h-12 w-auto object-contain" />
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Account
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-10">
        
        {/* Page Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <Scale size={36} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Decided Tax Cases</h1>
              <p className="text-sm text-slate-600">
                Explore judicial precedents, landmark rulings, and comprehensive tax litigation summaries.
              </p>
            </div>
          </div>
        </div>

        {/* Error State Handling */}
        {isError && (
          <div className="my-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertTriangle size={20} />
            <span className="text-sm font-medium">{errorMessage || 'Failed to load decided cases.'}</span>
          </div>
        )}

        {/* Content Section */}
        {isLoading ? (
          <div className="my-24 flex justify-center py-20">
            <CircularLoader text="Loading Decided Cases..." />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
            <AllDecidedCases
              allDecidedCases={allDecidedCases}
              totalDecidedCasesCount={totalDecidedCasesCount}
              searchValue={searchValue}
              userRole={currentUser?.role}
              handleKeyPress={handleSearchKeyPress}
              setSearchValue={setSearchValue}
              isLoading={isLoading}
              handlePageChange={handlePageChange}
              errorMessage={errorMessage}
            />
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default DecidedCases;