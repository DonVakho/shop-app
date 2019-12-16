import React, { useState } from 'react';
import {
    IconButton,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Collapse,
    Paper,
    Hidden
} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import cardImage from '../../assets/tempImages/alchemist.jpg'

import { useStyles } from './Styles'

const ItemCard: React.FC = () => {
    const classes = useStyles()
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
    }

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setChecked(true);
    };

    const handlePopoverClose = () => {
        setChecked(false);
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}
                onMouseOver={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}>
                <CardMedia component="img" image={cardImage} />
                <CardActionArea onClick={handleClick}>
                    <CardContent>
                        <Typography variant="h6" > Fulmetal Alchemist </Typography>
                        <Typography variant="h6" > 15₾ </Typography>
                    </CardContent>
                </CardActionArea>
                <Hidden lgUp>
                    <CardActions className={classes.buttonContainer}>
                        <IconButton><AddShoppingCartIcon /></IconButton>
                        <IconButton><InfoOutlinedIcon /></IconButton>
                    </CardActions>
                </Hidden>
            </Card>
            <Hidden mdDown>
                <div
                    style={{ position: 'absolute' }}
                    onMouseOver={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    <Collapse in={checked}>
                        <Paper elevation={0} className={classes.popoVerContainer}>
                            <IconButton><AddShoppingCartIcon /></IconButton>
                            <IconButton><InfoOutlinedIcon /></IconButton>
                        </Paper>
                    </Collapse>
                </div>
            </Hidden>
        </div>
    );
}

export default ItemCard