import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com'; 

export const getPosts = async () => {
  const res = await axios({
    method: 'get',
    url: `${API_URL}/posts`
  });
  return res.data;
};

export const createPost = async (data) => {
  const res = await axios({
    method:'post',
    url: `${API_URL}/posts`, 
    data: data,
  });
  return res.data;
};

export const updatePost = async (id, data) => {
  const res = await axios({
    method:'put',
    url:`${API_URL}/posts/${id}`,
    data: data,
  });
  return res.data;
};

export const getComments = async (postId) => {
  const res = await axios({
    methd:'get',
    url:`${API_URL}/posts/${postId}/comments`,
  });
  return res.data;
};
