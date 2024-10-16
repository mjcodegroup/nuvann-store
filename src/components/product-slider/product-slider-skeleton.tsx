import { Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import Styles from './product-slider.module.scss';

export function ProductSlideSkeleton({itemToShow}: {itemToShow: number}) {
    return (
        <div className={Styles.skeleton_container}>
            {Array.from({ length: itemToShow }).map((_, index) => (
                <Card key={index}>
                <CardMedia component={Skeleton} variant="rectangular" height={250} />
                <CardContent>
                    <Skeleton variant="text" width={50}/>
                    <Skeleton variant="text" width={100}/>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </CardContent>
                </Card>
            ))}
        </div>
    )
}