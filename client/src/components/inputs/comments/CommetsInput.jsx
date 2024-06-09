import React, { useState } from "react";
import { addComment } from "../../../utils/fetch";
import "./CommentsInput.css";

const CommentisInput = ({ postId, updatePostAfterComment }) => {
  const [commentData, setCommentData] = useState({ text: '' });

  const handleAddComment = async (e) => {
    e.preventDefault();
    await addComment(postId, commentData);
    setCommentData({ text: '' }); 
    // Оновлюємо пост після додавання коментаря
    updatePostAfterComment();
  };

  return (
    <form className="comment-form" onSubmit={(e) => handleAddComment(e)}>
      <textarea
        name="text"
        placeholder="Leave a comment"
        value={commentData.text}
        onChange={(e) => setCommentData({ ...commentData, text: e.target.value })}
      />
      <button type="submit">Comment</button>
    </form>
  );
}

export default CommentisInput;
