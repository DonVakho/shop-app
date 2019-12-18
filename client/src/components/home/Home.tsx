//React Imports
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
//Style Imports
import { useStyles } from '../../styles/StylesHome'
//Material-ui core Imports
import {
    useScrollTrigger,
    Fab,
    Zoom,
    Toolbar,
    Typography
} from '@material-ui/core'
//Icon Imports
import ScrollUpIcon from '../../assets/icons/kunai.svg'
//Store Imports
import { RootStoreContext } from '../../stores/RootStore'
//Interface Imports
import { IItemCard } from '../../Interfaces'
//Custom Component Imports
import NavBar from '../navbar/NavBar'
import SidePane from '../side-pane/SidePane'
import ItemCard from './ItemCard'


const Home = observer(() => {
    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)
    const items: IItemCard[] = [
        { name: "nirvana", price: 5.3, img: "https://drive.google.com/uc?id=17581Nizb0jP6XMeay74DlJwFzLvpIcdl" },
        { name: "rammstein", price: 2.1, img: "https://drive.google.com/uc?id=1lB_l7lE12gfiSQQaPx5w8xsxR7nwB0P1" },
        { name: "led zeppelin", price: 5.3, img: "https://drive.google.com/uc?id=1hWQFl3dFBw_8YxhAzzTbwWViIMHJoljB" },
        { name: "nirvana", price: 5.3, img: "https://drive.google.com/uc?id=17581Nizb0jP6XMeay74DlJwFzLvpIcdl" },
        { name: "rammstein", price: 2.1, img: "https://drive.google.com/uc?id=1lB_l7lE12gfiSQQaPx5w8xsxR7nwB0P1" },
        { name: "led zeppelin", price: 5.3, img: "https://drive.google.com/uc?id=1hWQFl3dFBw_8YxhAzzTbwWViIMHJoljB" },
        { name: "nirvana", price: 5.3, img: "https://drive.google.com/uc?id=17581Nizb0jP6XMeay74DlJwFzLvpIcdl" },
        { name: "rammstein", price: 2.1, img: "https://drive.google.com/uc?id=1lB_l7lE12gfiSQQaPx5w8xsxR7nwB0P1" },
        { name: "led zeppelin", price: 5.3, img: "https://drive.google.com/uc?id=1hWQFl3dFBw_8YxhAzzTbwWViIMHJoljB" },
        { name: "nirvana", price: 5.3, img: "https://drive.google.com/uc?id=17581Nizb0jP6XMeay74DlJwFzLvpIcdl" },
        { name: "rammstein", price: 2.1, img: "https://drive.google.com/uc?id=1lB_l7lE12gfiSQQaPx5w8xsxR7nwB0P1" },
        { name: "led zeppelin", price: 5.3, img: "https://drive.google.com/uc?id=1hWQFl3dFBw_8YxhAzzTbwWViIMHJoljB" },
        { name: "nirvana", price: 5.3, img: "https://drive.google.com/uc?id=17581Nizb0jP6XMeay74DlJwFzLvpIcdl" },
        { name: "rammstein", price: 2.1, img: "https://drive.google.com/uc?id=1lB_l7lE12gfiSQQaPx5w8xsxR7nwB0P1" },
        { name: "led zeppelin", price: 5.3, img: "https://drive.google.com/uc?id=1hWQFl3dFBw_8YxhAzzTbwWViIMHJoljB" },
    ]

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
            <div>
                <Typography variant='h6' style={{ color: 'white' }}>
                    მიმდინარე ფილტრი: 
                        კატეგორია >> {store.filterStore.filter.category} | 
                        ზოგადი თემატიკა >> {store.filterStore.filter.thematicsGeneral} | 
                        კონკრეტული თემატიკა >> {store.filterStore.filter.thematicsNarrow} | 
                        ფასი >> {store.filterStore.filter.price[0]}₾-{store.filterStore.filter.price[1]}₾</Typography>
            </div>
            <div className={classes.itemsContainer}>
                {items.map((item, index) => <ItemCard key={index} item={{ name: item.name, price: item.price, img: item.img }} />)}
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
})

export default Home
