//React Imports
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { useAsync } from "react-async"
//Style Imports
import { useStyles } from '../../styles/StylesHome'
import './home.css';
//Material-ui core Imports
import {
    useScrollTrigger,
    Fab,
    Zoom,
    Toolbar,
    Typography,
} from '@material-ui/core'
//Icon Imports
import ScrollUpIcon from '../../assets/icons/kunai.svg'
import sharingan from '../../assets/images/Sharingan.png'
//Store Imports
import { RootStoreContext } from '../../stores/RootStore'
//Query imports
import { GET_ITEMS, GET_FILTER } from '../../Queries'
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

const loadFilterData = async () => {
    const res = await fetch(`http://localhost:5000/entrance?${GET_FILTER}`)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}

const Home = observer(() => {
    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)
    const itemsLoad = useAsync({ promiseFn: loadHomeItems })
    const filterLoad = useAsync({ promiseFn: loadFilterData })

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

    if (itemsLoad.isPending || filterLoad.isPending) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', backgroundColor: 'black' }}>
                <img src={sharingan} className="rotate" width="500px" alt='main-loading' />
                <Typography variant='body1' style={{ color: 'white' }}>...loading data</Typography>
            </div>
        )
    }
    if (itemsLoad.error || filterLoad.error) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>
                {itemsLoad.error ? <Typography variant='body1'>Items load error: {itemsLoad.error.message}</Typography> : <></>}
                {filterLoad.error ? <Typography variant='body1'>Filter load error: {filterLoad.error.message}</Typography> : <></>}
            </div>
        )
    }
    if (itemsLoad.data && filterLoad.data) {
        const items: IItem[] = itemsLoad.data.data.items.data
        if (filterLoad.data) {
            store.filterStore.filterData = filterLoad.data.data.filter
        }
        return (
            <React.Fragment>
                <NavBar />
                <Toolbar id="back-to-top-anchor" />
                <div className={classes.itemsContainer}>
                    {store.filterStore.filterSet ?
                        <Typography variant='body1' style={{ color: 'black' }}>
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
