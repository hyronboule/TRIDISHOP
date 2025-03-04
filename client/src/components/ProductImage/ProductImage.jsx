import React from 'react';
import { useNavigate } from 'react-router-dom';


const ProductImage = ({ img, productId, description }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${productId}`);
    }
    return (

        <img tabIndex="0"
            key={productId}
            onClick={() => {
                handleClick()
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick()
                }
            }}
            src={`data:image/jpeg;base64,${img}`}
            alt={!description?"3D Model image" : description}
            style={{ width: '100%', height: '100%', objectFit: "cover", cursor: 'pointer' }}
        />

    );
};

export default ProductImage;
