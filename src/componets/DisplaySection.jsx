import { useState } from 'react';
import Topics from './Topics';
import DisplayArticle from './DisplayArticle';

const DisplaySection = () => {
  const [displayTopics, setDisplayTopics] = useState(true);
  const [article, setArticle] = useState(false); // must be

  return (
    <>
      {displayTopics ? (
        <div>
          <Topics
            setDisplayTopics={setDisplayTopics}
            setArticle={setArticle}
            displayTopics={displayTopics}
          />
        </div>
      ) : null}
      {article ? (
        <div>
          <DisplayArticle
            article={article}
            displayTopics={displayTopics}
            setDisplayTopics={setDisplayTopics}
            setArticle={setArticle}
          />
        </div>
      ) : null}
    </>
  );
};

export default DisplaySection;
