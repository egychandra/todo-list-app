import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../UI/Button';
import { getChecklistItemDetail } from '../../api/checklist';

const ChecklistItemDetail = ({ 
  onUpdateItem,
  onDeleteItem
}) => {
  const { checklistId, itemId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await getChecklistItemDetail(checklistId, itemId, token);
        setItem(response);
        setEditedName(response.itemName);
      } catch (err) {
        console.error('Failed to fetch item details:', err);
        setError(err.message || 'Failed to load item details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [checklistId, itemId, token]);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await onUpdateItem(checklistId, itemId, editedName);
      setIsEditing(false);
      
      setItem(prev => ({ ...prev, itemName: editedName }));
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.message || 'Failed to update item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setIsLoading(true);
        await onDeleteItem(checklistId, itemId);
        navigate(`/checklists/${checklistId}`);
      } catch (err) {
        console.error('Delete failed:', err);
        setError(err.message || 'Failed to delete item');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
          {error}
        </div>
        <Button 
          variant="secondary" 
          onClick={() => navigate(`/checklists/${checklistId}`)}
        >
          Back to Checklist
        </Button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Item not found</p>
          <Button 
            variant="secondary" 
            onClick={() => navigate(`/checklists/${checklistId}`)}
          >
            Back to Checklist
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Item' : 'Item Details'}
        </h2>
        <Button 
          variant="secondary" 
          onClick={() => navigate(`/checklists/${checklistId}`)}
        >
          Back to Checklist
        </Button>
      </div>

      {isEditing ? (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Item Name</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
      ) : (
        <div className="mb-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{item.itemName}</h3>
            <p className={`inline-block px-2 py-1 rounded text-sm mt-1 ${item.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {item.status ? 'Completed' : 'Pending'}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            {item.updatedAt && item.updatedAt !== item.createdAt && (
              <p>Last Updated: {new Date(item.updatedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        {isEditing ? (
          <>
            <Button
              onClick={handleUpdate}
              disabled={isLoading || !editedName.trim()}
              className="flex-1"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => setIsEditing(true)}
              className="flex-1"
            >
              Edit Item
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isLoading}
              className="flex-1"
            >
              Delete Item
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChecklistItemDetail;