import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts, updatePost } from '../services/api';
import PostForm from './PostForm';

function PostEdit() {
    //param id
    const { id } = useParams();
    // stav post pro chraneni vybraneho prispevku  
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // nacte vsehny prispevky s api
        getPosts().then(posts => {
            console.log(posts);
        //vyhleda prispevek s ID rovnym hodnote z param URL  
            const foundPost = posts.find(p => p.id === Number(id));
            setPost(foundPost);
        });
    }, [id]);

    //sprava o uspechu 
    const onSuccess = () => {
        alert('Příspěvek byl uložen.');
        navigate('/');
    };
    //asynchronni aktualizace prispevku ]
    const handleUpdate = async (data) => {
        await updatePost(post.id, data);
        onSuccess();
    };

    if (!post) return <div>
        
        Načítání...
        
        </div>;

    return (
        <div className="flex justify-center sm:px-0.5 px-4">
            <div className="p-4">
                <PostForm post={post} onSubmit={handleUpdate} />
            </div>
        </div>
    );
}

export default PostEdit;
