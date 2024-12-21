import { Card, CardContent, CardMedia, Skeleton } from '@mui/material'
import React from 'react'

export default function ProfileCardSkeleton() {
  return (
    <Card>
      <CardMedia component={Skeleton} variant="rectangular" height={200} />
      <CardContent style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Skeleton width={100} height={30} animation="pulse" />
        <Skeleton width={100} height={30} animation="pulse" />
      </CardContent>
    </Card>
  )
}
