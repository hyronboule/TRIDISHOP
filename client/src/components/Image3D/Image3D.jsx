import { Paper, Grid } from '@mui/material'
import React from 'react'
import { colorVar } from '../../style/colorVar'

const Image3D = ({ values, classname }) => {
   
    return (
        <Grid container direction={'row'} className={classname}>
            <Paper sx={{ background: colorVar.backgroundPaleGrey, width: '100%', height: '100%' }} elevation={3}>
                <Grid container gap={3} padding={2} justifyContent={"center"}>
                    {values && (
                        values.map((value, i) => (
                            <Paper key={i} sx={{ background: "purple", width: { xs: 115, sm: 245, md: 300 }, height: { xs: 115, sm: 245, md: 300 } }} elevation={3} />)
                        ))}
                </Grid>
            </Paper>

        </Grid>
    )
}

export default Image3D