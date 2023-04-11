import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn ,MDBCol
} from 'mdb-react-ui-kit';
import { MDBIcon} from 'mdbreact';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export default function Footer() {
  
  return (
    <MDBFooter className='bg-light text-center text-white'>
      
    <MDBContainer className='p-4 pb-0'>
      <section className='mb-4'>
      <MDBCol md="4" lg="3" xl="4" className='mx-auto mb-md-0 mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
            <p>
              <MDBIcon icon="home" className="me-4" />
              Av 14 janvier , Sfax, Tunisia
            </p>
            <p>
              <MDBIcon icon="envelope" className="me-3" />
              don.cafe.2022@gmail.com
            </p>
            <p>
              <MDBIcon icon="phone" className="me-3" /> +216 56 333 333
            </p>
          </MDBCol>
        <MDBBtn
          floating
          className='m-1'
          
          href='https://www.facebook.com/profile.php?id=100076269880846'
          
        >
          <MDBIcon fab icon='facebook-f' />
        </MDBBtn>

        <MDBBtn
          floating
          className='m-1'
         
          href='https://www.instagram.com/doncafe.resto/?igshid=YmMyMTA2M2Y%3D&fbclid=IwAR1a8ufYf5fE4DYnq2ajPKRwhZ9eUuAUvt075WQDSJugt1lWhKlf4VY_hag'
       
        >
          <MDBIcon fab icon='instagram' />
        </MDBBtn>

      

        
      </section>
    </MDBContainer>
    
    <div className='text-center p-3' style={{ backgroundColor: 'rgb(13 13 13 / 87%)', padding:'10' }}>
      © 2023 Copyright   
      <a className='text-yellow' href='https://logicom-dev.com/'>  LOGICOM
      </a>
    </div>
  </MDBFooter>
  );
}