import React from 'react';
import Services from './components/Services';
import Clients from './components/Clients';

function MainSection() {
  return (
    <main className="main-section">
      <Services />
      <Clients />
    </main>
  );
}

export default MainSection;