// src/components/Checklist/ChecklistForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';

const ChecklistForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [name, setName] = useState(initialData.name || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Checklist name cannot be empty');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSubmit({ name });
      navigate('/checklists');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isEditing ? 'Edit Checklist' : 'Create New Checklist'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="checklist-name" className="block text-gray-700 mb-2">
            Checklist Name
          </label>
          <input
            id="checklist-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter checklist name"
            autoFocus
          />
        </div>

        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              isEditing ? 'Update Checklist' : 'Create Checklist'
            )}
          </Button>
          
          <Button
            type="button"
            onClick={() => navigate('/checklists')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChecklistForm;