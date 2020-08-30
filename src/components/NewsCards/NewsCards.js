import React from "react";
import NewsCard from "../NewsCard/NewsCard";

import useStyles from "./styles";

import { Grid, Grow, Typography } from "@material-ui/core";

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
