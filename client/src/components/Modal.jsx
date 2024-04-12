import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { addToCart} from '../redux/actions/addToCart.action';
import 'react-toastify/dist/ReactToastify.css';



export default function Modal(props) {
  const buttonStyle = {
    backgroundColor: "#E6D15B",
    color: '#fff',
    borderRadius: '10px',
    height: '40px',
    border: 'none',
    margin: '0 0 0 0'
  };
  const [showModal, setShowModal] = React.useState(true);
  const dispatch = useDispatch();
  const modelStyle = {
    display: showModal ? 'block' : 'none',
    backgroundColor: 'rgba(0,0,0,0.8)',
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    props.hide();
  };
  const handleModalClose = () => {
    setShowModal(false);
    props.hide();
  };
  return (
    <section>
      <ToastContainer />
      {showModal && (
        <div className="modal show fade" style={modelStyle}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{props.LibArt}</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body" style={{ display: 'flex', justifyContent: 'center' }}>
                <Card variant="outlined" sx={{ width: 320 }}>
                  <CardOverflow>
                    <AspectRatio ratio="1">
                      <picture>
                        <source srcset={props.image_web} media="(max-width: 767px)" />
                        <source srcset={props.image_web} media="(min-width: 768px) and (max-width: 1023px)" />
                        <source srcset={props.image_web} media="(min-width: 1024px)" />
                        <img src={!props.image_web ? require("../assets/large.jpg") : props.image_web} loading="lazy" alt="" />
                      </picture>
                    </AspectRatio>
                  </CardOverflow>
                  <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                    <p>{props.Descrip}</p>
                  </Typography>
                  <Divider inset="context" />
                  <CardOverflow
                    variant="soft"
                    sx={{
                      display: 'flex',
                      gap: 1,
                      py: 0.5,
                      px: 'var(--Card-padding)',
                      bgcolor: 'background.level1',
                    }}
                  >
                    <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                      Prix : {props.prix1} Dt
                    </Typography>
                  </CardOverflow>
                  <button style={buttonStyle} 
                          onClick={() => handleAddToCart(props)}
                          >
                    Ajouter à la carte
                  </button>
                </Card>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  )

}

