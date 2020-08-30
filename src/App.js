import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";

const alanKey =
  "750693dfa013c5668d74d2710da179ac2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, savedArticles }) => {
        if (command === "newHeadlines") {
          console.log("savedArticles-----", savedArticles);
          setNewsArticles(savedArticles);
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="LOGO"
        />
      </div>
      <NewsCards articles={newsArticles} />
    </div>
  );
};

export default App;
