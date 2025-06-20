import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewChecklist } from '../redux/thunks';
import ChecklistForm from '../components/Checklist/ChecklistForm';

const CreateChecklistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);

  const handleSubmit = async (data) => {
    await dispatch(createNewChecklist({ name: data.name, token }));
    navigate('/checklists');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ChecklistForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/checklists')}
      />
    </div>
  );
};

export default CreateChecklistPage;