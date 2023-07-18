import React from 'react'
import { useState, useEffect } from 'react';
import { CategorieService } from '../../Services/Categories-service';
import { ArticleService } from '../../Services/Article-Service';
import Categories from './Categories';
import Menu from './Menu';
//import background from "./background.jpg";
import CommonSection from '../../Components/UI/common-section/CommonSection';
const Categorie = () => {


  const [articles, setArticles] = useState([]);
  useEffect(() => {
    GetListArticles();

  }, []);

  const GetListArticles = async () => {
    await ArticleService.fetchArticles()
      .then((res) => {
        setArticles(res.data);
      });
  }

  const [categorie, setcategorie] = useState([]);
  useEffect(() => {

    const GetCategorie = async () => {
      CategorieService.fetchCategorie()
        .then((res) => {
          setcategorie(res.data);
        });
    }
    GetCategorie();
  }, []);






  const allCategories = [...new Set(categorie.map((item) => item.CodeCat))];






  const [menuItems, setMenuItems] = useState(articles);
  const [activeCategory, setActiveCategory] = useState("");






  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === undefined) {
      setMenuItems(articles);
      return;
    }
    const newItems = articles.filter((item) => item.CodeCat === category);
    setMenuItems(newItems);
  };


//style={{ backgroundImage:`url(${background})` }}

  return (
    <div >
      
      <CommonSection  />
      <main className='The main' >

        <section className="menu section">

          <Categories
            categories={allCategories}
            activeCategory={activeCategory}
            filterItems={filterItems}
          />
          <Menu items={menuItems} />



        </section>
      </main>

    </div>
  );
};

export default Categorie
