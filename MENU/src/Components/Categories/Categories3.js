import React from "react";
import { useState, useEffect } from 'react';
import { CategorieService } from '../../Services/Categories-service';
import ImageList from '@mui/material/ImageList';
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
     
        <div className="btn-container" style ={{"display":"flex"}}>
          
          <ImageList
                sx={{
             width: '100rem',
             height: 400,
             // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
             transform: 'translateZ(0)',
           }}
           rowHeight={200}
           gap={-3}
          >

          
          {categories.map((category, index) => {
            
            
            return (
              
              
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
                          {const cols = cat.featured ? 2 : 1;
                            const rows = cat.featured ? 2 : 1;
                            return (
                              <ImageListItem key={cat.Image} cols={cols} rows={rows}>
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
                      
                      )}
                      
                </button> 
                
              
              
            );
          }
          )}
         </ImageList>
        </div>
        
       
   
   
  );
};

export default Categories;
