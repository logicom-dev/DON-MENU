import {ArticleService} from '../Services/Article-Service';
import { useState,useEffect } from 'react';
import "./SearchBarSection.css"

//import Card from '@mui/joy/Card';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import AspectRatio from '@mui/joy/AspectRatio';




const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SearchBarSection = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleInput = (e) => {
    setPrice(e.target.value);
  };

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
  
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("0");

  const filteredProducts = articles.filter((product) => {
    if (
      product.LibArt.toLowerCase().includes(search) ||
      product.Descrip.toLowerCase().includes(search) 
    ) {
      return product;
    }
  });

  return (
    <div className="searchBarSection">
      <div class="searchBar">
        <input
          className="input"
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
       
        <button className="button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
      <input type="range" onInput={handleInput}  min="0" max="50" />
      <h5>Prix: {price}</h5>
      
      <div className="display" >
        {filteredProducts.filter((product) => {
            return product.prix1 > parseInt(price, 10);
          }).map((product) => (
            <article >
            <Card

         variant="outlined"
         row
         sx={{
           width: 320,
           gap: 2,
           '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
         }}
        >
       <div style ={{"display":"flex"}}>    
    
      <AspectRatio ratio="1" sx={{ width: 100,  marginLeft:2, marginTop: 2 }}>
        <img

          border-radius='10px' 
          src={product.imagepath}
          srcSet={product.imagepath}
          loading="lazy"
          alt=""
        />
      </AspectRatio>

      <div>
        <Typography level="h2" font-size= "0.75rem" id="card-description" mb={0.5} marginLeft="15px" marginTop={2}>
        {(product.LibArt).toLowerCase()}
        </Typography>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1} 
            marginLeft="15px" 
            font-weight= "lighter"
            font-size= "0.5rem"
           
            variant="outlined">
        {product.prix1} dt
        </Typography>
       
       
      </div>

           
      </div>
          
      <Divider />
    
    
      <CardActions disableSpacing>plus de détails
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="plus de détails"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{product.Descrip}</Typography>
          
        </CardContent>
      </Collapse>
    </Card>
         </article>
          
        ))}
      </div>
    </div>
  );
};

export default SearchBarSection;