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

    p.play("Would you like me to read the headlines ?");
    p.then(confirmation);
  });
});

//News By Source
intent("What's new with $(term* (.*))", (p) => {
  let newsAPIUrl = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}`;

  if (p.term.value) {
    newsAPIUrl = `${newsAPIUrl}&q=${p.term.value}`;
  }

  api.request(newsAPIUrl, (err, res, body) => {
    const { articles } = JSON.parse(body);

    if (!articles.length) {
      p.play("Sorry, please try searching for news for a different thing.");
      return;
    }
    savedArticles = articles;

    p.play({ command: "newHeadlines", savedArticles });
    p.play(`This is what is going on for ${p.term.value}`);

    p.play("Would you like me to read the headlines ?");
    p.then(confirmation);
  });
});

//Search by category
const CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "football",
  "technology",
];
const CATEGORIES_INTENT = `${CATEGORIES.map(
  (category) => `${category}~${category}`
).join("|")}|`;

intent(`Give me the latest $(C~ ${CATEGORIES_INTENT}) news`, (p) => {
  let newsAPIUrl = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}`;

  if (p.C.value) {
    newsAPIUrl = `${newsAPIUrl}&category=${p.C.value}&country=in`;
  }

  api.request(newsAPIUrl, (err, res, body) => {
    const { articles } = JSON.parse(body);

    if (!articles.length) {
      p.play("Sorry, please try searching for news for a different category.");
      return;
    }
    savedArticles = articles;

    p.play({ command: "newHeadlines", savedArticles });
    p.play(`This is the latest news in the field of ${p.C.value}`);

    p.play("Would you like me to read the headlines ?");
    p.then(confirmation);
  });
});

//News from India

intent("Give me the latest news from India", (p) => {
  let newsAPIUrl = `http://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`;

  api.request(newsAPIUrl, (err, res, body) => {
    const { articles } = JSON.parse(body);

    if (!articles.length) {
      p.play("Sorry, could not find news from India");
      return;
    }
    savedArticles = articles;

    p.play({ command: "newHeadlines", savedArticles });
    p.play(`Here is the (latest|recent) news from India`);

    p.play("Would you like me to read the headlines ?");
    p.then(confirmation);
  });
});

intent("(go|) back", (p) => {
  p.play({ command: "newHeadlines", savedArticles: [] });
});

intent("Open article number $(number* (.*))", (p) => {
  if (p.number.value) {
    p.play({ command: "open", number: p.number.value, savedArticles });
  }
});

const confirmation = context(() => {
  intent("Yes", async (p) => {
    for (let i = 0; i < savedArticles.length; i++) {
      p.play({ command: "highlight", article: savedArticles[i] });
      p.play(`${savedArticles[i].title}`);
    }
  });

  intent("No", (p) => {
    p.play("Okay, as you wish");
  });
});
