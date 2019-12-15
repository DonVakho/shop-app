import React from 'react';
import {
    IconButton,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import cardImage from '../../assets/tempImages/alchemist.jpg'

import { useStyles } from './Styles'

const ItemCard: React.FC = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={()=>{console.log('click')}}>
                <CardMedia component="img" image={cardImage} />
                <CardContent>
                    <Typography variant="h5" > Fulmetal Alchemist </Typography>
                    <Typography variant="h6" > 15₾ </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton color="primary"><AddShoppingCartIcon /></IconButton>
                <IconButton color="primary"><InfoOutlinedIcon /></IconButton>
            </CardActions>
        </Card>
    );
}

export default ItemCard