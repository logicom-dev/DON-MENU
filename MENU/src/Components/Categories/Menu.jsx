import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/joy/Divider';
import AspectRatio from '@mui/joy/AspectRatio';
import { useState } from 'react';
import Modal from '../Modal';
const Menu = ({ items }) => {
  const [model, setModel] = useState(false);
  const [tempData, setTempdata] = useState([]);
  const getData = (prix1, LibArt, Descrip, image_web, CodeArt ) => {
    let tempData = [prix1, LibArt, Descrip, image_web, CodeArt ];
    setTempdata(item => [1, ...tempData]);
    return setModel(true);
  }

  return (
    <div className="display">
      {items.map((item) => {
        const { CodeArt, LibArt, prix1, Descrip, image_web} = item;

        return (

          <article key={CodeArt} >
            <Card
              variant="outlined"
              row
              sx={{
                width: 320,
                gap: 1,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                marginBottom: 1,
              }}
            >
              <div style={{ "display": "flex" }}>

                <AspectRatio ratio="1" sx={{ width: 100, marginLeft: 1, marginTop: 1, marginBottom: 1 }}>
                  <picture>
                    <source srcset={image_web} media="(max-width: 767px)" />
                    <source srcset={image_web } media="(min-width: 768px) and (max-width: 1023px)" />
                    <source srcset={image_web } media="(min-width: 1024px)" />
                    <img
                      border-radius='10px'
                      radius={10}
                      src={image_web}
                      srcSet={image_web}
                      loading="lazy"
                      alt=""
                    />
                  </picture>
                </AspectRatio>

                <div>
                  <Typography level="h2" font-size="0.75rem" id="card-description" mb={0.5} marginLeft="15px" marginTop={2}>
                    {LibArt.toLowerCase()}
                  </Typography>
                  <Typography fontSize="sm" aria-describedby="description" mb={1}
                    marginLeft="15px"
                    font-weight="lighter"
                    font-size="0.5rem"
                    line-height="1.5"
                    variant="outlined">
                    {prix1} dt
                  </Typography>
                  <button className="btn btn-primary" onClick={() => getData(prix1, LibArt, Descrip, image_web, CodeArt)}>
                    Details
                  </button>

                </div>
              </div>

              <Divider />
            </Card>
          </article>
        );
      })}
      {
        model === true ? <Modal prix1={tempData[1]} LibArt={tempData[2]} Descrip={tempData[3]} image_web ={tempData[4]} CodeArt= {tempData[5]} hide={() => setModel(false)} /> : ''
      }
    </div>
  );
};


export default Menu;
