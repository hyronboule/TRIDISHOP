import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { callApiDetailProduct } from '../../services/callApiProducts';
import { Container, Grid, Stack } from '@mui/material';
import View3D from '../../components/View3D/View3D';
import NavigationButton from '../../components/NavigationButton/NavigationButton';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useUserContext } from '../../context/User';

const DetailProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const { setProductShops } = useUserContext();

    useEffect(() => {
        setProduct("");
        callApiDetailProduct(productId).then((data) => {
            if (data.data) {
                setProduct(data.data);
            }
        }).catch(err => {
            console.log("error, not found product detail:", err);
        });
    }, [productId]);

    const addProduct = () => {
        console.log(product);
        setProductShops((allProducts) => [...allProducts, product]);
    }

    return (
        <>
            {product && (
                <Container className='page' maxWidth="100vw" sx={{ padding: { sm: "0px 40px 0px 0px", xs: "0 0 50px 0" }, minHeight: "100%" }}>
                    <NavigationButton url={"/"} />
                    <Grid container gap={3} width={{ xs: "90%", md: "85%" }} margin={"auto"} direction="column" color={"white"} justifyContent="space-between" fontSize={{ xs: "12px", sm: "14px" }} sx={{ padding: { md: "0 30px", xs: "0px 10px" }, paddingTop: { xs: 10, md: 15 } }}>

                        <View3D
                            modelUrl={product.file.fileUrl}
                            moveBool={true}
                        />


                        <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}>

                            {product && (
                                <>
                                    <Grid container direction={"row"} width={"50%"} alignItems={"center"} justifyContent={"space-between"} gap={2} sx={{ height: "fit-content" }} >
                                        <p>@{product.pseudo.toUpperCase()}</p>
                                        <p>{product.download} Téléchargements</p>
                                        <p>{product.date}</p>
                                    </Grid>
                                    <Grid container direction={"row"} gap={3} width={"20%"} justifyContent={"end"} alignItems={"center"} sx={{ height: "fit-content" }}>
                                        <p>{product.price} €</p>
                                        <div onClick={() => {
                                            addProduct()
                                        }}>
                                            <LocalGroceryStoreIcon sx={{ fontSize: { xs: "25px", md: '30px' }, cursor: "pointer" }} />
                                        </div>

                                    </Grid>
                                </>
                            )}
                        </Grid>
                        <Grid item>
                            <p style={{ textDecoration: "underline", paddingBottom: "10px" }}>Description:</p>
                            <p style={{ maxWidth: "50%", minWidth: '200px', whiteSpace: 'normal' }} >{product.description}
                            </p>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </>
    );
}

export default DetailProduct;
