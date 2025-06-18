import { useEffect, useState } from 'react';
import { getComments } from '../services/api';
import CommentList from './CommentList';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEdit } from "react-icons/md";

function PostList() {
    ///stav pro seznam prispevku 
    const [posts, setPosts] = useState([]);
    //id pripeku pro vypis komentaru. Bude null, jestlize komentare nebyly otevreny pro cteni 
    const [selectedPostId, setSelectedPostId] = useState(null);
    //seznam komentaru 
    const [comments, setComments] = useState([]);
    //aktualni stranka s prispevky 
    const [page, setPage] = useState(1);
    //paginace 
    const POSTS_PER_PAGE = 10;
    const TOTAL_POSTS = 100;
    const TOTAL_PAGES = Math.ceil(TOTAL_POSTS / POSTS_PER_PAGE);

    const navigate = useNavigate();
    //nacitani prispevku pri montazi nebo zmene stranky 
    useEffect(() => {
        const fetchPosts = async () => {
            //posunuti pro stranky (napr. stranka c.1 se zacita s id 0, stranka c.2 id 10)
            const start = (page - 1) * POSTS_PER_PAGE;
            //pozadavek serveru o POST_PER_PAGE prispevku 
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${POSTS_PER_PAGE}`);
            //odpoved do formatu JSON
            const data = await res.json();
            //aktualizace stavu prispevku pro zobrazeni stranky 
            setPosts(data);
        };
        fetchPosts();
    }, [page]); //

    //tlacicko pro komentare 
    const showComments = (postId) => {
        if (selectedPostId !== postId) {
            getComments(postId).then(setComments);
            setSelectedPostId(postId);
        } else {
            setComments([]);
            setSelectedPostId(null);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-600 mb-5">

              Seznam příspěvků

              </h2>
            <ul>
                {/* mapovani prispevku */}
                {posts.map(post => (
                    <li
                        key={post.id}
                        className="border border-neutral-300 p-4 mb-2 rounded hover:bg-neutral-50"
                    >
                        <h3 className="text-xl font-semibold text-neutral-700">{post.title}</h3>
                        <p className="mb-2">{post.body}</p>
                        <div className="flex justify-between">

                            {/* tlacicko pro komentare */}

                            <button
                                onClick={() => showComments(post.id)}
                                className="bg-neutral-500 px-3 py-1 text-white  rounded hover:bg-neutral-600"
                            >
                                {selectedPostId === post.id ? 'Skrýt komentáře' : 'Komentáře'}
                            </button>

                            {/* tlacicko pro editace prispevku */}

                            <button
                                onClick={() => navigate(`/posts/edit/${post.id}`)}
                                className="flex gap-1 mr-2 bg-yellow-500 px-3 py-1 text-white rounded hover:bg-yellow-600"
                            >
                                <MdOutlineEdit size={20} />

                                Editovat

                            </button>
                        </div>
                        {/* komentare */}
                        {selectedPostId === post.id && (
                        <div className="mt-2 max-h-48 overflow-y-auto border border-neutral-300 rounded p-2">
                            <CommentList comments={comments} />
                        </div>
                        )}
                    </li>
                ))}
            </ul>

            {/* paginace */}
            
            <div className="flex flex-wrap justify-center mt-4 gap-0.5">
                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}    //vrati na predchozi stranku 
                    disabled={page === 1}   //neni aktivni, kdyz stranka je c.1
                    className="px-3 py-1 rounded bg-yellow-500 text-white disabled:opacity-50">

                    Předchozí

                </button>

                {/* cislovani stranek */}
                {Array.from({ length: TOTAL_PAGES}, (_, i) => i + 1).map(p => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1 rounded ${
                          p === page ? 'bg-neutral-400 text-white' : 'bg-neutral-300 text-neutral-800 hover:bg-neutral-200'}`}>
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => setPage(p => Math.min(p + 1, TOTAL_PAGES))}  //prejde na dalsi stranku 
                    disabled={page === TOTAL_PAGES}     //neni aktivni, kdyz stranka je c. TOTAL_PAGES
                    className="px-3 py-1 rounded bg-yellow-500 text-white disabled:opacity-50">

                    Další

                </button>
            </div>
        </div>
    );
}

export default PostList;