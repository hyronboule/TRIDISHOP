import { Grid, Stack, Paper } from '@mui/material'
import React from 'react'
import { colorVar } from '../../style/colorVar'
import ProductImage from '../ProductImage/ProductImage.jsx'
import img from '../../assets/notProducts.png'
import { ShowMoreProducts } from '../ShowMoreProducts/ShowMoreProducts.jsx'

const Image3D = ({ values, classname, setValues, urlPage, setUrlPage, displayShowMore }) => {

    return (
        <Grid container direction={'column'} alignItems={'center'} gap={3} className={classname}>
            <Stack sx={{ background: colorVar.backgroundPaleGrey, width: '100%', height: '100%', position: "relative", borderRadius: "20px" }} >
                <Grid container gap={3} padding={2} justifyContent={"center"}>
                    {values && values != undefined ? (
                        values.map((value, i) => (
                            <Stack key={i} sx={{ 
                                maxWidth: { xs: 115, sm: 245, md: 250 }, minWidth:{sm:200,md:200},width:{ sm:"20%",md:"30%"}, height: { xs: 115, sm: 185, md: 200 }, 
                                boxShadow: 3, borderRadius: 2 }}>
                                {
                                    value.image && (
                                        <ProductImage productId={value.nameFile} img={value.image} />
                                    )
                                }
                            </Stack>)
                        ))
                        : <img style={{ width: "40px" }} src={img} alt="not products image" />}
                </Grid>
            </Stack>
            {
                !displayShowMore && (
                    <ShowMoreProducts
                        setData={setValues}
                        urlPage={urlPage}
                        setUrlPage={setUrlPage}
                    />
                )
            }
        </Grid>
    )
}

export default Image3D