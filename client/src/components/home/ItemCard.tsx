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
    Button
} from '@material-ui/core';
//Icon Imports
import CartIcon from '../../assets/icons/cart.svg'
//Interface Imports
import { IItem } from '../../Interfaces'

import ItemOverlay from './overlay/overlayBox'

interface IProps {
    item: IItem
}

const ItemCard: React.FC<IProps> = ({ item }: IProps) => {
    const classes = useStyles()
    const [hover, setHover] = useState(false);
    const [openOverlay, setOpenOverlay] = useState(false)
    const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight ? true : false)

    window.addEventListener("resize", () => { setMobile(window.innerWidth <= window.innerHeight ? true : false) });
    
    return (
        <div className={classes.root}>
            <Card className={mobile ? classes.cardMobile : classes.card}
                square={true}
                elevation={0}
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                <CardMedia onClick={() => setOpenOverlay(true)} component="img" image={item.img} />
                <CardActionArea onClick={() => setOpenOverlay(true)}>
                    <CardContent>
                        <Typography variant='h6' noWrap={true}> {item.name} </Typography>
                        <Typography variant="h6" > {item.price}₾ </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            {mobile ?
                <CardActions onClick={() => setOpenOverlay(true)}>
                    <IconButton >
                        <img src={CartIcon} alt='cart'/>
                    </IconButton>
                </CardActions> :
                <div
                    className={classes.popoverContainer}
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <Collapse in={hover}>
                        <Paper elevation={0} square={true} onClick={() => setOpenOverlay(true)} className={classes.popoverPaper}>
                            <Button style={{ flexGrow: 1, borderRadius: 0, }}>
                                <img src={CartIcon} alt='cart' />
                            </Button>
                        </Paper>
                    </Collapse>
                </div>
            }
            <ItemOverlay open={openOverlay} setOpen={setOpenOverlay} item={item} />
        </div >
    );
}

export default ItemCard