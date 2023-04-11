import * as React from 'react';

import Card from '@mui/joy/Card';

import Typography from '@mui/joy/Typography';

import AspectRatio from '@mui/joy/AspectRatio';

import Chip from '@mui/joy/Chip';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';  



const Menu = ({ items }) => {
  return (
    
  <div style ={{"display":"flex","flexWrap":"wrap","justifyContent":"center", "marginTop":"-50px"}} classname = "container">
      {items.map((item) => {
        const { LibArt, imagepath, prix1, Descrip } = item;
      
        return ( 
          <article >
            <Card>
             <Card
          variant="outlined"
          row
          sx={{
            width: 320,
            gap: 2,
            marginRight : 0.5,
            marginLeft : 0.5,
            marginBottom : 0.5,
            marginTop : 0,
            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            '--Card-padding': ' 20px'
          }}
        >
          <AspectRatio ratio="1" sx={{ width: 90 }}>
            <img
              src={imagepath}
              srcSet={imagepath}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <div>
            <Typography level="h2" fontSize="lg" id="card-description" mb={0.5} >
            {LibArt}
            </Typography>
            
            
            <Chip
              variant="outlined"
              color="primary"
              size="sm"
              sx={{ pointerEvents: 'none' }}
            >
             {prix1} dt
            </Chip>
          </div>
          
        </Card>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>plus de détails</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {Descrip}
          </Typography>
        </AccordionDetails>
      </Accordion>
        </Card>
        
    
          </article>
        );
      })}
    </div>
    
  );
};


export default Menu;
