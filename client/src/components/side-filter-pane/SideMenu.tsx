import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';

import {
    Drawer,
} from '@material-ui/core';


import { RootStoreContext } from '../../stores/RootStore'
import FilterForm from './filter-form/FilterForm'

const SideMenu: React.FC = observer(() => {
    const store = useContext(RootStoreContext)
    const [sidePaneSize, setSidePaneSize] = useState(window.innerWidth <= 991 ? '100vw': '35vw')

    window.addEventListener("resize", ()=>{setSidePaneSize(window.innerWidth <= 991 ? '100vw': '35vw')});
    
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        store.navBarStore.showFilter = open;
    };

    return (
        <Drawer open={store.navBarStore.showFilter} onClose={toggleDrawer(false)}>
            <div style={{width: sidePaneSize}}>
                <FilterForm />
            </div>
        </Drawer>
    );
})

export default SideMenu