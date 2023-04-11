//imports of the table components of bootstrap
import React from 'react';



import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';





//imports of Articles Services methods
import {ArticleService} from '../../Services/Article-Service';

import { useState,useEffect } from 'react';

export default function ArticleList() {
const [articles, setArticles] = useState([]);
useEffect(() => {
GetListArticles();
console.log(articles)
},[articles]);

const GetListArticles=async()=>{
await ArticleService.fetchArticles()
.then((res) => {
setArticles(res.data);
});
}
  return (
  

    <div style ={{"display":"flex","flexWrap":"wrap","justifyContent":"center", "border-spacing": "10px 10px"}} classname = "container">

    {articles.map((art,i)=>
    
    <Card variant="outlined" sx={{ width: 320, padding: '10px' }}>
    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {art.LibArt}
    </Typography>
    <Typography level="body2">{art.codeArt}</Typography>
    <IconButton
      aria-label="bookmark Bahamas Islands"
      variant="plain"
      color="neutral"
      size="sm"
      sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
    >
      <BookmarkAdd />
    </IconButton>
    <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
      <img
        src={art.imagepath}
        srcSet={art.imagepath}
        loading="lazy"
        alt=""
      />
    </AspectRatio>
    <Box sx={{ display: 'flex' }}>
      <div>
        <Typography level="body3">Prix:</Typography>
        <Typography fontSize="lg" fontWeight="lg">
        {art.prix1}
        </Typography>
      </div>
 
    </Box>
  </Card>
    
    )}
     </div>


  )
}

