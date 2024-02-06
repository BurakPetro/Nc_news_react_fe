import React, { useEffect, useState } from 'react';

import DisplayArticle from './DisplayArticle';
import '../styles/Topics.css';
const Topics = ({ setArticle, setDisplayTopics, displayTopics }) => {
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
          if (body !== topics) {
            setTopics(body);
          }
        })
        .then(() => {
          setLoadingCheckTopics(true);
        });
    }
  }

  useEffect(() => {
    getTopics();
  }, [articles]);

  function hendleActiveTopic(topic) {
    let topicQuery = 'articles';
    if (topic) {
      topicQuery = 'articles?topic=' + topic;
    }
    {
      return fetch(
        `https://news-lerning-project.onrender.com/api/${topicQuery}`
      )
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          setArticles(body);
        })
        .then(() => {
          setArticlesLoadingCheck(true);
        });
    }
  }
  return (
    <>
      <div className="topic-block">
        Chose your topic<br></br>
        <button
          onClick={() => {
            hendleActiveTopic();
          }}
        >
          View all articles
        </button>
        {loadingCheckTopics ? (
          topics.map((topic, index) => {
            return (
              <button
                key={`${index}`}
                onClick={() => {
                  hendleActiveTopic(topic.slug);
                }}
              >
                {topic.slug}
              </button>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
      <div>
        {articlesLoadingCheck ? (
          articles.map((oneArticle, index) => {
            return (
              <DisplayArticle
                article={oneArticle}
                displayTopics={displayTopics}
                setDisplayTopics={setDisplayTopics}
                setArticle={setArticle}
                key={index}
              />
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
    </>
  );
};

export default Topics;
