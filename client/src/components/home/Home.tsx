import React from 'react'

import NavBar from './NavBar'
import SideMenu from './SideMenu'

interface IProps {
}

const Home: React.FC<IProps> = () => (
    <div>
        <NavBar/>
        <SideMenu/>
    </div>
)

export default Home