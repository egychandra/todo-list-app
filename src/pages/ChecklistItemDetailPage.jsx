import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { renameItem, deleteItem } from '../redux/thunks';
import ChecklistItemDetail from '../components/Checklist/ChecklistItemDetail';

const ChecklistItemDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateItem = (checklistId, itemId, newName) => {
    dispatch(renameItem({ checklistId, itemId, newName }));
  };

  const handleDeleteItem = (checklistId, itemId) => {
    dispatch(deleteItem({ checklistId, itemId }));
    navigate(`/checklists/${checklistId}`);
  };

  return (
    <ChecklistItemDetail
      onUpdateItem={handleUpdateItem}
      onDeleteItem={handleDeleteItem}
    />
  );
};

export default ChecklistItemDetailPage;