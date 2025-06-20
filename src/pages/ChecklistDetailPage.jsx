import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, toggleItemStatus, deleteItem, renameItem } from '../redux/thunks';
import ChecklistItem from '../components/Checklist/ChecklistItem';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ChecklistDetailPage = () => {
  const { checklistId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { items, loading, error } = useSelector(state => state.checklist);
  
  useEffect(() => {
    dispatch(fetchItems({ checklistId, token }));
  }, [dispatch, checklistId, token]);

  const handleToggleStatus = (itemId) => {
    dispatch(toggleItemStatus({ checklistId, itemId, token }));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem({ checklistId, itemId, token }));
  };

  const handleRenameItem = (itemId, newName) => {
    dispatch(renameItem({ checklistId, itemId, newName, token }));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Checklist Items</h2>
      
      {items.length === 0 ? (
        <p className="text-gray-500">No items in this checklist yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              checklistId={checklistId}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteItem}
              onRename={handleRenameItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChecklistDetailPage;