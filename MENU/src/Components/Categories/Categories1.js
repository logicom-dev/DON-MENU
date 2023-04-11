import React from "react";
import { useState, useEffect } from 'react';
import { CategorieService } from '../../Services/Categories-service';

import Carousel from 'react-bootstrap/Carousel';

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
                            return<div><img src={cat.Image} alt={cat.DesCat}/></div>
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
