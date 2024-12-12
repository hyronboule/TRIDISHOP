import React from 'react';
import { useNavigate } from 'react-router-dom';


const ProductImage = ({ img, productId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${productId}`);
    }
    return (

        <img
            key={ productId}
            onClick={() => {
               handleClick()
            }}
            src={`data:image/jpeg;base64,${img}`}
            alt="3D Model image"
            style={{ width: '100%', height: '100%', objectFit: "cover", cursor: 'pointer' }}
        />

    );
};

export default ProductImage;
