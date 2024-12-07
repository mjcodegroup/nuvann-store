import React from 'react'
import Styles from './product-details-skeleton.module.scss'
import { Box, CardContent, Grid, Skeleton, Typography } from '@mui/material'

export default function ProductDetailsSkeleton() {
  return (
    <div className={Styles.product_details_skeleton}>
        <section className={Styles._skeleton_content}>
            <div>
                <Skeleton
                    variant="rectangular"
                    height={450}
                />
            </div>

            <Box sx={{
                padding: 2,
            }}>
                <Typography component="div" variant={'h6'}>
                    <Skeleton width={350}/>
                </Typography>

                <Typography variant={'h2'}>
                    <Skeleton width={"100%"}/>
                </Typography>

                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '50px', marginBottom: 2 }} />
                <Grid container sx={{
                    display: 'flex',
                    gap: 2,
                    marginBottom: 2,
                }} wrap="nowrap">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                </Grid>

                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80px', marginBottom: 2 }} />
                <Grid container sx={{
                    display: 'flex',
                    gap: 2,
                    marginBottom: 2,
                }} wrap="nowrap">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                </Grid>

                 <Typography variant={'h6'}>
                    <Skeleton width={"15%"}/>
                </Typography>
                <CardContent style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 0,
                }}>
                    <Skeleton  width={"40%"} height={80} animation="pulse" />
                    <Skeleton  width={"40%"} height={80} animation="pulse" />
                </CardContent>
            </Box>

        </section>

        <section className={Styles._details_skeleton_footer}></section>
    </div>
  )
}
