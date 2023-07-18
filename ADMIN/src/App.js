import { Routes, Route } from "react-router-dom"
import Listarticles from './components/articles/Listarticles';
import Insertarticle from './components/articles/Insertarticle';
import Editarticle from './components/articles/Editarticle';
import Listcategories from './components/categories/Listcategories';
import Insertcategorie from './components/categories/Insertcategorie';
import Editcategorie from './components/categories/Editcategorie';
import Menu from "./components/Navbarre";
import Commandes from "./components/commandes";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./components/auth";
import { Login } from "./components/Login";
import { RequireAuth } from "./components/RequireAuth";
import { Home } from "./components/Home";



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" exact element={<RequireAuth><Listcategories /></RequireAuth>} />
        <Route path="/Menu" exact element={<Menu />} />
        <Route path="/articles" exact element={<RequireAuth><Listarticles /></RequireAuth>} />
        <Route path="/articles/add" element={<Insertarticle />} />
        <Route path="/article/edit/:id" element={<Editarticle />} />
        <Route path="/categories/add" element={<Insertcategorie />} />
        <Route path="/categories/edit/:id" element={<Editcategorie />} />
        <Route path="/commande" element={<Commandes/>} />
      </Routes>
    </AuthProvider>
  );
}
export default App;