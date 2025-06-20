import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { renameItem } from '../redux/thunks';
import { getChecklistItem } from '../api/checklist';
import ChecklistItemForm from '../components/Checklist/ChecklistItemForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const EditItemPage = () => {
  const { checklistId, itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await getChecklistItem(checklistId, itemId, token);
        setItem(response.data);
        setError('');
      } catch (err) {
        console.error('Failed to load item:', err);
        setError(err.message || 'Failed to load item');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [checklistId, itemId, token]);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(renameItem({ 
        checklistId, 
        itemId, 
        newName: formData.itemName,
        token 
      }));
      
      navigate(`/checklists/${checklistId}`, {
        state: { message: 'Item updated successfully' }
      });
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.message || 'Failed to update item');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;
  if (!item) return <div className="text-center py-4">Item not found</div>;

  return (
    <div className="max-w-md mx-auto py-8">
      <ChecklistItemForm 
        initialData={item}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/checklists/${checklistId}`)}
        isEditing={true}
      />
    </div>
  );
};

export default EditItemPage;