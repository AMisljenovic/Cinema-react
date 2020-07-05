import React, { useEffect, useState } from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ imageUrl, prefix = '', renderProp }) => {
  const [image, setImage] = useState(null);


  useEffect(() => {
    loadImage(imageUrl);
  }, [imageUrl]);

  const loadImage = imageName => {
    import(`../../assets/${prefix}${imageName}.jpg`).then(imageRes => {
      setImage(imageRes.default);
    });
  };

  return (
    image ? renderProp(image) : <div>Loading...</div>
  );
};

export default ImageDisplay;
