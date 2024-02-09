import { useState, useContext } from 'react';
import { ActiveUserContext } from '../contexts/ActiveUser';
import { ErrContext } from '../contexts/ErrContext';
import { useNavigate } from 'react-router-dom';

const AddComment = ({ article_id, setAddComment, setAlowAddComment }) => {
  const [commentInput, setCommentInput] = useState('type your comment');
  const { activeUser } = useContext(ActiveUserContext);
  const { setErr } = useContext(ErrContext);
  const navigate = useNavigate();
  function postComment(article_id) {
    fetch(
      `https://news-lerning-project.onrender.com/api/articles/${article_id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: activeUser.username,
          body: commentInput,
        }),
      }
    )
      .then((response) => response.json())
      .then((body) => {
        setAlowAddComment(true);
        if (body.msg !== 'comment was added') {
          setErr(body.msg);
          navigate('/err');
        }
      })

      .catch((err) => {
        setErr(err);
        navigate('/err');
      });
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    if (commentInput === '') {
      return null;
    } else {
      postComment(article_id);
      setAddComment(false);
      setAlowAddComment(false);
    }
  }
  return (
    <form onSubmit={handleCommentSubmit}>
      <label htmlFor="user-comment">Insert your comment</label>
      <input
        type="text"
        id="user-comment"
        value={commentInput}
        onChange={(event) => {
          setCommentInput(event.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
export default AddComment;
