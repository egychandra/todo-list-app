import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewItem } from '../redux/thunks';
import ChecklistItemForm from '../components/Checklist/ChecklistItemForm';

const CreateItemPage = () => {
  const { checklistId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);

  const handleSubmit = async (data) => {
    await dispatch(createNewItem({ checklistId, itemName: data.itemName, token }));
    navigate(`/checklists/${checklistId}`);
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <ChecklistItemForm 
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/checklists/${checklistId}`)}
      />
    </div>
  );
};

export default CreateItemPage;