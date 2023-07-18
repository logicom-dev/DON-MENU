import { ArticleService } from '../Services/Article-Service';
import { useState, useEffect } from 'react';
import "./SearchBarSection.css";
import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/joy/Divider';
import AspectRatio from '@mui/joy/AspectRatio';
import Modal from './Modal';
import MultiRangeSlider from "multi-range-slider-react";

const SearchBarSection = () => {
  const [model, setModel] = useState(false);
  const [tempData, setTempdata] = useState([]);
  const getData = (prix1, LibArt, Descrip, image_web, CodeArt ) => {
    let tempData = [prix1, LibArt, Descrip, image_web, CodeArt ];
    setTempdata(item => [1, ...tempData]);
    return setModel(true);
  }
 

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue2, setMinValue2] = useState(0);
  const [maxValue2, setMaxValue2] = useState(0);

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    GetListArticles();
  }, [articles]);

  const GetListArticles = async () => {
    await ArticleService.fetchArticles()
      .then((res) => {
        setArticles(res.data);
      });
  }

  const [search, setSearch] = useState("");

  const filteredProducts = articles.filter((product) => {
    if (
      product.LibArt.toLowerCase().includes(search) ||
      product.Descrip.toLowerCase().includes(search)
    ) {
      return product;
    }
  });

  return (
    <div className="searchBarSection">
      <div class="searchBar">
        <input
          className="input"
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className="multi-range-slider-container"

      >

        <MultiRangeSlider
          min={0}
          max={50}
          minValue={0}
          maxValue={40}
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
          barInnerColor="#7e543b"
          barRightColor="grey"
          thumbLeftColor="#7e543b"
          thumbRightColor="#7e543b"
        />
        <div className="divOutput" style={{ border: "none", paddingRight: "10px", width: "200px" }}>
          <div>Prix entre </div>
          <div>
            <span>  {minValue} dt </span>
            <span> et {maxValue} dt </span>
          </div>
        </div>

      </div>
      <div className="display" >
        {filteredProducts.filter((product) => {
          return (product.prix1 > parseInt(minValue2, 10) && product.prix1 < parseInt(maxValue2, 10));
        }).map((product) => (
          <article >
            <Card

              variant="outlined"
              row
              sx={{
                width: 320,
                gap: 2,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
              }}
            >
              <div style={{ "display": "flex" }}>

                <AspectRatio ratio="1" sx={{ width: 100, marginLeft: 1, marginTop: 1, marginBottom:1}}>
                <picture>
                    <source srcset={product.image_web} media="(max-width: 767px)" />
                    <source srcset={product.image_web} media="(min-width: 768px) and (max-width: 1023px)" />
                    <source srcset={product.image_web} media="(min-width: 1024px)" />
                    <img
                      border-radius='10px'
                      radius={10}
                      src={product.image_web}
                      srcSet={product.image_web}
                      loading="lazy"
                      alt=""
                    />
                  </picture>
                </AspectRatio>

                <div>
                  <Typography level="h2" font-size="0.75rem" id="card-description" mb={0.5} marginLeft="15px" marginTop={2}>
                    {(product.LibArt).toLowerCase()}
                  </Typography>
                  <Typography fontSize="sm" aria-describedby="card-description" mb={1}
                    marginLeft="15px"
                    font-weight="lighter"
                    font-size="0.5rem"

                    variant="outlined">
                    {product.prix1} dt
                  </Typography>
                  <button className="btn btn-primary" onClick={() => getData(product.prix1, product.LibArt, product.Descrip, product.image_web, product.CodeArt )}>
                    Details
                  </button>


                </div>


              </div>

              <Divider />
            </Card>
          </article>

        ))}
      </div>
      {
        model === true ? <Modal prix1={tempData[1]} LibArt={tempData[2]} Descrip={tempData[3]} image_web ={tempData[4]} CodeArt= {tempData[5]} hide={() => setModel(false)} /> : ''
      }
    </div>
  );
};

export default SearchBarSection;