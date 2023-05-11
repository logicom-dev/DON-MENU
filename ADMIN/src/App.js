import {Routes,Route} from "react-router-dom"
import Listarticles from './components/articles/Listarticles';
import Insertarticle from './components/articles/Insertarticle';
import Editarticle from './components/articles/Editarticle';
import Listcategories from './components/categories/Listcategories';
import Insertcategorie from './components/categories/Insertcategorie';
import Editcategorie from './components/categories/Editcategorie';
import Menu from "./components/Navbarre"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
return (
  <>
<Menu/>
<Routes>
<Route path="/" exact element={<Listcategories/>}/> 
<Route path="/articles" exact element={<Listarticles/>}/>
<Route path="/articles/add" element={<Insertarticle/>}/>
<Route path="/article/edit/:id" element={<Editarticle/>}/>
<Route path="/categories/add" element={<Insertcategorie/>}/>
<Route path="/categories/edit/:id" element={<Editcategorie/>}/>

</Routes>
</>
);
}
export default App;