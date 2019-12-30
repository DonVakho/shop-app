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
    Select,
    Button,
    Typography,
    Divider,
    MenuItem
} from '@material-ui/core';
//Icon Imports
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShopLogo from '../../assets/icons/shop_logo.png'
//Interfase imorts
import { IThematicsNarrow } from '../../Interfaces'
//Store Imports
import { RootStoreContext } from '../../stores/RootStore'

const renderList = (list: string[] = []) => (
    list.map(item =>
        <MenuItem key={item} value={item}>
            {item}
        </MenuItem>
    )
)

const renderList2 = (obj: IThematicsNarrow = { key: "სხვადასხვა", values: [] }) => (
    obj.values.map((item: string) =>
        <MenuItem key={item} value={item}>
            {item}
        </MenuItem>
    )
)

const valuetext = (value: number) => (`${value}₾`)

const FilterForm: React.FC = observer(() => {

    const classes = useStyles({} as any);
    const store = useContext(RootStoreContext)
    const filterData = store.filterStore.filterData
    const [state, setState] = useState(store.filterStore.filter)

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
            category: 'სხვადასხვა',
            thematicsGeneral: 'სხვადასხვა',
            thematicsNarrow: 'სხვადასხვა',
            price: [0, filterData.high_price]
        })
        store.filterStore.filterSet = false
        store.filterStore.doFilter = true
        store.filterStore.filter = state
    }

    const applyFilter = () => {
        store.filterStore.filter = state
        store.filterStore.filterSet = true
        store.filterStore.doFilter = true
        store.navBarStore.showFilter = false
    }

    const closeFilter = () => {
        store.filterStore.filter = state
        store.navBarStore.showFilter = false
    }

    return (
        <form className={classes.root} autoComplete="off">
            <div className={classes.imageDiv}>
                <img src={ShopLogo} className={classes.logoImg} alt="logo" />
            </div>
            <Divider className={classes.divider} />
            <Typography variant="h5" component="h2" align='center'> დააყენე ფილტრი </Typography>
            <FormControl className={classes.filterRow}>

            </FormControl>
            <FormControl className={classes.filterRow}>
                <InputLabel>კატეგორია</InputLabel>
                <Select
                    value={state.category}
                    onChange={handleCategoryChange}
                    input={<BootstrapInput name="category" />}
                >
                    {renderList(filterData.categories)}
                </Select>
            </FormControl>
            <FormControl className={classes.filterRow}>
                <InputLabel>ზოგადი თემატიკა</InputLabel>
                <Select
                    value={state.thematicsGeneral}
                    onChange={handleGeneralThematicsChange}
                    input={<BootstrapInput name="thematics" />}
                >
                    {renderList(filterData.thematics)}
                </Select>
            </FormControl>
            <FormControl
                className={classes.filterRow}
                disabled={state.thematicsGeneral === 'სხვადასხვა'}
            >
                <InputLabel style={{ marginTop: '5px' }}>თემატიკის დაკონკრეტება</InputLabel>
                <Select
                    value={state.thematicsNarrow}
                    onChange={handleNarrowThematicsChange}
                    input={<BootstrapInput name="thematics-narrow" />}
                >
                    {renderList2(filterData.thematics_narrow.find((element: IThematicsNarrow) => element.key === state.thematicsGeneral))}
                </Select>
                <FormHelperText style={{ display: state.thematicsGeneral === 'სხვადასხვა' ? undefined : 'none' }}>
                    აირჩიე ზოგადი თემატიკა
                </FormHelperText>
            </FormControl>
            <FormControl className={classNames(classes.filterRow)}>
                <div className={classes.imageDiv}>
                    <PriceSlider
                        className={classes.priceSlider}
                        valueLabelDisplay="on"
                        valueLabelFormat={valuetext}
                        max={filterData.high_price}
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
            <Divider className={classes.divider} />
        </form>
    );
})

export default FilterForm