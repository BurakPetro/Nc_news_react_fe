import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
const Comment = ({ comment }) => {
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
      </div>
    </>
  );
};
export default Comment;
