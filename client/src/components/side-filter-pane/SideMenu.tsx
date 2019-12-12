import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import {
    makeStyles,
    Drawer,
} from '@material-ui/core';

import { RootStoreContext } from '../../stores/RootStore'
import FilterForm from './filter-form/FilterForm'

const useStyles = makeStyles({
    list: {
        width: '20vw',
    },
});

const SideMenu: React.FC = observer(() => {
    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)

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
            <div className={classes.list}>
                <FilterForm />
            </div>
        </Drawer>
    );
})

export default SideMenu