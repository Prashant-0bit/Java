import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import './Footer.css';

export default function Footer() {
  return (
    <MDBFooter className='text-center style-footer'>
      <div className='text-center text-light p-3' style={{ backgroundColor: 'black', margin:'0', padding:'0' }}>
        © 2023 Mairotec.com
      </div>
    </MDBFooter>
  );
}
