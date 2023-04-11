import React from "react";
import { useState, useEffect } from 'react';
import { CategorieService } from '../../Services/Categories-service';

import Carousel from 'react-bootstrap/Carousel';


import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Categories = ({ categories, filterItems, activeCategory }) => {

  const[categorie,setcategorie] = useState([]);
    useEffect(() => {

        const GetCategorie=async()=>{
            CategorieService.fetchCategorie()
            .then((res) => {
              setcategorie(res.data);
        });
        }    
    GetCategorie();
  },[]);

  

  
  return ( 
     
        <div className="btn-container" style ={{"display":"flex","flexWrap":"wrap","justifyContent":"center", "border-spacing": "10px 10px"}}>
          <Carousel >
          
          {categories.map((category, index) => {
            
            return (
              
              <Carousel.Item>
                <button
                className={`${
                  activeCategory === category ? "filter-btn active" : "filter-btn"
                }`}
                
                onClick={() => filterItems(category)}
                key={index}
                
                >
                {(categorie.filter((item)=>{
                      return item.CodeCat=== category
                      })).map((cat, i) => 
                          {
                            {const cols = cat.featured ? 2 : 1;
                              const rows = cat.featured ? 2 : 1;
                              return (
                                <ImageListItem style ={{'width': '500px' , 'height': '300px'}} key={cat.img} cols={cols} rows={rows}>
                                  <img
                                    {...srcset(cat.Image, 250, 200, rows, cols)}
                                    alt={cat.DesCat}
                                    loading="lazy"
                                  />
                                  <ImageListItemBar
                                    sx={{
                                      background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={cat.DesCat}
                                    position="top"
                                    actionIcon={
                                      <IconButton
                                        sx={{ color: 'white' }}
                                        aria-label={`star ${cat.DesCat}`}
                                      >
                                        <StarBorderIcon />
                                      </IconButton>
                                    }
                                    actionPosition="left"
                                  />
                                </ImageListItem>
                              );
                            }  
                          }  
                      
                      )}
                      
                </button> 
                </Carousel.Item>
              
              
            );
          })}
         </Carousel>
        </div>
        
       
   
   
  );
};

export default Categories;
