import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import Modal from '../components/Modal';
import "../styles/categories-style.scss";

const Menu = ({ items, loading }) => {
  const [model, setModel] = useState(false);
  const [detail, setDetail] = useState({});
  const getData = (product) => {
     setDetail(product);
     setModel(true);
  };

  return (
    <div className="display-menu">
      {items.map((product, index) => {
        return (
          <article key={index}>
            <Card
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
                  {loading ? (
                    <picture >
                      <CircularProgress />
                    </picture>
                  ) : (
                    <picture>
                      <source 
                        src={!product.image_web ? require("../assets/large.jpg")  : product.image_web}
                        type="image/webp"
                      />
                      <img
                        border-radius="10px"
                        radius={10}
                        src={!product.image_web ? require("../assets/large.jpg")  : product.image_web}
                        loading="lazy"
                        alt=""
                      />
                    </picture>
                  )}
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
                  <Button className="button-primary"
                          onClick={() => getData(product)}
                          >Details</Button>
                </div>
              </div>
              <Divider />
            </Card>
          </article>
        );
      })}
      {
        model ? <Modal          prix1={detail.prix1} 
                                LibArt={detail.LibArt}
                                Descrip={detail.Descrip}
                                image_web ={detail.image_web}
                                CodeArt= {detail.CodeArt}
                                hide={() => setModel(false)} 
                                /> : ''
      }
    </div>
  );
};

export default Menu;
