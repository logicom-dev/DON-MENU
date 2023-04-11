import React from 'react'
import { useEffect, useState } from 'react'
import { ArticleService } from '../../Services/Article-Service';

import Card from 'react-bootstrap/Card';

const AccordionArticle=(props)=> {

    const [articles, setArticles] = useState([]);
    useEffect(() => {
    GetListArticles();
  },[]);

    const GetListArticles = async(id) =>{
        let catego = props.categ;
        ArticleService.fetchArticleByCat(catego)
        .then((res) => {
        setArticles(res.data);

    });
    }

  return (


  <div style ={{"display":"flex","flexWrap":"wrap","justifyContent":"center", "border-spacing": "10px 10px"}} classname = "container">

{articles.map((art,i)=>

      <Card style={{ width: '18rem' , padding: '10px' }}>
      <Card.Img variant="top" src= {"./../" + art.imagepath} />

      <Card.Body>

        <Card.Title
        > {art.LibArt}</Card.Title>
        <Card.Text>
         {art.prix1} TND
        </Card.Text>

       
      </Card.Body>
    </Card>

)}
 </div>



  )
}


export default AccordionArticle
