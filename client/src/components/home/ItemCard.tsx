//React Imports
import React, { useState } from 'react';
//Style Imports
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles';
//Material-ui core Imports
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
//Interface Imports
import { IItem } from '../../Interfaces'

import ItemOverlay from './overlay/overlayBox'

interface IProps {
    item: IItem
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        card: {
            width: 250,
            margin: theme.spacing(2)
        },
        cardMobile: {
            width: '80vw',
            margin: theme.spacing(2)
        },
    })
);

const ItemCard: React.FC<IProps> = ({ item }: IProps) => {
    const classes = useStyles()
    const [openOverlay, setOpenOverlay] = useState(false)
    const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight ? true : false)

    window.addEventListener("resize", () => { setMobile(window.innerWidth <= window.innerHeight ? true : false) });

    return (
        <div className={classes.root}>
            <Card className={mobile ? classes.cardMobile : classes.card}
                square={true}
                elevation={0}>
                <CardActionArea onClick={() => setOpenOverlay(true)}>
                    <CardMedia component="img" image={item.img} />
                    <CardContent>
                        <Typography variant='h6' noWrap={true}> {item.name} </Typography>
                        <Typography variant="h6" > {item.price}₾ </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <ItemOverlay open={openOverlay} setOpen={setOpenOverlay} item={item} />
        </div >
    );
}

export default ItemCard