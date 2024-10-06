import axios from "axios";

axios.defaults.baseURL = "https://dummyjson.com/";

export const fetchUsers = async () => {
  const { data } = await axios.get("users");
  return data.users;
};

export const fetchUserById = async (someonesId) => {
  const { data } = await axios.get(`users/${someonesId}`);
  return data;
};

export const fetchPostsByUserId = async (someonesId) => {
  const { data } = await axios.get(`posts/user/${someonesId}`);
  return data.posts;
};

export const fetchPostById = async (postId) => {
  const { data } = await axios.get(`posts/${postId}`);
  return data;
};
