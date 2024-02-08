import '../styles/DisplayArticle.css';
import moment from 'moment';
import Comment from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const DisplayArticle = ({ article }) => {
  const [comments, setComments] = useState(false);
  const [comentsLoadingCheck, setComentsLoadingCheck] = useState(false);

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
      comentsLoadingCheck(false);
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
            <button>
              <FontAwesomeIcon icon={faThumbsUp} /> {article.votes}
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
    </>
  );
};

export default DisplayArticle;
