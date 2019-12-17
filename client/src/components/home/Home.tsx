//React Imports
import React from 'react'
//Style Imports
import { useStyles } from '../../styles/StylesHome'
//Material-ui core Imports
import {
    useScrollTrigger,
    Fab,
    Zoom,
    Toolbar
} from '@material-ui/core'
//Icon Imports
import ScrollUpIcon from '../../assets/icons/kunai.svg'
//Custom Component Imports
import NavBar from '../navbar/NavBar'
import SidePane from '../side-pane/SidePane'
import ItemCard from './ItemCard'

export default function Home() {
    const classes = useStyles({} as any);
    var list = Array.from(Array(50).keys())

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
            <SidePane />
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
