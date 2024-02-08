import { useState, useEffect } from 'react';
import DisplayArticle from './DisplayArticle';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Article = () => {
  const [article, setArticle] = useState(false);
  const [loadingCheckArticle, setLoadingCheckArticle] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://news-lerning-project.onrender.com/api/articles/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        setArticle(body);
      })
      .then(() => {
        setLoadingCheckArticle(true);
      });
  }, []);
  return (
    <>
      <div>
        {loadingCheckArticle ? (
          <DisplayArticle article={article} />
        ) : (
          <div>Loading article</div>
        )}

        <button
          onClick={() => {
            navigate(`/`);
          }}
        >
          Chose differnt topic
        </button>
      </div>
    </>
  );
};

export default Article;
