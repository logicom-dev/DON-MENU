
import { useState, useEffect } from 'react';
import { CategorieService } from '../../Services/Categories-service';
import * as React from 'react';
import Carousel from 'react-grid-carousel';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
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
    <div className="btn-container">
      <Carousel cols={4} rows={1} gap={-2} loop = {true}>
      {categories.map((category, index) => {
        return (
          <Carousel.Item>
          <button
            type="button"
          
            className={`${
              activeCategory === category ? "filter-btn active" : "filter-btn"
            }`}
            key={index}
            onClick={() => filterItems(category)}
          >
             {(categorie.filter((item)=>{
                  return item.CodeCat=== category
                  })).map((cat, i) => 
                      {
                        return<Card sx={{ minHeight: '222px', width: 277 }}>
                      <CardCover>
                        <img
                          src={cat.Image}
                          srcSet={cat.Image}
                          loading="lazy"
                          alt=""
                        />
                      </CardCover>
                      <CardCover
                        sx={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 300px)',
                        }}
                      />
                      <CardContent sx={{ justifyContent: 'flex-end' }}>
                        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                        {cat.DesCat.toLowerCase()}
                        </Typography>
                        
                      </CardContent>
                    </Card>
                        
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
