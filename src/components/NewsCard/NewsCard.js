import React from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  i,
}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image={
            urlToImage ||
            "https://www.abc.net.au/news/linkableblob/8413676/data/abc-news-og-data.jpg"
          }
        />
        <div>
          <Typography variant="body2" color="textSecondary" component="text2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="text2">
            {source.name}
          </Typography>
        </div>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {" Learn More"}
        </Button>
        <Typography variant="h5" color="text-secondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
