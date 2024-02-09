import '../styles/DisplayArticle.css';
import moment from 'moment';
import Comment from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { ErrContext } from '../contexts/ErrContext';
import { useNavigate } from 'react-router-dom';
import AddComment from './AddComment';
import { ActiveUserContext } from '../contexts/ActiveUser';

const DisplayArticle = ({ article }) => {
  const navigate = useNavigate();
  const { setErr } = useContext(ErrContext);
  const { activeUser } = useContext(ActiveUserContext);
  const [comments, setComments] = useState(false);
  const [comentsLoadingCheck, setComentsLoadingCheck] = useState(false);
  const [currentUserVote, setcurrentUserVote] = useState(article.votes);
  const [isVoted, setIsVoted] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [alowAddComment, setAlowAddComment] = useState(true);

  const handleArticleVotesClick = (aritcle_id) => {
    if (!isVoted) {
      setcurrentUserVote(currentUserVote + 1);
      setIsVoted(true);
      fetch(
        `https://news-lerning-project.onrender.com/api/articles/${aritcle_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inc_votes: 1 }),
        }
      )
        .then((response) => response.json())
        .catch((err) => {
          setErr(err);
          navigate('/err');
        });
    } else {
      setcurrentUserVote(currentUserVote - 1);
      setIsVoted(false);
      fetch(
        `https://news-lerning-project.onrender.com/api/articles/${aritcle_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inc_votes: -1 }),
        }
      )
        .then((response) => response.json())
        .catch((err) => {
          setErr(err);
          navigate('/err');
        });
    }
  };

  const handleViewComments = (aritcle_id) => {
    if (!comments) {
      return fetch(
        `https://news-lerning-project.onrender.com/api/articles/${aritcle_id}/comments`
      )
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          setComments(body);
        })
        .then(() => {
          setComentsLoadingCheck(true);
        });
    } else {
      setComments(false);
      setComentsLoadingCheck(false);
    }
  };
  return (
    <>
      <div className="aritcle-block">
        <h2>{article.title}</h2>
        <div className="author-block">
          <span className="author">{article.author}</span>
          <span className="article-date">
            {moment(article.created_at).format('LLLL')}
          </span>
        </div>
        <div>{article.body}</div>
        <div className="image-block">
          <img
            src={article.article_img_url}
            alt={`image for article ${article.title} `}
          />
        </div>
        <div className="actions">
          <div className="votes">
            <button
              onClick={() => {
                handleArticleVotesClick(article.article_id);
              }}
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                color={isVoted ? 'red' : 'black'}
              />
              {currentUserVote}
            </button>
          </div>
          <div className="comments">
            <button
              className="view-comments"
              onClick={() => {
                handleViewComments(article.article_id);
              }}
            >
              <FontAwesomeIcon icon={faComment} />
              {article.comment_count}
            </button>
          </div>
          <div>
            <button
              disabled={!activeUser ? alowAddComment : false}
              onClick={() => {
                setAddComment(true);
              }}
            >
              {activeUser
                ? alowAddComment
                  ? 'Add your comment'
                  : 'processing your comment'
                : 'login to post comments'}
            </button>
          </div>
        </div>
      </div>
      {comments ? (
        comentsLoadingCheck ? (
          comments.map((comment, index) => {
            return (
              <div key={index}>
                <Comment comment={comment} />
              </div>
            );
          })
        ) : (
          <div>Loading comments</div>
        )
      ) : null}
      {addComment ? (
        activeUser ? (
          <AddComment
            setAlowAddComment={setAlowAddComment}
            setAddComment={setAddComment}
            article_id={article.article_id}
          />
        ) : null
      ) : null}
    </>
  );
};

export default DisplayArticle;
