import { useState } from 'react';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';

const ChecklistItem = ({ 
  item, 
  checklistId,
  onToggleStatus,
  onDelete,
  onRename
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.itemName);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusToggle = async () => {
    setIsLoading(true);
    try {
      await onToggleStatus(checklistId, item.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRename = async () => {
    if (newName.trim() && newName !== item.itemName) {
      setIsLoading(true);
      try {
        await onRename(checklistId, item.id, newName);
        setIsEditing(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`p-4 border rounded-lg mb-3 transition-all ${item.status ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <input
            type="checkbox"
            checked={item.status}
            onChange={handleStatusToggle}
            disabled={isLoading}
            className={`h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          />
          
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyPress={(e) => e.key === 'Enter' && handleRename()}
              autoFocus
              className="flex-1 px-2 py-1 border-b border-gray-400 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span 
              className={`flex-1 ${item.status ? 'line-through text-gray-500' : 'text-gray-800'}`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {item.itemName}
            </span>
          )}
        </div>

        <div className="flex space-x-2 ml-4">

          <Link
            to={`/checklists/${checklistId}/items/${item.id}`}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            View Details
          </Link>

          <Link
            to={`/checklists/${checklistId}/items/${item.id}/edit`}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-800"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(checklistId, item.id)}
            disabled={isLoading}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-2 flex justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default ChecklistItem;