import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../utils/fetch";
import CommentisInput from "../../components/inputs/comments/CommetsInput";
import { getToken } from "../../utils/local";
import "./PostDetail.css";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = getToken();

  useEffect(() => {
    const fetchPost = async () => {
      const postRes = await getPostById(postId);
      if (postRes) {
        setPost(postRes);
      }
      setLoading(false);
    };
    fetchPost();
  }, [postId]);

  // Функція для оновлення поста після додавання коментаря
  const updatePostAfterComment = async () => {
    const postRes = await getPostById(postId);
    if (postRes) {
      setPost(postRes);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-text">{post.text}</p>
      <p className="post-author">Author: {post.author?.username || "Unknown"}</p>
      <div className="comments-section">
        <h4>Comments ({post.comments ? post.comments.length : 0}):</h4>
        <ul className="comment-list">
          {post.comments &&
            post.comments.map((comment, idx) => (
              <li key={idx} className="comment-item">
                <p className="comment-text">{comment.text}</p>
                <p className="comment-author">Author: {comment.author?.username || "Unknown"}</p>
              </li>
            ))}
        </ul>
      </div>
      {isLoggedIn && (
        <div>
          {/* Передаємо функцію для оновлення поста після додавання коментаря */}
          <CommentisInput postId={postId} updatePostAfterComment={updatePostAfterComment} />
        </div>
      )}
    </div>
  );
};

export default PostDetail;
