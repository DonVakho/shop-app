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
    Hidden,
    Divider
} from '@material-ui/core';
//Icon Imports
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
//Interface Imports
import { IItem } from '../../Interfaces'

import ItemOverlay from './ItemOverlay'

interface IProps {
    item: IItem
}

const ItemCard: React.FC<IProps> = ({ item }: IProps) => {
    const classes = useStyles()
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false)
    const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight ? true : false)

    window.addEventListener("resize", () => { setMobile(window.innerWidth <= window.innerHeight ? true : false) });

    const handleClick = () => {
    }

    const handlePopoverOpen = () => {
        setChecked(true);
    };

    const handlePopoverClose = () => {
        setChecked(false);
    };

    return (
        <div className={classes.root}>
            <Card className={mobile ? classes.cardMobile : classes.card}
                square={true}
                elevation={0}
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
                        <IconButton onClick={() => setOpen(true)}><RemoveRedEyeOutlinedIcon /></IconButton>
                    </CardActions>
                </Hidden>
            </Card>
            <Hidden mdDown>
                <div
                    className={classes.popoverContainer}
                    onMouseOver={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    <Collapse in={checked}>
                        <Paper elevation={0} square={true}>
                            <div className={classes.iconHover}>
                                <IconButton>
                                    <AddShoppingCartIcon style={{ fontSize: 17 }} />
                                </IconButton>
                            </div>
                            <Divider />
                            <div className={classes.iconHover}>
                                <IconButton onClick={() => setOpen(true)}>
                                    <RemoveRedEyeOutlinedIcon style={{ fontSize: 17 }} />
                                </IconButton>
                            </div>
                        </Paper>
                    </Collapse>
                </div>
            </Hidden>
            <ItemOverlay open={open} setOpen={setOpen} item={item} />
        </div>
    );
}

export default ItemCard