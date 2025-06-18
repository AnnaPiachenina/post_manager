import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import PostForm from './PostForm';

function PostCreate() {
  const navigate = useNavigate();

  const onSuccess = () => {
    alert('Příspěvek byl vytvořen.');
    navigate('/');
  };

  const handleCreate = async (data) => {
    await createPost(data);
    onSuccess();
  };

  return (
    <div className="flex justify-center sm:px-0.5 px-4">
        <div className="p-4">
            <PostForm onSubmit={handleCreate} />
        </div>
    </div>


  );
}

export default PostCreate;
