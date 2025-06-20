import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchChecklists } from '../redux/thunks';
import { resetLoading } from '../redux/slices/checklistSlice';
import ChecklistCard from '../components/Checklist/ChecklistCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ChecklistPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { checklists, loading, error } = useSelector(state => state.checklist);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchChecklists(token));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        dispatch(resetLoading());
        console.warn('Loading timeout after 30 seconds');
      }
    }, 30000);

    return () => clearTimeout(loadingTimeout);
  }, [dispatch, token, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
        <p className="ml-4 text-gray-600">Loading checklists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-red-100 text-red-700 rounded-md">
        <h2 className="text-xl font-bold mb-2">Error Loading Checklists</h2>
        <p>{error}</p>
        <button
          onClick={() => dispatch(fetchChecklists(token))}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Checklists</h1>
        <Link
          to="/checklists/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Create New Checklist
        </Link>
      </div>

      {checklists.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You don't have any checklists yet.</p>
          <Link
            to="/checklists/new"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-block"
          >
            Create Your First Checklist
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checklists.map((checklist) => (
            <ChecklistCard
              key={checklist.id}
              checklist={checklist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChecklistPage;