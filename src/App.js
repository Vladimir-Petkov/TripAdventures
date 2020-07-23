import React from 'react';
import './App.module.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';

const App = () => {   
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
