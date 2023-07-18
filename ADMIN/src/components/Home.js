import React from 'react'
import { Alert } from 'react-bootstrap'
import {useLocation} from "react-router-dom";
export const Home = () => {
  const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const NomPrenom = searchParams.get('NomPrenom');
  return (
    <div>
      <Alert variant="info" className="mt-3">
        Bonjour, {NomPrenom}
      </Alert>
    </div>
  )
}
