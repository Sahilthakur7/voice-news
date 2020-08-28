import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import NewsCards from "./components/NewsCards/NewsCards";

const alanKey =
  "750693dfa013c5668d74d2710da179ac2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, savedArticles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(savedArticles);
        }
      },
    });
  }, []);
  return (
    <div>
      <h1>Voice recognition App</h1>
      <NewsCards articles={newsArticles} />
    </div>
  );
};

export default App;
