import '../styles/DisplayArticle.css';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
const DisplayArticle = ({ article }) => {
  fetch;
  return (
    <div className="aritcle-block">
      <h2>{article.title}</h2>
      <div className="author-block">
        <span className="author">{article.author}</span>
        <span className="article-date">
          {moment(article.created_at).format('LLLL')}
        </span>
      </div>
      {article.body ? <div>{article.body}</div> : null}
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
          <button className="view-comments">
            <FontAwesomeIcon icon={faComment} />
            {article.comment_count}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayArticle;
