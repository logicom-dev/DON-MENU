import React, { useEffect , useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-grid-carousel";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchCategories } from "../redux/actions/categoriesActions";
import { fetchArticlesById } from "../redux/actions/articles.action";
import Menu from "./Menu"

const CategoriesBody = () => {
  const [show , setShow] = useState(false)
  const categories = useSelector((state) => state.categories);
  const articlesById = useSelector((state) => state.articlesById);
  const dispatch = useDispatch();

  const handlerGetArticleById = (CodeCat) =>{
    dispatch(fetchArticlesById(CodeCat));
    setShow(true)
  }


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories =
    categories &&
    categories.categories &&
    categories.categories.filter((categorie) => categorie.visible_web === 1);

  return (
    <div> 
      {categories.loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Carousel cols={4} rows={1} gap={0} loop={true}>
          {filteredCategories.map((cat, index) => (
            <Carousel.Item key={index}>
              <Card onClick={() => handlerGetArticleById(cat.CodeCat)} 
                    style={{ minHeight: "222px", width: 277, margin: "5px" }}>
                <CardCover>
                  <img src={!cat.Image ? require("../assets/large.jpg")  : cat.Image} loading="lazy" alt="" />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent
                  sx={{ textAlign: "center", justifyContent: "flex-end" }}
                >
                  <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                    {cat.DesCat.toLowerCase()}
                  </Typography>
                </CardContent>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {show ? <Menu items={articlesById && articlesById.articlesById}
                    loading={articlesById && articlesById.loading}/> : <></>}
    </div>
  );
};

export default CategoriesBody;
