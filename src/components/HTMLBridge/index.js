import React from 'react';

const HTMLPage = ({ pagePath }) => {

  return (
    <iframe
      title="Our Garage"
      src={pagePath}
      border="0"
      width="100%"
      height="100%"
      style={{
        border: 'none', 
        margin: '0',
      }}
    />
  );
};

export default HTMLPage;
