import React from 'react'

import NavBar from '../navbar/NavBar'
import SideMenu from '../side-filter-pane/SideMenu'
import ItemCard from './ItemCard'

import {
    useStyles,
} from './Styles'

const Home: React.FC = () => {
    const classes = useStyles({} as any);
    var list = Array.from(Array(10).keys())

    return (
        <div>
            <NavBar />
            <div className={classes.itemsContainer}>
                {list.map(num => <ItemCard key={num} />)}
            </div>
            <SideMenu />
        </div>
    )
}

export default Home