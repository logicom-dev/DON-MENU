import {Routes,Route,BrowserRouter, Navigate} from "react-router-dom"

import Navbarre from './Components/Navbarre';

import ListeParCategorie from './Components/Articles/ListeParCategorie'

import CategorieArticle from './Components/Categories/CategorieArticle'

import ArticleList from './Components/Articles/ArticleList';

import Categorie from "./Components/Categories/Categorie";

import Categorie1 from "./Components/Categories/Categorie1";

import Categorie2 from "./Components/Categories/Categorie2";

import Categorie3 from "./Components/Categories/Categorie3";

import Cart from "./Components/Articles/Cart";

import Footer from "./Components/Footer";
import SearchBarSection from "./Components/SearchBarSection";


import './App.css';

function App() {
  return (
    <BrowserRouter basename="/">
    <Navbarre/>
    
    

    
    <Routes>
    <Route path="/" element={<Categorie/>}></Route>  
    
   
    <Route path="/ArticleList"  element={<ArticleList/>}/>
    <Route path='/listeParCategorie' element={<ListeParCategorie/>}/>
    <Route path='/CategorieArticle' element={<CategorieArticle/>}/>
    <Route path='/Categorie1' element={<Categorie1/>}/>
    <Route path='/Categorie2' element={<Categorie2/>}/>
    <Route path='/Categorie3' element={<Categorie3/>}/>

    <Route path='/Articlesearch' element={<SearchBarSection/>}/>
    <Route path='/Categoriesearch' element={<Categorie/>}/>
    <Route path="/cart" element={<Cart/>}/>
    
    

    

    </Routes>
   
    <Footer/>
    </BrowserRouter>

    
  );
}

export default App;
