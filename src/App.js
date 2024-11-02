// src/App.js
import React from 'react';
import UpperFooter from './components/UpperFooter';
import BottomFooter from './components/BottomFooter';
import Header from './components/Header';
import Services from './components/Services';
import { Container } from '@mui/material';
function App() {
  return (
    <div>
      <Header />
 <Container>
      <Services />
 
    </Container>
    <UpperFooter />
    <BottomFooter />
    </div>
   
  );
}

export default App;
