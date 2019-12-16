import React from 'react'

import {
    useScrollTrigger,
    Fab,
    Zoom,
    Toolbar
} from '@material-ui/core'

import ScrollUpIcon from '../../assets/kunai.svg'

import NavBar from '../navbar/NavBar'
import SideMenu from '../side-filter-pane/SideMenu'
import ItemCard from './ItemCard'

import {
    useStyles,
} from './Styles'

export default function Home() {
    const classes = useStyles({} as any);
    var list = Array.from(Array(20).keys())
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 500,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <React.Fragment>
            <NavBar />
            <Toolbar id="back-to-top-anchor" />
            <div className={classes.itemsContainer}>
                {list.map(num => <ItemCard key={num} />)}
            </div>
            <SideMenu />
            <Zoom in={trigger}>
                <div onClick={handleClick} className={classes.scrollUpContainer}>
                    <Fab className={classes.kunaiFab}>
                        <img src={ScrollUpIcon} alt="scrol-kunai" className={classes.kunaiIcon} />
                    </Fab>
                </div>
            </Zoom>
        </React.Fragment>
    )
}
