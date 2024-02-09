import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ActiveUserContext } from '../contexts/ActiveUser';
import { useContext, useState } from 'react';
import { ErrContext } from '../contexts/ErrContext';
import { useNavigate } from 'react-router-dom';

const Comment = ({ comment, handleViewComments }) => {
  const navigate = useNavigate();
  const { setErr } = useContext(ErrContext);
  const { activeUser } = useContext(ActiveUserContext);
  const [commentDeleteCheck, setCommentDeleteCheck] = useState(false);
  function handleDeleteComment() {
    setCommentDeleteCheck(true);
    fetch(
      `https://news-lerning-project.onrender.com/api/comments/${comment.comment_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {}) //check what arrives from API server
      .then(() => {
        setCommentDeleteCheck(false);
      })
      .then(() => {
        handleViewComments(comment.article_id, true);
      })

      .catch((err) => {
        setErr(err);
        navigate('/err');
      });
  }

  return (
    <>
      <div>{comment.author}</div>
      <div>{moment(comment.created_at).format('LLLL')}</div>
      <br></br>
      <div>{comment.body}</div>
      <div>
        <button>
          <FontAwesomeIcon icon={faThumbsUp} />
          {comment.votes}
        </button>
        {activeUser ? (
          activeUser.username === comment.author ? (
            <button disabled={commentDeleteCheck} onClick={handleDeleteComment}>
              {commentDeleteCheck ? 'deleting your comment' : 'delete comment'}
            </button>
          ) : null
        ) : null}
      </div>
    </>
  );
};
export default Comment;
