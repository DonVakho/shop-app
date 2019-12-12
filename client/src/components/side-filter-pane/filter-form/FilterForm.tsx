import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames'

import {
    FormControl,
    RadioGroup,
    Radio,
    Slider,
    InputLabel,
    FormHelperText,
    NativeSelect,
    Divider,
    Button
} from '@material-ui/core';

import {
    BootstrapInput,
    useStyles
} from './Styles'

import {
    CATEGORIES,
    GENERAL_THEMATICS,
    NARROW_THEMATICS
} from '../../RefData'

import { RootStoreContext } from '../../../stores/RootStore'
import { IFilterProps } from '../../../Interfaces'


interface IProps {
}

const FilterForm: React.FC<IProps> = observer(() => {

    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)
    const [state, setState] = useState({
        category: 'all',
        thematicsGeneral: 'all',
        thematicsNarrow: 'all'
    } as IFilterProps)

    const renderList = (list: string[] = []) => (
        list.map(item =>
            <option className={classes.option} key={item} value={item}>
                {item}
            </option>
        )
    )

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState({ ...state, category: (event.target.value as string) })
    };
    const handleGeneralThematicsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState({ ...state, thematicsGeneral: (event.target.value as string) })
    };

    const handleNarrowThematicsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState({ ...state, thematicsNarrow: (event.target.value as string) })
    };

    const clearFilter = () => {
        setState({
            category: 'all',
            thematicsGeneral: 'all',
            thematicsNarrow: 'all'
        })
    }

    const applyFilter = () => {
        store.filterStore.filter = state
        store.navBarStore.showFilter = false
    }
    return (
        <form className={classes.root} autoComplete="off">
            <FormControl className={classNames(classes.filterRow, classes.margin)}>
                <InputLabel>Category</InputLabel>
                <NativeSelect
                    value={state.category}
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
                    value={state.thematicsGeneral}
                    onChange={handleGeneralThematicsChange}
                    input={<BootstrapInput name="thematics" />}
                >
                    {renderList(GENERAL_THEMATICS)}
                </NativeSelect>
            </FormControl>
            <Divider />
            <FormControl
                className={classNames(classes.filterRow, classes.margin)}
                disabled={state.thematicsGeneral === 'all'}
            >
                <InputLabel>Thematics Narrow</InputLabel>
                <NativeSelect
                    value={state.thematicsNarrow}
                    onChange={handleNarrowThematicsChange}
                    input={<BootstrapInput name="thematics-narrow" />}
                >
                    {renderList(NARROW_THEMATICS[state.thematicsGeneral])}
                </NativeSelect>
                <FormHelperText style={{ display: state.thematicsGeneral === 'all' ? undefined : 'none' }}>
                    First select general category
                </FormHelperText>
            </FormControl>
            <Divider />
            <FormControl className={classNames(classes.filterRow, classes.margin, classes.filterRowCenter)}>
                <Button onClick={applyFilter}>
                    Apply Filter
                </Button>
            </FormControl>
            <FormControl className={classNames(classes.filterRow, classes.margin, classes.filterRowCenter)}>
                <Button onClick={clearFilter}>
                    Clear Filter
                </Button>
            </FormControl>
        </form>
    );
})

export default FilterForm