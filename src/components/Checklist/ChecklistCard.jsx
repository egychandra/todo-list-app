import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const ChecklistCard = ({ checklist, onDelete }) => {
  if (!checklist) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {checklist.name || 'Untitled Checklist'}
      </h3>
      <div className="flex justify-between items-center">
        <Link
          to={`/checklists/${checklist.id}`}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          View Items
        </Link>
        {onDelete && (
          <Button
            onClick={() => onDelete(checklist.id)}
            variant="danger"
            size="sm"
            className="ml-2"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChecklistCard;