import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';

import {
    CATEGORIES,
    GENERAL_THEMATICS,
    NARROW_THEMATICS
} from '../RefData'

import classNames from 'classnames'

import {
    FormControl,
    RadioGroup,
    Radio,
    Slider,
    InputLabel,
    FormHelperText,
    NativeSelect,
    InputBase,
    Divider,
    Button
} from '@material-ui/core';

import { RootStoreContext } from '../../stores/RootStore'

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            width: '100%',
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        filterRow: {
            width: '18vw',
            marginLeft: '1vw',
            marginBottom: '15px'
        },
        filterRowCenter: {
            alignContent: 'center'
        },
        divider: {
            marginTop: '5px',
            marginBottom: '5px'
        }
    }),
);
interface IProps {
}

const FilterForm: React.FC<IProps> = observer(() => {

    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)

    const renderList = (list: string[] = []) => (
        list.map(item =>
            <option key={item} value={item}>
                {item}
            </option>
        )
    )

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        store.filterStore.category = (event.target.value as string);
    };
    const handleGeneralThematicsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        store.filterStore.thematicsGeneral = (event.target.value as string);
    };

    const handleNarrowThematicsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        store.filterStore.thematicsNarrow = (event.target.value as string);
    };
    return (
        <form className={classes.root} autoComplete="off">
            <FormControl className={classNames(classes.filterRow, classes.margin)}>
                <InputLabel>Category</InputLabel>
                <NativeSelect
                    value={store.filterStore.category}
                    onChange={handleCategoryChange}
                    input={<BootstrapInput name="category" />}
                >
                    {renderList(CATEGORIES)}
                </NativeSelect>
            </FormControl>
            <Divider />
            <FormControl className={classNames(classes.filterRow, classes.margin)}>
                <InputLabel>Thematics General</InputLabel>
                <NativeSelect
                    value={store.filterStore.thematicsGeneral}
                    onChange={handleGeneralThematicsChange}
                    input={<BootstrapInput name="thematics" />}
                >
                    {renderList(GENERAL_THEMATICS)}
                </NativeSelect>
            </FormControl>
            <Divider />
            <FormControl
                className={classNames(classes.filterRow, classes.margin)}
                disabled={store.filterStore.thematicsGeneral === 'all'}
            >
                <InputLabel>Thematics Narrow</InputLabel>
                <NativeSelect
                    value={store.filterStore.thematicsNarrow}
                    onChange={handleNarrowThematicsChange}
                    input={<BootstrapInput name="thematics-narrow" />}
                >
                    {renderList(NARROW_THEMATICS[store.filterStore.thematicsGeneral])}
                </NativeSelect>
                <FormHelperText style={{ display: store.filterStore.thematicsGeneral === 'all' ? undefined : 'none' }}>
                    First select general category
                </FormHelperText>
            </FormControl>
            <Divider />
            <FormControl className={classNames(classes.filterRow, classes.margin, classes.filterRowCenter)}>
                <Button onClick={() => store.navBarStore.showFilter = false}>
                    Apply Filter
                </Button>
            </FormControl>
            <FormControl className={classNames(classes.filterRow, classes.margin, classes.filterRowCenter)}>
                <Button onClick={() => store.filterStore.clearStore()}>
                    Clear Filter
                </Button>
            </FormControl>
        </form>
    );
})

export default FilterForm