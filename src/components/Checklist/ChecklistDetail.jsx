// src/components/Checklist/ChecklistDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getChecklistItems, deleteChecklistItem, updateChecklistItemStatus } from '../../api/checklist';
import LoadingSpinner from '../UI/LoadingSpinner';

const ChecklistDetail = ({ token }) => {
  const { checklistId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getChecklistItems(checklistId, token);
        setItems(data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch checklist items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [checklistId, token]);

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteChecklistItem(checklistId, itemId, token);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (err) {
      setError(err.message || 'Failed to delete item');
    }
  };

  const handleToggleStatus = async (itemId) => {
    try {
      await updateChecklistItemStatus(checklistId, itemId, token);
      setItems(
        items.map((item) =>
          item.id === itemId ? { ...item, status: !item.status } : item
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to update item status');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Checklist Items</h2>
        <Link
          to={`/checklists/${checklistId}/items/new`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add New Item
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No items found in this checklist.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => handleToggleStatus(item.id)}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
                  />
                  <span
                    className={`ml-3 ${item.status ? 'line-through text-gray-400' : 'text-gray-700'}`}
                  >
                    {item.itemName}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/checklists/${checklistId}/items/${item.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChecklistDetail;