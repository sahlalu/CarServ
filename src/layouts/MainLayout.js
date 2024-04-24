import React from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

const MainLayout = props => {
  return (
    <div className="mainlay-container">
      <div className="mainlay">
        <Header {...props} />
        <div className="main">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;