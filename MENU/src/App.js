import { Routes, Route, BrowserRouter} from "react-router-dom"
import Navbarre from './Components/Navbarre';
import Categorie from "./Components/Categories/Categorie";
import Footer from "./Components/Footer";
import SearchBarSection from "./Components/SearchBarSection";
import CartArticle from "./Components/Articles/Cart";
function App() {
  return (
    <BrowserRouter basename="/">
      <Navbarre />
      <Routes>
        <Route path="/" element={<Categorie />}></Route>
        <Route path='/Articlesearch' element={<SearchBarSection />} />
        <Route path='/cart' element={<CartArticle />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
