//React Imports
import React, { useState } from 'react';
//Style Imports
import { useStyles } from '../../styles/StylesHome'
//Material-ui core Imports
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
//Icon Imports
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
//Interface Imports
import { IItemCard } from '../../Interfaces'

interface IProps {
    item: IItemCard
}

const ItemCard: React.FC<IProps> = ({ item }: IProps) => {
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
                square={true}
                onMouseOver={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}>
                <CardMedia component="img" image={item.img} />
                <CardActionArea onClick={handleClick}>
                    <CardContent>
                        <Typography variant='h6' noWrap={true}> {item.name} </Typography>
                        <Typography variant="h6" > {item.price}₾ </Typography>
                    </CardContent>
                </CardActionArea>
                <Hidden lgUp>
                    <CardActions className={classes.buttonContainer}>
                        <IconButton><AddShoppingCartIcon /></IconButton>
                        <IconButton><RemoveRedEyeOutlinedIcon /></IconButton>
                    </CardActions>
                </Hidden>
            </Card>
            <Hidden mdDown>
                <div
                    className={classes.popoverContainer}
                    onMouseOver={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    <Collapse in={checked}>
                        <Paper square={true}>
                            <IconButton><AddShoppingCartIcon /></IconButton>
                            <IconButton><RemoveRedEyeOutlinedIcon /></IconButton>
                        </Paper>
                    </Collapse>
                </div>
            </Hidden>
        </div>
    );
}

export default ItemCard