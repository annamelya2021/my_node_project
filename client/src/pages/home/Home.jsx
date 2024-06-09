import React, { useState, useEffect } from "react";
import { getPosts, createPost } from "../../utils/fetch";
import { getToken } from "../../utils/local";
import Modal from "../../components/modal/Modal";
import { Link, NavLink } from "react-router-dom";
import "./Home.css";

const initialPostState = {
  title: "",
  text: "",
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const isLoggedIn = getToken();
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState(initialPostState);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRes = await getPosts();
      if (postsRes && Array.isArray(postsRes)) {
        // Sort posts by createdAt in descending order (most recent first)
        const sortedPosts = postsRes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts); // Set filtered posts initially as all posts
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search query
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const res = await createPost(postData);
    if (res) {
      const postsRes = await getPosts();
      if (postsRes && Array.isArray(postsRes)) {
        // Sort posts by createdAt in descending order (most recent first)
        const sortedPosts = postsRes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts); // Update filtered posts after adding a new post
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="home-container">
        <div className="search-container">

      <input
        type="text"
        className="search-input"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="create-post-button" onClick={() => setIsOpen(true)}>Create Post</button>
        </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {isLoggedIn ? (
            <form onSubmit={handleCreatePost}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={postData.title}
                onChange={handlePostChange}
              />
              <textarea
                name="text"
                placeholder="Text"
                value={postData.text}
                onChange={handlePostChange}
              />
              <button type="submit">Add Post</button>
            </form>
          ) : (
            <>
              <p>You must be logged in to create a post.</p>
              <NavLink to="login">Login</NavLink>
            </>
          )}
        </Modal>
      )}
      <ul>
        {filteredPosts.map((post, index) => (
          <li key={index} className="post">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-text">
              {post.text.slice(0, 100)}...
            </p>
            <p>
              <em>Author: {post.author?.username || "Unknown"}</em>
            </p>
            <p>Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
            <div>
              <h4>Comments ({post.comments.length}):</h4>
            </div>
            <Link className="read-more-link" to={`/posts/${post._id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
