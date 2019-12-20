//React Imports
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { useAsync } from "react-async"
//Style Imports
import { useStyles } from '../../styles/StylesHome'
//Material-ui core Imports
import {
    useScrollTrigger,
    Fab,
    Zoom,
    Toolbar,
    Typography,
    CircularProgress
} from '@material-ui/core'
//Icon Imports
import ScrollUpIcon from '../../assets/icons/kunai.svg'
//Store Imports
import { RootStoreContext } from '../../stores/RootStore'
//Query imports
import { GET_ITEMS } from '../../Queries'
//Interface Imports
import { IItem } from '../../Interfaces'
//Custom Component Imports
import NavBar from '../navbar/NavBar'
import SidePane from '../side-pane/SidePane'
import ItemCard from './ItemCard'


const loadHomeItems = async () => {
    const res = await fetch(`http://localhost:5000/entrance?${GET_ITEMS}`)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}

const Home = observer(() => {
    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)
    const { data, error, isPending } = useAsync({ promiseFn: loadHomeItems })

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

    if (isPending) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>
                <CircularProgress size="200px" />
                <Typography variant='body1'>...loading data</Typography>
            </div>
        )
    }
    if (error) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>
                <Typography variant='body1'>{error.message}</Typography>
            </div>
        )
    }
    if (data) {
        const items: IItem[] = data.data.items.data
        return (
            <React.Fragment>
                {console.log(items)}
                <NavBar />
                <Toolbar id="back-to-top-anchor" />
                <div className={classes.itemsContainer}>
                    {store.filterStore.filterSet ?
                        <Typography variant='h6' style={{ color: 'white' }}>
                            მიმდინარე ფილტრი:
                        კატეგორია >> {store.filterStore.filter.category} |
                        ზოგადი თემატიკა >> {store.filterStore.filter.thematicsGeneral} |
                        კონკრეტული თემატიკა >> {store.filterStore.filter.thematicsNarrow} |
                        ფასი >> {store.filterStore.filter.price[0]}₾-{store.filterStore.filter.price[1]}₾
                    </Typography>
                        : <></>}
                </div>
                <div className={classes.itemsContainer}>
                    {items.map((item, index) => <ItemCard key={index} item={item} />)}
                    {items.map((item, index) => <ItemCard key={index} item={item} />)}
                    {items.map((item, index) => <ItemCard key={index} item={item} />)}
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
    return null
})

export default Home
