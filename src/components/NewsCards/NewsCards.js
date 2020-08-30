import React from "react";
import NewsCard from "../NewsCard/NewsCard";

import useStyles from "./styles";
import { Grid, Grow, Typography } from "@material-ui/core";

import { infoCards } from "../../constants/infoCards";

const NewsCards = ({ articles }) => {
  const classes = useStyles();
  const renderNewsCards = () => {
    const newsCards = articles.map((el, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
          <NewsCard article={el} i={index} />
        </Grid>
      );
    });
    return newsCards;
  };

  const renderHomeCards = () => {
    const homeCards = infoCards.map((infoCard, index) => {
      return (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          className={classes.infoCard}
          style={{ display: "flex" }}
        >
          <div
            className={classes.card}
            style={{ backgroundColor: infoCard.color }}
          >
            <Typography variant="h5">{infoCard.title}</Typography>
            {infoCard && infoCard.info ? (
              <Typography variant="h6">
                <strong>{infoCard.title.split(" ")[2]}:</strong>
                <br />
                {infoCard.info}
              </Typography>
            ) : null}
            <Typography variant="h6">
              Try Saying: <br />
              <i>{infoCard.text}</i>
            </Typography>
          </div>
        </Grid>
      );
    });
    return homeCards;
  };

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          container
          className={classes.container}
          alignItems="stretch"
          spacing="3"
        >
          {renderHomeCards()}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        container
        className={classes.container}
        alignItems="stretch"
        spacing="3"
      >
        {renderNewsCards()}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
