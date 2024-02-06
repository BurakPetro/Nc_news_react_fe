import '../styles/DisplayArticle.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
const DisplayArticle = ({
  article,
  displayTopics,
  setArticle,
  setDisplayTopics,
}) => {
  return (
    <div className="aritcle-block">
      <h2>{article.title}</h2>
      <div className="author-block">
        <span className="author">{article.author}</span>
        <span className="article-date">
          {moment(article.created_at).format('LLLL')}
        </span>
      </div>
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
          {displayTopics ? (
            <button
              className="view-comments"
              onClick={() => {
                setArticle(article), setDisplayTopics(false);
              }}
            >
              <FontAwesomeIcon icon={faComment} />
              {article.comment_count}
            </button>
          ) : (
            <button
              className="close-comments"
              onClick={() => {
                setArticle(false), setDisplayTopics(true);
              }}
            >
              Close comments
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayArticle;
//button should save activ topic
