import { useState, useEffect, useContext } from "react";
import DisplayArticle from "./DisplayArticle";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ErrContext } from "../contexts/ErrContext";

const Article = () => {
  const { setErr } = useContext(ErrContext);
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
        // probably need to remake server err handler
        if (body.msg) {
          setErr(body.msg);
          navigate("/err");
        } else {
          setArticle(body);
        }
      })
      .then(() => {
        setLoadingCheckArticle(true);
      })
      .catch((err) => {
        setErr(err);
        navigate("/err");
      });
  }, []);
  return (
    <>
      <div className="main-content">
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
          Choose different topic
        </button>
      </div>
    </>
  );
};

export default Article;
