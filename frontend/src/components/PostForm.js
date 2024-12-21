import React, { useState } from 'react';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        setSuccess('Experience posted successfully!');
        setContent('');
      } else {
        setSuccess('Failed to post experience.');
      }
    } catch (err) {
      setSuccess('An error occurred.');
    }
  };

  return (
    <div>
      <h2>Share Your Corporate Experience</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your experience..."
          required
        />
        <button type="submit">Post</button>
      </form>
      {success && <p>{success}</p>}
    </div>
  );
};

export default PostForm;
