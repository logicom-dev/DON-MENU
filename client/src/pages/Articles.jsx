import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import MultiRangeSlider from "multi-range-slider-react";
import Button from "@mui/material/Button";
import { fetchArticles } from "../redux/actions/articles.action";
import { fetchArticlesById } from "../redux/actions/articles.action";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "../components/Modal";
import "../styles/articles-styles.scss";

export default function Articles() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue2, setMinValue2] = useState(0);
  const [maxValue2, setMaxValue2] = useState(50);
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(30); 
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  console.log("articleszzzzz" , articles)

  const [model, setModel] = useState(false);
  const [detail, setDetail] = useState({});

  const getData = (product) => {
    setDetail(product);
    setModel(true);
  };
  const handlerGetArticleById = (CodeCat) => {
    dispatch(fetchArticlesById(CodeCat));
    setModel(true);
  };

  useEffect(() => {
    dispatch(fetchArticles());
    // Add a scroll event listener to check for infinite scroll
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoadingMore
    ) {
      // You can adjust the threshold value (100) as needed.
      setIsLoadingMore(true);
      // Simulate loading delay
      setTimeout(() => {
        loadMoreArticles();
        setIsLoadingMore(false);
      }, 500);
    }
  };

  const loadMoreArticles = () => {
    // This function is called when the user scrolls to load more articles.
    // You can adjust the number of articles to load here.
    setDisplayCount((prevDisplayCount) => prevDisplayCount + 30);
  };

  const filteredProducts =
    articles &&
    articles.articles.filter((product) => {
      if (
        product.LibArt.toLowerCase().includes(search) ||
        product.Descrip.toLowerCase().includes(search)
      ) {
        return product;
      }
    });

  return (
    <div className="articles" style={{ minHeight: "calc(100vh - 400px)" }}>
      <section className="searchBar-section">
        <div className="searchBar">
          <input
            className="input"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <button className="button">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </section>

      <section className="slider-section">
        <MultiRangeSlider
          min={0}
          max={50}
          minValue={0}
          maxValue={50}
          onInput={(e) => {
            setMinValue(e.minValue);
            setMaxValue(e.maxValue);
          }}
          onChange={(e) => {
            setMinValue2(e.minValue);
            setMaxValue2(e.maxValue);
          }}
          label={false}
          ruler={false}
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          barLeftColor="grey"
          barInnerColor="yellow"
          barRightColor="grey"
          thumbLeftColor="yellow"
          thumbRightColor="yellow"
        />
        <div
          className="divOutput"
          style={{
            border: "none",
            paddingRight: "10px",
            width: "200px",
            marginBottom: "20px",
          }}
        >
          <div>Prix entre </div>
          <div>
            <span> {minValue} dt </span>
            <span> et {maxValue} dt </span>
          </div>
        </div>
      </section>

      <section>
        {articles.loading ? (
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
          <div className="display">
            {filteredProducts
              // .filter((product) => {
              //   return (
              //     product.prix1 > parseInt(minValue2, 10) &&
              //     product.prix1 < parseInt(maxValue2, 10)
              //   );
              // })
              .slice(0, displayCount) // Display a limited number of articles
              .map((product, index) => (
                <span key={index}>
                  <Card
                    onClick={() => handlerGetArticleById(product.CodeCat)}
                    variant="outlined"
                    row
                    sx={{
                      width: 320,
                      gap: 2,
                      "&:hover": {
                        boxShadow: "md",
                        borderColor: "neutral.outlinedHoverBorder",
                      },
                    }}
                    style={{ marginBottom: "10px" }}
                  >
                    <div style={{ display: "flex" }}>
                      <AspectRatio
                        ratio="1"
                        sx={{
                          width: 100,
                          marginLeft: 1,
                          marginTop: 1,
                          marginBottom: 1,
                          borderRadius: "10px"
                        }}
                      >
                        <picture>
                          <source
                            srcSet={!product.image_web ? require("../assets/large.jpg") : product.image_web}
                            type="image/webp"
                          />
                          <img
                            border-radius="10px"
                            radius={10}
                            src={!product.image_web ? require("../assets/large.jpg") : product.image_web}
                            loading="lazy"
                            alt=""
                          />
                        </picture>
                      </AspectRatio>

                      <div>
                        <Typography
                          level="h2"
                          fontSize="0.75rem"
                          id="card-description"
                          mb={0.5}
                          marginLeft="15px"
                          marginTop={2}
                        >
                          {product.LibArt.toLowerCase()}
                        </Typography>
                        <Typography
                          fontSize="sm"
                          aria-describedby="card-description"
                          mb={1}
                          marginLeft="15px"
                          fontWeight="lighter"
                          variant="outlined"
                        >
                          {product.prix1} dt
                        </Typography>
                        <Button
                          onClick={() => getData(product)}
                          className="button-primary"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                    <Divider />
                  </Card>
                </span>
              ))}
            {model ? (
              <Modal
                prix1={detail.prix1}
                LibArt={detail.LibArt}
                Descrip={detail.Descrip}
                image_web={detail.image_web}
                CodeArt={detail.CodeArt}
                hide={() => setModel(false)}
              />
            ) : (
              <></>
            )}
          </div>
        )}

        {displayCount < filteredProducts.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isLoadingMore && <CircularProgress size={40} />}
          </div>
        )}
      </section>
    </div>
  );
}
