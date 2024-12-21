import React, { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Corporate Experiences</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <p>{post.content}</p>
            <small>Posted on {new Date(post.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
