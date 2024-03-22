import "../styles/DisplayArticle.css";
import moment from "moment";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { ErrContext } from "../contexts/ErrContext";
import { useNavigate } from "react-router-dom";
import AddComment from "./AddComment";
import { ActiveUserContext } from "../contexts/ActiveUser";
import avatar from "../assets/avatar.jpg";

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
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inc_votes: 1 }),
        }
      )
        .then((response) => response.json())
        .catch((err) => {
          setErr(err);
          navigate("/err");
        });
    } else {
      setcurrentUserVote(currentUserVote - 1);
      setIsVoted(false);
      fetch(
        `https://news-lerning-project.onrender.com/api/articles/${aritcle_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inc_votes: -1 }),
        }
      )
        .then((response) => response.json())
        .catch((err) => {
          setErr(err);
          navigate("/err");
        });
    }
  };

  const handleViewComments = (aritcle_id, deleteCheck) => {
    if (!comments && !deleteCheck) {
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
    } else if (comments && !deleteCheck) {
      setComments(false);
      setComentsLoadingCheck(false);
    } else {
      setComments(false);
      setComentsLoadingCheck(false);
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
    }
  };
  return (
    <>
      <div className="aritcle-block">
        <header>
          <div className="title">
            <h2>
              <a href="#">{article.title}</a>
            </h2>
            <p>{article.body}</p>
          </div>
          <div className="author-block">
            <img src={avatar} alt="" />
            <div className="author">
              <span className="name">Brave Kid</span>
              <span className="published">
                {moment(article.created_at).format("LLLL")}
              </span>
            </div>
          </div>
        </header>
        <div className="image-block">
          <img
            src={article.article_img_url}
            alt={`image for article ${article.title} `}
          />
        </div>
        <footer>
          <ul className="actions">
            <li>
              <button
                type="button"
                className="button large"
                onClick={() => {
                  navigate(`/article/${article.article_id}`);
                }}
              >
                Continue Reading
              </button>
            </li>
          </ul>
          <ul className="stats">
            <li>
              <a href="#">General</a>
            </li>
            <li>
              <button
                onClick={() => {
                  handleArticleVotesClick(article.article_id);
                }}
              >
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  color={isVoted ? "#da3a18" : "rgba(160, 160, 160, 0.8)"}
                />
                {currentUserVote}
              </button>
            </li>
            <li>
              <button
                className="view-comments"
                onClick={() => {
                  handleViewComments(article.article_id);
                }}
                title="Log in to post a comment"
              >
                <FontAwesomeIcon
                  icon={faComment}
                  color="rgba(160, 160, 160, 0.8)"
                />
                {article.comment_count}
              </button>
            </li>
          </ul>
        </footer>
        <div className="more-actions">
          <div>
            <button
              disabled={!activeUser ? alowAddComment : false}
              onClick={() => {
                setAddComment(true);
              }}
            >
              {activeUser
                ? alowAddComment
                  ? "Add your comment"
                  : "processing your comment"
                : "login to post comments"}
            </button>
          </div>
        </div>
      </div>
      {comments ? (
        comentsLoadingCheck ? (
          comments.map((comment, index) => {
            return (
              <div key={index}>
                <Comment
                  comment={comment}
                  handleViewComments={handleViewComments}
                />
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
