import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/joy/Divider';
import AspectRatio from '@mui/joy/AspectRatio';
import image from "./article2.jpg";
import { useState} from 'react';
import Modal from '../Modal';
/* import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardContent from '@mui/joy/CardContent'; */
/* const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const handleExpandClick = () => {
    setExpanded(!expanded);
  }; */
const Menu = ({ items }) => {

  const [model, setModel] = useState(false);
  const [tempData, setTempdata] = useState([]);

  const getData = (prix1, LibArt, Descrip) => {
    let tempData = [prix1, LibArt, Descrip];
    setTempdata(item => [1, ...tempData]);
    console.warn(tempData);
    return setModel(true);
  }

  return (
    <div className="display">
      {items.map((item) => {
        const { CodeArt, LibArt, imagepath, prix1, Descrip } = item;

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

                <AspectRatio ratio="1" sx={{ width: 100, /* marginLeft:2, marginTop: 2 */ }}>
                  <img
                    border-radius='10px'
                    radius={10}
                    src={image}
                    srcSet={imagepath}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>

                <div>
                  <Typography level="h2" font-size="0.75rem" id="card-description" mb={0.5} marginLeft="15px" marginTop={2}>
                    {LibArt.toUpperCase()}
                  </Typography>
                  <Typography fontSize="sm" aria-describedby="description" mb={1}
                    marginLeft="15px"
                    font-weight="lighter"
                    font-size="0.5rem"
                    line-height="1.5"
                    variant="outlined">
                    {prix1} dt
                  </Typography>
                  <button className="btn btn-primary" onClick={() => getData(prix1, LibArt, Descrip)}>
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
        model === true ? <Modal prix1={tempData[1]} LibArt={tempData[2]} Descrip={tempData[3]} hide={() => setModel(false)} /> : ''
      }
    </div>
  );
};
/* <CardActions disableSpacing>plus de détails
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="plus de détails"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{Descrip}</Typography>
          
        </CardContent>
      </Collapse>
 */

export default Menu;
