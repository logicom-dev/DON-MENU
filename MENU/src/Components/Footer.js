import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn, MDBCol
} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdbreact';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export default function Footer() {
  const adress = process.env.REACT_APP_ADDRESS
  const phone = process.env.REACT_APP_PHONE_NUMBER
  const facebook = process.env.REACT_APP_FACEBOOK
  const instagram = process.env.REACT_APP_INSTAGRAM
  return (
    <MDBFooter className='bg-light text-center text-white'>

      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <MDBCol md="4" lg="3" xl="4" className='mx-auto mb-md-0 mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
            <p>
              <MDBIcon icon="home" className="me-4" />

              {adress}
            </p>

            <p>
              <MDBIcon icon="phone" className="me-3" /> {phone}
            </p>
          </MDBCol>
          <MDBBtn
            floating
            className='m-1'

            href={facebook}

          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'

            href={instagram}

          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>




        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgb(13 13 13 / 87%)', padding: '10' }}>
        © 2023 Copyright
        <a className='text-yellow' style={{ color: '#eee6cf' }} href='https://21c-digital.com/'>
          21C'DIGITAL
        </a>
      </div>
    </MDBFooter>
  );
}