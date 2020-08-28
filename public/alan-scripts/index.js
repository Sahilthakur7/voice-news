// Use this sample to create your own voice commands
intent(
  "What does this app do?",
  "What can I do here?",
  reply("This app can fetch you the news")
);

intent("Who is Amit", (p) => {
  p.play("Pare mar patte");
});

intent("Start a command", (p) => {
  p.play({ command: "testCommand" });
});

const NEWS_API_KEY = "5df33018581b4916ba10b89c2a5502c9";
let savedArticles = [];

//News By Source
intent("Give me the news from $(source* (.*))", (p) => {
  let newsAPIUrl = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}`;

  if (p.source.value) {
    let formattedSource = p.source.value.toLowerCase().split(" ").join("-");
    newsAPIUrl = `${newsAPIUrl}&sources=${formattedSource}`;
  }

  api.request(newsAPIUrl, (err, res, body) => {
    const { articles } = JSON.parse(body);

    if (!articles.length) {
      p.play("Sorry, please try searching for news from a different source");
      return;
    }
    savedArticles = articles;

    p.play({ command: "newHeadlines", savedArticles });
    p.play(
      `Here are the (latest|recent) news headlines from ${p.source.value}`
    );
  });
});
