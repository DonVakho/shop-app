//React Imports
import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames'
//Style Imports
import {
    BootstrapInput,
    useStyles,
    PriceSlider
} from '../../styles/StylesFilter'
//Material-ui core Imports
import {
    FormControl,
    InputLabel,
    FormHelperText,
    NativeSelect,
    Button,
    Typography,
    Divider
} from '@material-ui/core';
//Icon Imports
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShopLogo from '../../assets/icons/shop_logo.png'
//Reference data Imports
import {
    CATEGORIES,
    GENERAL_THEMATICS,
    NARROW_THEMATICS,
} from '../RefData'
//Store Imports
import { RootStoreContext } from '../../stores/RootStore'

const FilterForm: React.FC = observer(() => {

    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)
    const [state, setState] = useState(store.filterStore.filter)

    const renderList = (list: string[] = []) => (
        list.map(item =>
            <option key={item} value={item}>
                {item}
            </option>
        )
    )

    const valuetext = (value: number) => (`${value}₾`)

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState({ ...state, category: (event.target.value as string) })
    };
    const handleGeneralThematicsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState({ ...state, thematicsGeneral: (event.target.value as string) })
    };

    const handleNarrowThematicsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState({ ...state, thematicsNarrow: (event.target.value as string) })
    };

    const handlePriceSliderChange = (event: any, newValue: number | number[]) => {
        setState({
            ...state, price: newValue as number[]
        })
    };

    const clearFilter = () => {
        setState({
            category: 'all',
            thematicsGeneral: 'all',
            thematicsNarrow: 'all',
            price: [0, store.filterStore.maxPrice]
        })
    }

    const applyFilter = () => {
        store.filterStore.filter = state
        store.navBarStore.showFilter = false
    }

    const closeFilter = () => {
        store.navBarStore.showFilter = false
    }
    return (
        <form className={classes.root} autoComplete="off">
            <div className={classes.imageDiv}>
                <img src={ShopLogo} className={classes.logoImg} alt="logo" />
            </div>
            <Divider className={classes.divider}/>
            <Typography variant="h5" component="h2" align='center'> დააყენე ფილტრი </Typography>
            <FormControl className={classes.filterRow}>

            </FormControl>
            <FormControl className={classes.filterRow}>
                <InputLabel>კატეგორია</InputLabel>
                <NativeSelect
                    value={state.category}
                    onChange={handleCategoryChange}
                    input={<BootstrapInput name="category" />}
                >
                    {renderList(CATEGORIES)}
                </NativeSelect>
            </FormControl>
            <FormControl className={classes.filterRow}>
                <InputLabel>ზოგადი თემატიკა</InputLabel>
                <NativeSelect
                    value={state.thematicsGeneral}
                    onChange={handleGeneralThematicsChange}
                    input={<BootstrapInput name="thematics" />}
                >
                    {renderList(GENERAL_THEMATICS)}
                </NativeSelect>
            </FormControl>
            <FormControl
                className={classes.filterRow}
                disabled={state.thematicsGeneral === 'all'}
            >
                <InputLabel style={{marginTop: '5px'}}>თემატიკის დაკონკრეტება</InputLabel>
                <NativeSelect
                    value={state.thematicsNarrow}
                    onChange={handleNarrowThematicsChange}
                    input={<BootstrapInput name="thematics-narrow" />}
                >
                    {renderList(NARROW_THEMATICS[state.thematicsGeneral])}
                </NativeSelect>
                <FormHelperText style={{ display: state.thematicsGeneral === 'all' ? undefined : 'none' }}>
                    აირჩიე ზოგადი თემატიკა
                </FormHelperText>
            </FormControl>
            <FormControl className={classNames(classes.filterRow)}>
                <div className={classes.imageDiv}>
                    <PriceSlider
                        className={classes.priceSlider}
                        valueLabelDisplay="on"
                        valueLabelFormat={valuetext}
                        max={store.filterStore.maxPrice}
                        onChange={handlePriceSliderChange}
                        defaultValue={[0, store.filterStore.maxPrice]}
                        value={state.price}
                    />
                </div>
                <FormHelperText>
                    დააყენე ფასის საზღვრები
                </FormHelperText>
            </FormControl>
            <FormControl className={classNames(classes.filterRow)}>
                <div className={classes.buttonContainer}>
                    <Button className={classes.goButton} onClick={applyFilter}> გაფილტრვა <DoubleArrowIcon /></Button>
                    <Button className={classes.clearButton} onClick={clearFilter}> გასუფთავება <HighlightOffIcon /></Button>
                    <Button className={classes.cancelButton} onClick={closeFilter}>დახურვა <DoubleArrowIcon className={classes.rotatedIcon} /></Button>
                </div>
            </FormControl>
            <Divider className={classes.divider}/>
        </form>
    );
})

export default FilterForm