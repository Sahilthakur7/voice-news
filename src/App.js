import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey =
  "750693dfa013c5668d74d2710da179ac2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, savedArticles }) => {
        if (command === "newHeadlines") {
          console.log("articles----", savedArticles);
          alert("You have been alerted");
        }
      },
    });
  }, []);
  return (
    <div>
      <h1>Voice recognition App</h1>
    </div>
  );
};

export default App;
