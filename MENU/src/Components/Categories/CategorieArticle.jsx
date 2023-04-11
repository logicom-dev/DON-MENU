import React from 'react';

import { useEffect, useState } from 'react'
import { CategorieService } from '../../Services/Categories-service';


import AccordionArticle from '../Articles/AccordionArticle';

import {Link} from "react-router-dom"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import AspectRatio from '@mui/joy/AspectRatio';

import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';

export default function CategorieArticle() {


  //Les categories 
    const[categorie,setcategorie] = useState([]);
    useEffect(() => {
    console.log(categorie)
    GetCategorie();
  },[]);


  const GetCategorie=async()=>{
      CategorieService.fetchCategorie()
      .then((res) => {
        setcategorie(res.data);
  });
  }


  

  return (
    <div classname = "container"  style={{ width: '100rem', "display":"flex","flexWrap":"wrap"}}>

    {categorie.map((cat,i)=>
    
      
       <Card 
      sx={{
  
        width: 500,
        bgcolor: 'initial',
        boxShadow: 'none',
        '--Card-padding': ' 5px',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <AspectRatio ratio="4/3">
          <figure>
            <img
              src={cat.Image}
              srcSet={cat.Image}
              loading="lazy"
              alt={cat.CodeCat}
  
              
            />
          </figure>
        </AspectRatio>
        <CardCover
          className="gradient-cover"
          sx={{
            '&:hover, &:focus-within': {
              opacity: 1,
            },
            opacity: 0,
            transition: '0.1s ease-in',
            background:
              'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
          }}
        >
          {/* The first box acts as a container that inherits style from the CardCover */}
          <Box>
            <Box
              md={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexGrow: 1,
                alignSelf: 'flex-end',
              }}
            >
              <Typography level="h1" noWrap md={{ fontSize: 'lg' }}>
                <Link openInNewTab
                  href={<AccordionArticle categ ={cat.CodeCat}/>}
                  target = {<AccordionArticle categ ={cat.CodeCat}/>}


                  //onClick={() => openInNewTab("./ArticleList/" + cat.CodeCat})}

                  //catego = {cat.CodeCat}

                  //onClick={() => openInNewTab(console.log(articles))}
                  //onClick={() => openInNewTab("./ArticleList")}

                  //onClick={() => openInNewTab(articles.filter((item) =>{return item.CodeArt==cat.CodeCat}))}

                  // var newarticles=articles.filter((item)=>{
                  //return item._id!==_id
                  //})
                  //onClick={()=>{ArticleService.fetchArticleByCat(cat.CodeCat)}}
                  overlay
                  underline="none"
                  sx={{
                    color: '#fffff',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    display: 'in-Line',
                  }}
                >
                   
                   {cat.CodeCat} - {cat.DesCat} 
                   
                </Link>
                
              </Typography>
            </Box>
          </Box>
        </CardCover>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 1.5, alignItems: 'center' }}>
        
        <Typography sx={{ fontSize: 'md', fontWeight: 'md' }}>
        
        </Typography>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> {cat.CodeCat} - {cat.DesCat}</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography>
          <AccordionArticle categ ={cat.CodeCat}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
    
       
      </Box>
      
      

    </Card>
 
    
    
    
    )}


     </div>
  
  );
    }

   