import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DisplayArticle from "./DisplayArticle";
import "../styles/Topics.css";
import { ErrContext } from "../contexts/ErrContext";

const Topics = () => {
  const { setErr } = useContext(ErrContext);
  const navigate = useNavigate();
  const [topics, setTopics] = useState(false);
  const [loadingCheckTopics, setLoadingCheckTopics] = useState(false);

  const [articles, setArticles] = useState(false);
  const [articlesLoadingCheck, setArticlesLoadingCheck] = useState(false);
  function getTopics() {
    {
      return fetch(`https://news-lerning-project.onrender.com/api/topics`)
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          if (body.msg) {
            setErr(body.msg);
            navigate("/err");
          } else {
            setTopics(body);
          }
        })
        .then(() => {
          setLoadingCheckTopics(true);
        })
        .catch((err) => {
          setErr(err);
          navigate("/err");
        });
    }
  }

  useEffect(() => {
    getTopics();
  }, [articles]);

  function handleActiveTopic(topic) {
    let topicQuery = "articles";
    if (topic) {
      topicQuery = "articles?topic=" + topic;
    }
    {
      return fetch(
        `https://news-lerning-project.onrender.com/api/${topicQuery}`
      )
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          if (body.msg) {
            setErr(body.msg);
            navigate("/err");
          } else {
            setArticles(body);
          }
        })
        .then(() => {
          setArticlesLoadingCheck(true);
        })
        .catch((err) => {
          setErr(err);
          navigate("/err");
        });
    }
  }
  return (
    <>
      <div className="topic-block">
        Chose your topic<br></br>
        <button
          className="global-button"
          onClick={() => {
            handleActiveTopic();
          }}
        >
          View all articles
        </button>
        {loadingCheckTopics ? (
          topics.map((topic, index) => {
            return (
              <button
                className="global-button"
                key={index}
                onClick={() => {
                  handleActiveTopic(topic.slug);
                }}
              >
                {topic.slug}
              </button>
            );
          })
        ) : (
          <div>Loading topics</div>
        )}
      </div>
      <div>
        {articles ? (
          articlesLoadingCheck ? (
            articles.map((oneArticle, index) => {
              return (
                <div key={index}>
                  <DisplayArticle article={oneArticle} />
                  <button
                    className="global-button"
                    key={String(index)}
                    onClick={() => {
                      navigate(`/article/${oneArticle.article_id}`);
                    }}
                  >
                    View article
                  </button>
                </div>
              );
            })
          ) : (
            <div>Loading articles</div>
          )
        ) : null}
      </div>
    </>
  );
};

export default Topics;
