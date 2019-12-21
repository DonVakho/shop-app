//React Imports
import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';
//Material-ui core Imports
import {
    Drawer,
} from '@material-ui/core';
//Store Imports
import { RootStoreContext } from '../../stores/RootStore'
//Custom Component Imports
import FilterForm from './FilterForm'

const SidePane: React.FC = observer(() => {
    const store = useContext(RootStoreContext)
    const [sidePaneSize, setSidePaneSize] = useState(window.innerWidth <= window.innerHeight ? '100vw' : '100%')

    window.addEventListener("resize", () => { setSidePaneSize(window.innerWidth <= window.innerHeight ? '100vw' : '100%')});

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
            <div style={{ width: sidePaneSize}}>
                <FilterForm />
            </div>
        </Drawer>
    );
})

export default SidePane