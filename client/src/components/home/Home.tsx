import React from 'react'

import NavBar from '../navbar/NavBar'
import SideMenu from '../side-filter-pane/SideMenu'

interface IProps {
}

const Home: React.FC<IProps> = () => (
    <div>
        <NavBar/>
        <SideMenu/>
    </div>
)

export default Home