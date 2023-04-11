import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {ArticleService} from '../../Services/Article-Service';
import { useState,useEffect } from 'react';

export default function ListArticleCard0() {

  const [articles, setArticles] = useState([]);
useEffect(() => {
GetListArticles();
},[]);
const GetListArticles=async()=>{
ArticleService.fetchArticles()
.then((res) => {
setArticles(res.data);
});
}
return (
  <div className="container">
  {articles.map((art , i)=>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={art.imagepath}
          alt={art.LibArt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {art.abrev}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>



)}
</div>

);

}
